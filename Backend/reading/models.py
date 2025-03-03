from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=200)  # Título do livro
    author = models.CharField(max_length=200)  # Autor do livro
    genre = models.CharField(max_length=100)  # Gênero do livro
    status = models.CharField(
        max_length=20,
        choices=[
            ('QUERO_LER', 'Quero Ler'),
            ('LENDO', 'Lendo'),
            ('CONCLUIDO', 'Concluído'),
        ],
        default='QUERO_LER'
    )  # Status de leitura
    rating = models.FloatField(
        validators=[MinValueValidator(0.5), MaxValueValidator(5.0)],
        null=True,
        blank=True
    )  # Avaliação (0.5 a 5.0)
    notes = models.TextField(blank=True)  # Anotações do usuário
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)  # Usuário que cadastrou o livro
    created_at = models.DateTimeField(auto_now_add=True)  # Data de criação
    updated_at = models.DateTimeField(auto_now=True)  # Data de atualização

    def __str__(self):
        return f"{self.title} ({self.author})"
