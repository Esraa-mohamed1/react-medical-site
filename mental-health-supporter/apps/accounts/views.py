from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserRegisterSerializer, PatientSerializer
from .utils import send_verification_email
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print("Email received:", request.data.get('email'))  # Debug: print email received from frontend
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  # Debug: print serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()

        patient_data = request.data.copy()
        patient_data['user_id'] = user.id

        patient_serializer = PatientSerializer(data=patient_data)
        patient_serializer.is_valid(raise_exception=True)
        patient = patient_serializer.save()

        # Send verification email
        send_verification_email(user, request)

        refresh = RefreshToken.for_user(user)
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)