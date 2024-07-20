import django_filters
from .models import VEmployee, SalesOrderHeader
from django_filters.filters import DateRangeFilter, DateFilter
from datetime import timedelta


class EndFilter(django_filters.DateFilter):
    def filter(self, qs, value):
        if value:
            value = value + timedelta(1)
        return super(EndFilter, self).filter(qs, value)


class VEmployeeFilter(django_filters.FilterSet):
    class Meta:
        model = VEmployee
        fields = "__all__"


class SalesOrderFilter(django_filters.FilterSet):
    OrderDate = DateRangeFilter()
    start_date = DateFilter(field_name="OrderDate", lookup_expr="gte")
    end_date = EndFilter(field_name="OrderDate", lookup_expr="lte")

    class Meta:
        model = SalesOrderHeader
        fields = "__all__"
