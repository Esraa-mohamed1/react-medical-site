# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Mental Health Supporter application.

## Prerequisites

1. A Google Cloud Console account
2. A Google Cloud Project

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Mental Health Supporter"
   - User support email: Your email
   - Developer contact information: Your email
4. Add the following scopes:
   - `email`
   - `profile`
   - `openid`
5. Add test users (your email addresses) if you're in testing mode

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set the following:
   - Name: "Mental Health Supporter Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
5. Click "Create"
6. Copy the Client ID

## Step 4: Configure Environment Variables

1. Create a `.env` file in the root directory of your React app
2. Add the following:

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

Replace `your-google-client-id-here` with the Client ID you copied in Step 3.

## Step 5: Backend Configuration

Make sure your Django backend has the following endpoint configured:

```
POST /accounts/login/social/token/
```

The endpoint should accept:
```json
{
  "provider": "google-oauth2",
  "access_token": "google-access-token"
}
```

And return:
```json
{
  "access": "jwt-access-token",
  "refresh": "jwt-refresh-token",
  "user": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "full_name": "User Name"
  }
}
```

## Step 6: Test the Integration

1. Start your React development server: `npm start`
2. Start your Django backend server
3. Go to the login page
4. Click the "Continue with Google" button
5. Complete the Google OAuth flow
6. You should be redirected to the home page after successful authentication

## Troubleshooting

### Common Issues:

1. **"Invalid Client ID" error**: Make sure your Client ID is correct and the domain is authorized
2. **"Redirect URI mismatch"**: Ensure your redirect URIs in Google Console match your app URLs
3. **"API not enabled"**: Make sure the Google+ API is enabled in your Google Cloud Console
4. **CORS errors**: Ensure your backend allows requests from your frontend domain

### Development vs Production:

- For development: Use `http://localhost:3000`
- For production: Use your actual domain (e.g., `https://yourdomain.com`)
- Update the authorized origins and redirect URIs in Google Console accordingly

## Security Notes

1. Never commit your `.env` file to version control
2. Use environment variables for all sensitive configuration
3. Regularly rotate your OAuth credentials
4. Monitor your OAuth usage in Google Cloud Console 