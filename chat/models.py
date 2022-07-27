from django.db import models
from account.models import Account
from file_api.models import Image


class Chat(models.Model):
    class Meta:
        abstract = True


class PrivateChat(Chat):
    member_1 = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='created_private_chats')
    member_2 = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='joined_private_chats')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                name="%(app_label)s_%(class)s_members_are_unique",
                fields=['member_1', 'member_2'],
            ),
        ]


class GroupChat(Chat):
    members = models.ManyToManyField(Account, related_name='group_chats')
    name = models.TextField(max_length=50)
    image = models.OneToOneField(
        Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='group_chat')
    background_image = models.OneToOneField(
        Image, blank=True, null=True, on_delete=models.SET_NULL, related_name='background_chat')

    def delete(self, *args, **kwargs):
        self.image.delete()
        self.background_image.delete()
        super().delete(*args, **kwargs)


class Message(models.Model):
    body = models.TextField()
    image = models.OneToOneField(
        Image, blank=True, null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)


class GroupMessage(Message):
    author = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL, related_name='group_messages')
    chat = models.ForeignKey(
        GroupChat, on_delete=models.CASCADE, related_name='messages')


class PrivateMessage(Message):
    author = models.ForeignKey(Account, null=True, on_delete=models.SET_NULL, related_name='private_messages')
    chat = models.ForeignKey(
        PrivateChat, on_delete=models.CASCADE, related_name='messages')
