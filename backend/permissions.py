from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
        Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'author') and hasattr(obj.author, 'user'):
            return obj.author.user == request.user
        else:
            return False
