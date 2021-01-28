from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission

import logging


GROUPS_PERMISSIONS = {
    'staff': ['view', 'change'],
    'admin': ['view', 'delete', 'add', 'change']
}
groups = ['staff', 'admin']
models = ['post', 'poll', 'article', 'quiz']
permissions = ['view', 'delete', 'add', 'change'] # List of permissions for each group


# a simple command to create the models with their associated permissions
class Command(BaseCommand):

    def handle(self, *args, **options):

        for group in GROUPS_PERMISSIONS:
            print("Creating permissions for " + group)
            new_group, created = Group.objects.get_or_create(name=group)
            # Delete old permissions, to prevent removing permissions not updating correctly
            new_group.permissions.clear()
            for model in models:
                for permission in GROUPS_PERMISSIONS[group]:
                    name = 'Can {} {}'.format(permission, model)
                    # Try creating the permission, otherwise return an error
                    try:
                        perm = Permission.objects.get(name=name)
                    except Permission.DoesNotExist:
                        logging.warning("Permission not found: " + name)
                        continue
                    new_group.permissions.add(perm)
        print("Permission groups created\n")