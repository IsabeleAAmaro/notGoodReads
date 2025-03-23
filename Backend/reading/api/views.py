from rest_framework import generics, permissions, filters
from rest_framework.response import Response

from ..models import Book
from reading.serializers import BookSerializer
from users.permissions import IsOwner
from django.db.models import Count, Avg, Q


class BookListCreateView(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'genre']
    ordering_fields = ['created_at', 'updated_at', 'rating']

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    lookup_field = 'id'

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)


class BookStatsView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = Book.objects.filter(user=request.user).aggregate(
            total_books=Count('id'),
            books_to_read=Count('id', filter=Q(status='QUERO_LER')),
            books_reading=Count('id', filter=Q(status='LENDO')),
            books_completed=Count('id', filter=Q(status='CONCLUIDO')),
            avg_rating=Avg('rating')
        )
        return Response(stats)