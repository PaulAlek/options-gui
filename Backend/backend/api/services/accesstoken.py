import json
import base64
import requests
                    
# Using of Client Credentials authorization flow.
# Insert your client credentials received in welcome email.

def getAccessToken():
    client_id = "aaa_client_for_test_exercise"
    client_secret = "Jfjbi6w!"

    identity_url = "https://id.livevol.com/connect/token"

    authorization_token  = base64.b64encode((client_id + ':' + client_secret).encode())
    headers = {"Authorization": "Basic " + authorization_token.decode('ascii')}
    payload = {"grant_type": "client_credentials"}

    # Requesting access token
    try:
        token_data = requests.post(identity_url, data=payload, headers=headers)
    except Exception:
        print('Error with calling API')

    if token_data.status_code == 200:
        access_token = token_data.json()['access_token']
        if len(access_token) > 0:
            print("Authenticated successfully")
            return access_token
    else:
        print("Authentication failed")