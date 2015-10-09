# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
#
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.mysql',
        'NAME': 'ncp',
        'USER': 'ncp',
        'PASSWORD': 'ncp',
        'HOST': '/mysql.sock', # <-- change to wherever mysql socket is placed on mysql start
        'PORT': '3306',
        'OPTIONS': { 'init_command': 'SET storage_engine=INNODB;' }
    }
}

OIPA_URL = 'http://www.oipa.nl/api/v3'
RSR_URL = 'http://rsr.akvo.org/rest/v1'
RSR_TOKEN = 'Token <token code>'