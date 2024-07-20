import django_filters
from .models import VEmployee


class VEmployeeFilter(django_filters.FilterSet):
    class Meta:
        model = VEmployee
        fields = "__all__"
