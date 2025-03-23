from django.urls import path
from .views import BookListCreateView, BookDetailView, BookStatsView

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list'),
    path('books/<int:id>/', BookDetailView.as_view(), name='book-detail'),
    path('stats/', BookStatsView.as_view(), name='book-stats'),
]