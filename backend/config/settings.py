"""
Django settings for config project.
"""

import os
from pathlib import Path
from datetime import timedelta
import dj_database_url

try:
    from decouple import config
except ImportError:
    config = os.getenv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config(
    'SECRET_KEY',
    default='django-insecure-0m35r#q@6@((37w6x+z(spye)ts%he1=#_&!qhw$p2w$mb5$g9'
)

DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = ['*']