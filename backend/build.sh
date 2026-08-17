#!/usr/bin/env bash
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

python manage.py shell -c "
from accounts.models import User
if not User.objects.filter(username='admin@example.com').exists():
    User.objects.create_superuser('admin@example.com', 'admin@example.com', 'test1234')
else:
    u = User.objects.get(username='admin@example.com')
    u.set_password('test1234')
    u.save()
"