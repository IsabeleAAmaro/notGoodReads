from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    # profile_picture = serializers.SerializerMethodField()
    profile_picture = serializers.ImageField(
        allow_empty_file=False,
        required=False,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'profile_picture', 'bio', 'total_pages')
        extra_kwargs = {
            'password': {'write_only': True},
            'bio': {'required': False},
            'profile_picture': {'read_only': True}
        }

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture.url
        return None

    def update(self, instance, validated_data):
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data.pop('profile_picture')
        return super().update(instance, validated_data)

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            bio=validated_data.get('bio', '')
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
        except AuthenticationFailed:
            # Registrar tentativa fracassada para throttling
            self.throttle_failed()
            raise

        # Adicionar dados do usuário à resposta
        user_serializer = CustomUserSerializer(
            self.user,
            context=self.context
        )
        data.update(user_serializer.data)

        # Adicionar dados adicionais ao token payload
        data['access'] = str(data['access'])
        data['refresh'] = str(data['refresh'])

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        return token
