from rest_framework import permissions


class IsCreatorOfPresentation(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        if request.user:
            return post.creator == request.user
        return False


class IsOwnerOfDisplay(permissions.BasePermission):
    def has_object_permission(self, request, view, post):
        if request.user:
            return post.owner == request.user
        return False
