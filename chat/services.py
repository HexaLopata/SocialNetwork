from typing import Union
from .models import Chat, GroupChat, GroupMessage, Message, PrivateChat, PrivateMessage
from account.models import Account
from channels.db import database_sync_to_async


class ChatService:
    def get_chat_by_id(self, id: int, queryset=None) -> Chat:
        if queryset is None:
            queryset = self.get_all_chats()
        chat = queryset.get(id=id)
        return chat

    @database_sync_to_async
    def get_chat_by_id_async(self, id: int, queryset=None):
        return self.get_chat_by_id(id, queryset)

    def is_member(self, chat: Chat, account: Account):
        raise NotImplementedError()

    @database_sync_to_async
    def is_member_async(self, chat: Chat, account: Account):
        return self.is_member(chat, account)

    def get_all_chats(self):
        raise NotImplementedError()


class PrivateChatService(ChatService):
    def get_all_chats(self):
        return PrivateChat.objects.all()

    def get_chat_by_members(self, member_1_id: int, member_2_id: int):
        chat = PrivateChat.objects.filter(
            member_1=member_1_id, member_2=member_2_id).first()
        if(chat is not None):
            return chat
        chat = PrivateChat.objects.filter(
            member_2=member_1_id, member_1=member_2_id).first()
        if(chat is not None):
            return chat
        return None

    def is_member(self, chat: Chat, account: Account):
        return chat.member_1.id == account.id or chat.member_2.id == account.id

    def create_chat(self, member_1: Account, member_2: Account):
        return PrivateChat.objects.create(member_1=member_1, member_2=member_2)


class GroupChatService(ChatService):
    def get_all_chats(self):
        return GroupChat.objects.all()

    def is_member(self, chat: Chat, account: Account):
        account = chat.members.filter(id=account.id).first()
        return account is not None


class MessageService:
    def create_message(
        self,
        chat: Union[Chat, int],
        body: str,
        author: Union[Account, int],
        image: int
    ) -> GroupMessage:
        if isinstance(chat,  Chat):
            chat_id = chat.id
        else:
            chat_id = chat

        if isinstance(author, Account):
            author_id = author.id
        else:
            author_id = author

        return self.get_created_message(author_id, chat_id, image, body)

    @database_sync_to_async
    def create_message_async(
        self,
        chat: Union[Chat, int],
        text: str,
        author: Union[Account, int],
        image: int
    ) -> Message:
        return self.create_message(chat, text, author, image)

    def update_message(
            self,
            message: Union[Chat, int],
            text: str = None,
            image: int = None):
        if isinstance(message, Message):
            message = message
        else:
            message = self.get_message_by_id(message)

        if text is not None:
            message.body = text
        if image is not None:
            message.image = image

        message.save()

    @database_sync_to_async
    def update_message_async(
            self,
            message: Union[Message, int],
            text: str = None,
            image: int = None):
        self.update_message(message, text, image)

    def delete_message(self, message: Union[Message, int]):
        if isinstance(message, Message):
            message.delete()
        else:
            self.get_message_by_id(message).delete()

    @database_sync_to_async
    def delete_message_async(self, message: Union[Message, int]):
        self.delete_message(message)

    def is_owner(self, message: Union[Message, int], account: Union[Account, int]):
        if not isinstance(message, Message):
            message = self.get_message_by_id(message)

        if isinstance(account, Account):
            return message.author.id == account.id
        else:
            return message.author.id == account

    @database_sync_to_async
    def is_owner_async(self,  message: Union[Message, int], account: Union[Account, int]):
        return self.is_owner(message, account)

    def get_all_messages(self):
        raise NotImplementedError()

    def get_message_by_id(self, id: int) -> Message:
        raise NotImplementedError()

    def get_created_message(self, author_id: int, chat_id: int, image: int, body: str) -> Message:
        raise NotImplementedError()


class PrivateMessageService(MessageService):
    def get_all_messages(self):
        return PrivateMessage.objects.all()

    def get_message_by_id(self, id: int) -> Message:
        return PrivateMessage.objects.get(id=id)

    def get_created_message(self, author_id: int, chat_id: int, image: int, body: str) -> Message:
        return PrivateMessage.objects.create(
            author_id=author_id,
            chat_id=chat_id,
            image=image,
            body=body
        )


class GroupMessageService(MessageService):
    def get_all_messages(self):
        return GroupMessage.objects.all()

    def get_message_by_id(self, id: int) -> Message:
        return GroupMessage.objects.get(id=id)

    def get_created_message(self, author_id: int, chat_id: int, image: int, body: str) -> Message:
        return GroupMessage.objects.create(
            author_id=author_id,
            chat_id=chat_id,
            image=image,
            body=body
        )
