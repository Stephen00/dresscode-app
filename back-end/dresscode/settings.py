"""
Django settings for dresscode project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

print(BASE_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '4y(!5my42!#t2p()9vtj*k&ixd64yus3la7_jx4x%h7fla6-20'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG shows you error messages if there is something wrong
DEBUG = True

#ALLOWED_HOSTS CONTAINS LIST OF PLACES THAT CAN HOST THE BACK-END
#We need to keep localhost and 127.0.0.1:3000 as those are used for local deployment
#For online deployment, include host urls of your choosing (Sometimes you might need to include protocol, others you won't, e.g http:// and https://)
ALLOWED_HOSTS = ['dresscode-server.herokuapp.com', 'localhost:8000', '127.0.0.1', '127.0.0.1:8000', '127.0.0.1:8000']


# Application definition

INSTALLED_APPS = [
    'admin_interface',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'dresscode_main',
    'rest_framework',
    'corsheaders',
    'tinymce',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'dresscode.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dresscode.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


#CORS ORIGIN WHITELIST CONTAINS LIST OF PLACES THAT CAN CONNECT TO THE BACK-END AND REQUEST DATA FROM IT
#Keep localhost and 127.0.0.1:3000 as those are used for local deployment
#For online deployment, include client-urls of your choosing (Remember to include protocol, e.g http:// and https://)
CORS_ORIGIN_WHITELIST = [
    'http://dresscode-client.herokuapp.com', 'https://dresscode-client.herokuapp.com', 'http://localhost:3000', 'http://127.0.0.1:3000'
]


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static/')
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media/') 
MEDIA_URL = '/media/'


#TinyMCE configuration
TINYMCE_DEFAULT_CONFIG = {
    'cleanup_on_startup': True,
    'custom_undo_redo_levels': 20,
    'selector': 'textarea',
    'theme': 'silver',
    'height': 450,
    'plugins': '''
            textcolor save link image media preview codesample contextmenu
            table code lists fullscreen  insertdatetime  nonbreaking
            contextmenu directionality searchreplace wordcount visualblocks
            visualchars code fullscreen autolink lists  charmap print  hr
            anchor pagebreak
            ''',
    'toolbar1': '''
            fullscreen preview bold italic underline | fontselect,
            fontsizeselect  | forecolor backcolor | alignleft alignright |
            aligncenter alignjustify | indent outdent | bullist numlist table |
            | link image media | codesample |
            ''',
    'toolbar2': '''
            visualblocks visualchars |
            charmap hr pagebreak nonbreaking anchor |  code |
            ''',
    'contextmenu': 'formats | link image',
    'menubar': True,
    'statusbar': True,
}

# THESE ARE OUR HEROKU SETTINGS CONFIGURATION
# HEROKU IS THE HOSTING SERVER WE USED TO DEPLOY THE APPLICATION, YOU DON'T NEED TO USE THE SAME ONE. 
# IF YOU DON'T WANT TO USE THE SAME HOSTING APPLICATION YOU WILL HAVE TO CHANGE THIS SETTINGS TO THAT PARTICULAR HOST'S IMPLEMENTATION
import django_heroku
django_heroku.settings(locals(), test_runner=False)