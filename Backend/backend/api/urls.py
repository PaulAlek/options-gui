from django.urls import path
from . import views

urlpatterns = [
    path('access-token/', views.getAccessToken),
    path('get-symbols/', views.getValidSymbols),
    path('get-stock-data/', views.getStockData),
    path('get-stored-data/', views.getStoredSymbols),
    path('delete-symbol/<str:symbol>', views.deleteStoredSymbol)
]