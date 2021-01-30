import logging

from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand

GROUPS_PERMISSIONS = {
    'staff': ['view', 'change'],
    'admin': ['view', 'delete', 'add', 'change']
}
models = ['post', 'poll', 'article', 'quiz', 'Quiz Question']


# a simple command to create the models with their associated permissions
class Command(BaseCommand):

    def handle(self, *args, **options):

        for group in GROUPS_PERMISSIONS:
            print("Creating permissions for " + group + "...")
            new_group, created = Group.objects.get_or_create(name=group)
            # Delete old permissions, to prevent removing permissions not updating correctly
            new_group.permissions.clear()
            for model in models:
                for permission in GROUPS_PERMISSIONS[group]:
                    name = 'Can {} {}'.format(permission, model)
                    # Try creating the permission, otherwise return an error
                    try:
                        perm = Permission.objects.get(name=name)
                    except perm.DoesNotExist:
                        logging.warning(" Permission not found: " + name)
                        continue
                    new_group.permissions.add(perm)
        print("Permission groups created\n")
