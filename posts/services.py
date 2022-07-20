from account.models import Account
from posts.models import Post
from django.db.models import Subquery, QuerySet


class PostService:
    def get_posts_of_friends(self, account: Account, queryset: QuerySet = None):
        if queryset is None:
            queryset = Post.objects.all()

        posts = queryset.filter(
            author_id__in=Subquery(account.friends.values('id'))
        )
        return posts.select_related('author')

    def get_liked_posts(self, account: Account, queryset: QuerySet = None):
        if queryset is None:
            queryset = Account.objects.all()

        posts = queryset.filter(likes=account.id)
        return posts