from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.services import accesstoken, symbols, stock_data
from datetime import timedelta

storedSymbols=[]

@api_view(['GET'])
def getStoredSymbols(request):
    return Response(storedSymbols)

@api_view(['DELETE'])
def deleteStoredSymbol(request, symbol):  
    delete_symbol = symbol
    for i in range(len(storedSymbols)):
        if delete_symbol in storedSymbols[i].keys():
            storedSymbols.pop(i) 
            break
    print(storedSymbols)
    return Response("Success")


@api_view(['GET'])
def getAccessToken(request):
    access_token = accesstoken.getAccessToken()
    return Response({"token":access_token})


@api_view(['GET'])
def getValidSymbols(request):
    token = request.GET.get('access_token')
    data = symbols.getValidSymbols(token)
    return Response({'symbols':data})


@api_view(['POST'])
def getStockData(request):
    date =  request.data['date']
    symbols = request.data['symbols']
    token = request.data['token']
    data = stock_data.getStockData(symbols,token, date)
    storedSymbols.append(data)
    return Response("Success")

