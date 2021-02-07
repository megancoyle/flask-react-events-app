from flask import Flask
from flask_cors import CORS
import requests
from datetime import date
from requests import Response

app = Flask(__name__)
CORS(app)

HEADERS = {"X-App-Token": "<add your token here>"}
PARAMS = {'$limit': 10}
URL = 'https://data.cityofnewyork.us/resource/kf2b-aeh5.json?'


@app.route('/events')
def list_events():
    response = requests.get(URL, params=PARAMS, headers=HEADERS).content
    return response
