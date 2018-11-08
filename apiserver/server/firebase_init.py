import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate(
    '/home/kether/Git/Open-Bigdata-Visualization-Analysis-/apiserver/server/serviceAccount.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://obva1234.firebaseio.com/'
})
