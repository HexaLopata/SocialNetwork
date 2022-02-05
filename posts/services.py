from multiprocessing.managers import BaseManager
from account.models import Account
from posts.models import Post
from django.db.models import Subquery


class PostService:
    def get_posts_of_friends(self, account: Account):
        posts = Post.objects.filter(
            author_id__in=Subquery(account.friends.values('id'))
        )
        return posts.select_related('author')
