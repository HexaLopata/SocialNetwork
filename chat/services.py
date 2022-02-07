from typing import Union
from .models import Chat, Message
from account.models import Account
from channels.db import database_sync_to_async

class ChatService:
    def get_chat_by_id(self, id: int, queryset=None) -> Chat:
        if queryset is None: queryset = Chat.objects.all()
        chat = queryset.get(id=id)
        return chat

    @database_sync_to_async
    def get_chat_by_id_async(self, id: int, queryset=None):
        return self.get_chat_by_id(id, queryset)

    def is_member(self, chat: Chat, account: Account):
        account = chat.members.filter(id=account.id).first()
        return account is not None

    @database_sync_to_async
    def is_member_async(self, chat: Chat, account: Account):
        return self.is_member(chat, account)

class MessageService:
    def create_message(
        self,
        chat: Union[Chat, int],
        text: str,
        author: Union[Account, int], 
        image : str = ''
    ) -> Message:
        if isinstance(chat, Chat):
            chat_id = chat.id
        else:
            chat_id = chat

        if isinstance(author, Account):
            author_id = author.id
        else:
            author_id = author

        return Message.objects.create(
            author_id=author_id,
            chat_id=chat_id,
            image=image,
            body=text
        )

    @database_sync_to_async
    def create_message_async(
        self, 
        chat: Union[Chat, int], 
        text: str, 
        author: Union[Account, int], 
        image : str = ''
    ) -> Message:
        return self.create_message(chat, text, author, image)

    def update_message(
        self, 
        message: Union[Message, int], 
        text: str = None, 
        image: str = None):
        if isinstance(message, Message):
            message = message
        else:
            message = Message.objects.get(id=message)

        if text is not None: message.body = text
        if image is not None: message.image = image

        message.save()

    @database_sync_to_async
    def update_message_async(
        self, 
        message: Union[Message, int], 
        text: str = None, 
        image: str = None):
        self.update_message(message, text, image)

    def delete_message(self, message: Union[Message, int]):
        if isinstance(message, Message):
            message.delete()
        else:
            Message.objects.get(id=message).delete()

    @database_sync_to_async
    def delete_message_async(self, message: Union[Message, int]):
        self.delete_message(message)

    def is_owner(self, message: Union[Message, int], account: Union[Account, int]):
        if not isinstance(message, Message):
            message = Message.objects.get(id=message)
    
        if isinstance(account, Account):
            return message.author.id == account.id
        else:
            return message.author.id == account

    @database_sync_to_async
    def is_owner_async(self,  message: Union[Message, int], account: Union[Account, int]):
        return self.is_owner(message, account)



