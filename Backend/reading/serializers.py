from rest_framework import serializers
from .models import Book
# from Backend.users.models import CustomUser
from users.models import CustomUser  # Caminho absoluto


class BookSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate_rating(self, value):
        if value is not None and (value < 0.5 or value > 5.0):
            raise serializers.ValidationError("Avaliação deve ser entre 0.5 e 5.0")
        return round(value * 2) / 2
