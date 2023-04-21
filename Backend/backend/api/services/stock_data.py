import requests
                    
def getStockData(symbols, access_token, date):
    if access_token:
        api_url = "https://api.livevol.com/v1/delayed/allaccess/market/underlying-quotes?date="+date+"&symbols="+symbols

        try:
            result = requests.get(api_url, headers={"Authorization": "Bearer " + access_token})
        except Exception:
            print('Error calling API')
        
        return_object = {}

        for obj in result.json():
            current_symbol = obj['symbol']
            implied_underlying_mid = obj['implied_underlying_mid']
            iv30 = obj['iv30']
            iv30_change = obj['iv30_change']

            return_object[current_symbol] = {
                'implied_underlying_mid': implied_underlying_mid,
                'iv30': iv30,
                'iv30_change':iv30_change,

            }
        return return_object
