import firebase_admin
from firebase_admin import credentials, db
from django.conf import settings
import os

creditPath =os.path.join(settings.BASE_DIR, 'server', 'serviceAccount.json')
cred = credentials.Certificate(creditPath)
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://obva1234.firebaseio.com/'
})
