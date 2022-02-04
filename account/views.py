from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from django.forms import ValidationError
from .models import Account
from .serializers import AccountSerializer
from helpers.validators import validate_date
from helpers.decorators import try_except_decorator


class CurrentAccountView(APIView):
    """ 
    Accepts GET and PATCH requests for retrieve and update current account.\n
    PATCH input data:
    first_name: str !optional
    last_name: str !optional
    birthdate: date in YYYY-MM-DD format !optional
    profile_picture: str !optional
    background_picture: str !optional\n
    PATCH Output:\n
    success: {'success': 'Account updated successfully'}\n
    error: {'error': 'Error info'}
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        user = self.request.user
        account_serializer = AccountSerializer(user.account)
        return Response(account_serializer.data)

    @try_except_decorator()
    def patch(self, *args, **kwargs):
        data = self.request.data
        account = self.request.user.account
        birthdate = data.get('birthdate')
        if birthdate is not None:
            try:
                validate_date(birthdate)
            except ValidationError:
                return Response({'error': 'Incorrect date format, should be YYYY-MM-DD'}, status=400)

        for attr in data.keys():
            if hasattr(account, attr) and (attr != 'id') and (attr != 'user'):
                setattr(account, attr, data[attr])
        account.save()
        return Response({'success': 'Account updated successfully'}, status=200)


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
    friend_account: int\n
    DELETE/POST output:\n
    success: POST: {'success': 'Your request has been sent'} or {'success': 'You are friends now'}\n
    DELETE: {'success': 'You aren\`t friends now'}\n
    error: {'error': 'Error info'}
    """
    @try_except_decorator()
    def get(self, *args, **kwargs):
        account = Account.objects.get(user=self.request.user)
        return Response(AccountSerializer(account.friends, many=True).data)

    @try_except_decorator()
    def post(self, *args, **kwargs):
        data = self.request.data
        friend_id = data.get('friend_account')
        account = Account.objects.get(user=self.request.user)
        friend = Account.objects.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'This account does not exist'}, status=404)

        if account.id == friend.id:
            return Response({'error': 'You can`t send a request to yourself'}, status=400)

        already_friends = friend.friends.filter(id=account.id).first() is not None
        if already_friends:
            return Response({'error': 'You are already friends'}, status=400)

        mutual_request = friend.friend_requests.filter(to_account=account).first()
        if mutual_request is not None:
            friend.friend_requests.filter(id=mutual_request.id).delete()
            friend.friends.add(account)
            account.friends.add(friend)
            return Response({'success': 'You are friends now'}, status=200)
        else:
            if account.friend_requests.filter(to_account=friend).first() is not None:
                return Response({'error': 'You have already sent a request to this user'}, status=400)

            account.friend_requests.create( from_account=account, to_account=friend)
            return Response({'success': 'Your request has been sent'}, status=200)

    @try_except_decorator()
    def delete(self, *args, **kwargs):
        data = self.request.data
        friend_id = data.get('friend_account')
        friend = Account.objects.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'This account does not exist'}, status=404)

        account = Account.objects.get(user=self.request.user)
        friend = account.friends.filter(id=friend_id).first()
        if friend is None:
            return Response({'error': 'You aren`t friends'}, status=400)
        account.friends.remove(friend)
        friend.friends.remove(account)
        return Response({'success': 'You aren`t friends now'}, status=200)
