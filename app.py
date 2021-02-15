from flask import Flask
from flask_cors import CORS
from datetime import date
from requests import Response

import config
import requests

app = Flask(__name__)
CORS(app)

HEADERS = {"X-App-Token": config.app_token}
URL = 'https://data.cityofnewyork.us/resource/kf2b-aeh5.json?'


@app.route('/events')
def list_events():
    response = requests.get(URL, headers=HEADERS).content
    return response
