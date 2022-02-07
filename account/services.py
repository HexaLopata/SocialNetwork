from django.http import HttpRequest
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from account.models import Account
from channels.db import database_sync_to_async

class AccountService:
    def get_account_by_id(self, id: int, queryset = None) -> Account:
        if queryset is None: queryset = Account.objects.all()
        account: Account = queryset.get(id=id)
        return account

    def get_current_account(self, request: HttpRequest) -> Account:
        user = request.user
        if isinstance(user, AnonymousUser):
            raise ValueError('User is not authenticated')
        return user.account

    @database_sync_to_async
    def get_current_account_async(self, scope) -> Account:
        return scope['user'].account

    def send_friend_request(self, from_ : Account, to: Account):
        if from_.id == to.id:
            raise ValueError('You can`t send a request to yourself')

        already_friends = to.friends.filter(id=from_.id).first() is not None
        if already_friends:
            raise ValueError('You are already friends')

        mutual_request = to.friend_requests.filter(to_account=from_).first()
        if mutual_request is not None:
            to.friend_requests.filter(id=mutual_request.id).delete()
            to.friends.add(from_)
            from_.friends.add(to)
        else:
            if from_.friend_requests.filter(to_account=to).first() is not None:
                raise ValueError('You have already sent a request to this user')

            from_.friend_requests.create( from_account=from_, to_account=to)

    def delete_friend(self, account: Account, friend: Account):
        try:
            friend = self.get_account_by_id(friend.pk, account.friends)
        except ObjectDoesNotExist:
            raise ValueError('You aren`t friends')

        account.friends.remove(friend)
        friend.friends.remove(account)