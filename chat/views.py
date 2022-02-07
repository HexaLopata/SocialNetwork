from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from account.models import Account
from account.permissions import IsMember
from account.services import AccountService
from .serializers import ChatNestedSerializer, ChatSerializer
from .models import Chat

acs = AccountService()

class ChatView(generics.CreateAPIView):
    """ 
    Accepts POST request for create chats.\n
    Input data:
    members: int array
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def create(self, request, *args, **kwargs):
        account = acs.get_current_account(request)
        self.request.data['members'].append(account.pk)
        return super().create(request, *args, **kwargs)

class GetDeleteChatView(generics.RetrieveDestroyAPIView):
    """
    Accepts GET and DELETE requests for retrieave or delete chat.
    """
    queryset = Chat.objects.all()
    serializer_class = ChatNestedSerializer
    lookup_field = 'pk'
    permission_classes = [IsMember]

class CurrentAccountChatsView(APIView):
    """ 
    Accepts GET request for list of all chats of current account 
    """
    def get(self, *args, **kwargs):
        account = acs.get_current_account(self.request)
        account = acs.get_with_prefetched(account, 'chats')
        chat_serializer = ChatSerializer(account.chats, many=True)
        return Response(chat_serializer.data, status=200)
        