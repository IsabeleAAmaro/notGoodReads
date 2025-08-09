from django.urls import path
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    LogoutView,
    UserProfileView,
    DeleteUserView,
    VerifyTokenView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('delete/', DeleteUserView.as_view(), name='delete-user'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify-token')
]
