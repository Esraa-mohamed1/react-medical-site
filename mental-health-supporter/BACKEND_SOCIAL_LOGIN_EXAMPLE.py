# Example Django backend endpoint for Google OAuth
# Add this to your Django views.py file

import requests
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def google_social_login(request):
    """
    Handle Google OAuth token exchange
    Expected payload:
    {
        "provider": "google-oauth2",
        "access_token": "google-access-token"
    }
    """
    try:
        provider = request.data.get('provider')
        access_token = request.data.get('access_token')
        
        if not provider or provider != 'google-oauth2':
            return Response(
                {'error': 'Invalid provider'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not access_token:
            return Response(
                {'error': 'Access token is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verify the Google access token and get user info
        google_user_info = verify_google_token(access_token)
        
        if not google_user_info:
            return Response(
                {'error': 'Invalid Google access token'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create user
        user = get_or_create_google_user(google_user_info)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'full_name': getattr(user, 'full_name', ''),
                'role': getattr(user, 'role', 'patient')
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Google social login error: {str(e)}")
        return Response(
            {'error': 'Authentication failed'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

def verify_google_token(access_token):
    """
    Verify Google access token and return user info
    """
    try:
        # Google's token info endpoint
        url = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
        params = {'access_token': access_token}
        
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            token_info = response.json()
            
            # Get user info from Google
            user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
            headers = {'Authorization': f'Bearer {access_token}'}
            
            user_response = requests.get(user_info_url, headers=headers)
            
            if user_response.status_code == 200:
                user_info = user_response.json()
                return {
                    'email': user_info.get('email'),
                    'name': user_info.get('name'),
                    'given_name': user_info.get('given_name'),
                    'family_name': user_info.get('family_name'),
                    'picture': user_info.get('picture'),
                    'sub': user_info.get('id')  # Google user ID
                }
        
        return None
        
    except Exception as e:
        print(f"Error verifying Google token: {str(e)}")
        return None

def get_or_create_google_user(google_user_info):
    """
    Get existing user or create new user from Google info
    """
    email = google_user_info.get('email')
    
    if not email:
        raise ValueError("Email is required from Google user info")
    
    # Try to find existing user by email
    try:
        user = User.objects.get(email=email)
        return user
    except User.DoesNotExist:
        pass
    
    # Create new user
    username = email.split('@')[0]  # Use email prefix as username
    base_username = username
    counter = 1
    
    # Ensure unique username
    while User.objects.filter(username=username).exists():
        username = f"{base_username}{counter}"
        counter += 1
    
    # Create user with Google info
    user = User.objects.create_user(
        username=username,
        email=email,
        password=None,  # No password for social login
        first_name=google_user_info.get('given_name', ''),
        last_name=google_user_info.get('family_name', ''),
        is_active=True
    )
    
    # Set additional fields if your User model has them
    if hasattr(user, 'full_name'):
        user.full_name = google_user_info.get('name', '')
    
    if hasattr(user, 'profile_picture'):
        user.profile_picture = google_user_info.get('picture', '')
    
    user.save()
    
    return user

# URL configuration (add to your urls.py)
"""
from django.urls import path
from .views import google_social_login

urlpatterns = [
    # ... your other URLs
    path('accounts/login/social/token/', google_social_login, name='google_social_login'),
]
"""

# Required packages (add to requirements.txt)
"""
requests>=2.25.1
djangorestframework-simplejwt>=4.8.0
""" 