from rest_framework.views import APIView
from rest_framework.response import Response
from account.models import Account
from account.services import AccountService
from chat.services import PrivateChatService
from .serializers import PrivateChatNestedSerializer, PrivateChatSerializer

acs = AccountService()
pcs = PrivateChatService()

class PrivateChatDetailView(APIView):
    """
    Accepts GET requests for retrieave chat.
    """

    def get(self, *args, **kwargs):
        pk = kwargs['pk']
        try:
            account = acs.get_account_by_id(pk)
        except Account.DoesNotExist:
            return Response({'detail': 'Account with specified id does not exist'}, status=404)
        account_2 = acs.get_current_account(self.request)
        chat = pcs.get_chat_by_members(account.id, account_2.id)
        if(chat is None):
            chat = pcs.create_chat(account_2, account)

        return Response(PrivateChatNestedSerializer(chat).data, status=200)


class CurrentAccountPrivateChatsView(APIView):
    """ 
    Accepts GET request for list of all chats of current account 
    """
    def get(self, *args, **kwargs):
        account = acs.get_current_account(self.request)
        chats = account.created_private_chats.all() | account.joined_private_chats.all()
        chat_serializer = PrivateChatSerializer(chats, many=True)
        return Response(chat_serializer.data, status=200)