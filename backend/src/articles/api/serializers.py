from django.db.models import fields
from articles.models import Article
from rest_framework import serializers
from articles.models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'content')
