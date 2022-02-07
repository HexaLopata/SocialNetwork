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

class IsMember(permissions.BasePermission):
    """
    Custom permission to only allow members of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'members'):
            return obj.members.filter(id=request.user.account.id).first() is not None
        else:
            return False
