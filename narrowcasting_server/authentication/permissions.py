from rest_framework import permissions

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, acount):
        if request.user:
            return account == request.user
        return False

