from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .services import AccountService
from .models import Account, Request
from .serializers import AccountSerializer, RequestFromAccountSerializer, RequestSerializer, RequestToAccountSerializer
from .permissions import IsRequestParticipant
from helpers.decorators import try_except_decorator


account_service = AccountService()


class CurrentAccountView(APIView):
    """ 
    Accepts GET and PATCH requests for retrieve and update current account.\n
    PATCH input data:
    first_name: str !optional
    last_name: str !optional
    birthdate: date in YYYY-MM-DD format !optional
    profile_picture: str !optional
    background_picture: str !optional\n
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = account_service.get_current_account(self.request)
        account_serializer = AccountSerializer(account)
        return Response(account_serializer.data)

    @try_except_decorator()
    def patch(self, *args, **kwargs):
        data = self.request.data
        account = account_service.get_current_account(self.request)
        serializer = AccountSerializer(
            instance=account, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=204)
        else:
            return Response(serializer.errors, status=400)


class AccountView(generics.RetrieveAPIView):
    """ 
    Accepts GET request and returns account with id specified in the URL.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]


class AccountsView(generics.ListAPIView):
    """ 
    Accepts GET request and returns all accounts.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]


class AccountFriendsView(generics.GenericAPIView):
    """ 
    Accepts GET request and returns all friends of the account with id specified in the URL.
    """
    queryset = Account.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        account = self.get_object()
        return Response(AccountSerializer(account.friends, many=True).data)


class CurrentAccountFriendsView(APIView):
    """ 
    Accepts GET, POST and DELETE requests for list, add and delete friends.\n
    DELETE and POST input data:
    friend_account: int
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = account_service.get_current_account(self.request)
        return Response(AccountSerializer(account.friends, many=True).data)

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data
        friend_id = data.get('friend_account')
        account = account_service.get_current_account(self.request)
        try:
            friend = account_service.get_account_by_id(friend_id)
        except Account.DoesNotExist:
            return Response({'friend_account': ['This account does not exist']}, status=404)
        try:
            request = account_service.send_friend_request(account, friend)
        except Exception as e:
            return Response({'friend_account': [str(e)]}, status=400)
            
        if request is not None:
            return Response(RequestToAccountSerializer(request).data, status=200)
        return Response(status=204)

    @try_except_decorator()
    def delete(self, *args, **kwargs):
        friend_id = self.request.data.get('friend_account')
        try:
            friend = account_service.get_account_by_id(friend_id)
        except Account.DoesNotExist:
            return Response({'friend_account': ['This account does not exist']}, status=404)

        try:
            account_service.delete_friend(
                account_service.get_current_account(self.request), friend)
        except Exception as e:
            return Response({'friend_account': [str(e)]}, status=400)

        return Response(status=204)


class FriendRequestView(APIView):
    """
    Accepts GET request and returns all friend requests sended to the current account
    """

    def get(self, *args, **kwargs):
        account = account_service.get_current_account(self.request)
        requests_to_account = account_service.get_friend_requests_to_account(
            account
        )
        requests_from_account = account_service.get_friend_requests_from_account(
            account
        )

        return Response(
            RequestToAccountSerializer(requests_from_account, many=True).data +
            RequestFromAccountSerializer(requests_to_account, many=True).data
        )


class FriendRequestDetail(generics.DestroyAPIView):
    """
    Accepts DELETE request and deletes friends request with specified id if account have permission
    """
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsRequestParticipant]
