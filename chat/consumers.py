import json
from channels.generic.websocket import AsyncWebsocketConsumer
from account.models import Account
from account.services import AccountService
from .services import GroupChatService, GroupMessageService, MessageService, PrivateChatService, PrivateMessageService
from .models import  Chat, GroupChat, GroupMessage, Message
from .custom_ws_codes import *


class ChatConsumer(AsyncWebsocketConsumer):
    actions = ['add', 'edit', 'delete']
    room_prefix = 'chat_'

    def __init__(self, *args, **kwargs):
        self.as_ = AccountService()
        super().__init__(*args, **kwargs)

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = self.room_prefix + str(self.chat_id)

        try:
            self.account = await self.as_.get_current_account_async(self.scope)
        except:
            self.close(WS_UNAUTHORIZED)

        try:
            chat: Chat = await self.cs.get_chat_by_id_async(self.chat_id)
        except Chat.DoesNotExist:
            self.close(WS_DOES_NOT_EXIST)

        if not await self.cs.is_member_async(chat, self.account):
            self.close(WS_FORBIDDEN)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data['action']

        if not action in self.actions:
            return

        if action == 'add':
            await self.add_message(data)
        elif action == 'edit':
            await self.edit_message(data)
        else:
            await self.delete_message(data)

        

    async def add_message(self, data):
        payload = data['payload']
        author = await self.as_.get_current_account_async(self.scope)
        message_obj = await self.ms.create_message_async(
            chat=self.chat_id,
            author=author,
            text=payload.get('text'),
            image=payload.get('image')
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_add_action',
                'payload': message_obj,
                'id': message_obj.id,
                'author': author
            }
        )

    async def edit_message(self, data):
        changes = data['payload']
        message_id = data['id']
        author = await self.as_.get_current_account_async(self.scope)
        if not await self.ms.is_owner_async(message_id, author):
            return
        try:
            message = await self.ms.update_message_async(
                message_id,
                changes.get('text'),
                changes.get('image')
            )
        except Message.DoesNotExist:
            return

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_edit_action',
                'payload': message,
                'id': message_id,
            }
        )

    async def delete_message(self, data):
        message_id = data['id']

        author = await self.as_.get_current_account_async(self.scope)
        if not await self.ms.is_owner_async(message_id, author):
            return

        try:
            await self.ms.delete_message_async(
                message_id,
            )
        except Message.DoesNotExist:
            return

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_delete_action',
                'id': message_id,
            }
        )

    async def send_add_action(self, event):
        message = event['payload']

        author = event['author']
        await self.send(text_data=json.dumps({
            'id': message.id,
            'action': 'add',
            'payload': {
                'text': message.body,
                'image': str(message.image),
                'author': author.id,
                'date': str(message.date)
            },
        }))

    async def send_edit_action(self, event):
        message = event['payload']

        await self.send(text_data=json.dumps({
            'id': message.id,
            'action': 'edit',
            'payload': {
                'text': message.body,
                'image': message.image
            },
        }))

    async def send_delete_action(self, event):
        id = event['id']

        await self.send(text_data=json.dumps({
            'id': id,
            'action': 'delete',
        }))


class PrivateChatConsumer(ChatConsumer):
    def __init__(self, *args, **kwargs):
        self.cs = PrivateChatService()
        self.ms = PrivateMessageService()
        self.room_prefix = 'private_chat_'
        super().__init__(*args, **kwargs)

class GroupChatConsumer(ChatConsumer):
    def __init__(self, *args, **kwargs):
        self.cs = GroupChatService()
        self.ms = GroupMessageService()
        self.room_prefix = 'group_chat_'
        super().__init__(*args, **kwargs)