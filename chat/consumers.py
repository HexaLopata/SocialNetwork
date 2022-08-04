import json
import os
from channels.generic.websocket import AsyncWebsocketConsumer
from account.services import AccountService
from file_api.services import ImageService
from helpers.is_int import is_int
from .services import GroupChatService, GroupMessageService, PrivateChatService, PrivateMessageService
from file_api.serializers import ImageSerializer
from .models import Chat, Message
from .custom_ws_codes import *
from social_network.settings import MEDIA_URL


class ChatConsumer(AsyncWebsocketConsumer):
    actions = ['add', 'edit', 'delete']
    room_prefix = 'chat_'

    def __init__(self, *args, **kwargs):
        self.account_service = AccountService()
        self.image_service = ImageService()
        super().__init__(*args, **kwargs)

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = self.room_prefix + str(self.chat_id)

        try:
            self.account = await self.account_service.get_current_account_async(self.scope)
        except:
            self.close(WS_UNAUTHORIZED)

        try:
            chat: Chat = await self.chat_service.get_chat_by_id_async(self.chat_id)
        except Chat.DoesNotExist:
            self.close(WS_DOES_NOT_EXIST)

        if not await self.chat_service.is_member_async(chat, self.account):
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
        author = await self.account_service.get_current_account_async(self.scope)
        image = None
        if(is_int(payload.get('image'))):
            image = await self.image_service.get_image_by_id_async(int(payload.get('image')))

        message_obj = await self.message_service.create_message_async(
            chat=self.chat_id,
            author=author,
            text=payload.get('text'),
            image=image
        )

        if(image is not None):
            payload['image_source'] = '/' + MEDIA_URL + str(image.source)
        payload['body'] = str(message_obj.body)
        if(message_obj.image):
            payload['image'] = message_obj.image.id
        payload['date'] = str(message_obj.date)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_add_action',
                'payload': payload,
                'id': message_obj.id,
                'author': author
            }
        )

    async def edit_message(self, data):
        changes = data['payload']
        message_id = data['id']
        author = await self.account_service.get_current_account_async(self.scope)
        if(is_int(changes.get('image'))):
            image = await self.image_service.get_image_by_id_async(int(changes.get('image')))
        if not await self.message_service.is_owner_async(message_id, author):
            return
        try:
            message = await self.message_service.update_message_async(
                message_id,
                changes.get('text'),
                image=image
            )
        except Message.DoesNotExist:
            return

        image = await self.image_service.get_image_by_id_async(message.image)
        if(image is not None):
            changes['image_source'] = '/' + MEDIA_URL + str(image.source)
        changes['body'] = message.text
        if(message.image):
            changes['image'] = message.image.id
        changes['date'] = message.date

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_edit_action',
                'payload': changes,
                'id': message_id,
            }
        )

    async def delete_message(self, data):
        message_id = data['id']

        author = await self.account_service.get_current_account_async(self.scope)
        if not await self.message_service.is_owner_async(message_id, author):
            return

        try:
            await self.message_service.delete_message_async(
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
            'id': event.get('id'),
            'action': 'add',
            'payload': {
                'text': message.get('body'),
                'image': message.get('image'),
                'image_source': message.get('image_source'),
                'author': author.id,
                'date': message.get('date')
            },
        }))

    async def send_edit_action(self, event):
        message = event['payload']

        await self.send(text_data=json.dumps({
            'id': event.get('id'),
            'action': 'edit',
            'payload': {
                'text': message.get('body'),
                'image': message.get('image'),
                'image_source': message.get('image_source'),
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
        self.chat_service = PrivateChatService()
        self.message_service = PrivateMessageService()
        self.room_prefix = 'private_chat_'
        super().__init__(*args, **kwargs)


class GroupChatConsumer(ChatConsumer):
    def __init__(self, *args, **kwargs):
        self.chat_service = GroupChatService()
        self.message_service = GroupMessageService()
        self.room_prefix = 'group_chat_'
        super().__init__(*args, **kwargs)
