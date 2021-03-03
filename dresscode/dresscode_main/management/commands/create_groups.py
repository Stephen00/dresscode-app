import logging

from django.contrib.auth.models import User, Group, Permission
from django.core.management.base import BaseCommand

# Create the admin superuser group
admin, created = Group.objects.get_or_create(name='admin')
print("Creating permissions for admin...")
for permission in Permission.objects.all():
    admin.permissions.add(permission)

# Define models and permissions for staff
models = ['post', 'poll', 'article', 'quiz', 'Quiz Question', 'tag', 'media']
GROUP_PERMISSIONS = {
    'staff': {
        'view': models, 'change': models, 'add': models, 'delete': models
    }
}


# a simple command to create the models with their associated permissions
# Usage: python manage.py create_groups
class Command(BaseCommand):

    def handle(self, *args, **options):
        for group in GROUP_PERMISSIONS:
            print("Creating permissions for " + group + "...")
            new_group, created = Group.objects.get_or_create(name=group)
            # Delete old permissions, to prevent removing permissions not updating correctly
            new_group.permissions.clear()
            for p in GROUP_PERMISSIONS[group]:
                for model in GROUP_PERMISSIONS[group][p]:
                    name = 'Can {} {}'.format(p, model)
                    # Try creating the permission, otherwise return an error
                    try:
                        perm = Permission.objects.get(name=name)
                    except Permission.DoesNotExist:
                        logging.warning(" Permission not found: " + name)
                        continue
                    new_group.permissions.add(perm)
        print("Permission groups created\n")


# Assign Staff Permissions here (to-do later)

# Add bob as admin
bob = User.objects.get(username='bob')
bob.is_staff = True
admin = Group.objects.get(name='admin')
bob.groups.add(admin)
bob.save()
