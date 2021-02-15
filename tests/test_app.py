import json


def test_events(app, client):
    del app
    res = client.get('/events')
    assert res.status_code == 200