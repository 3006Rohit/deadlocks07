from django.urls import path
from .views import signup, login, test_view

urlpatterns = [
    path('', test_view),
    path('signup/', signup),
    path('login/', login),
]
