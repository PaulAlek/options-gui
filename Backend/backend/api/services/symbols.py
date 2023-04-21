import requests
                    
def getValidSymbols(access_token):
    if access_token:
        api_url = "https://api.livevol.com/v1/delayed/allaccess/reference/symbols"

        try:
            result = requests.get(api_url, headers={"Authorization": "Bearer " + access_token})
        except Exception:
            print('Error with calling API')

        name_set = []
        for obj in result.json():
            name_set.append(obj['name'])

        return name_set
    else:
        return "No Access Token"