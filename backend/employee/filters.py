import django_filters
from .models import VEmployee, SalesOrderHeader, EmployeeDepartment
from django_filters.filters import DateRangeFilter, DateFilter
from datetime import timedelta


class EndFilter(django_filters.DateFilter):
    def filter(self, qs, value):
        if value:
            value = value + timedelta(1)
        return super(EndFilter, self).filter(qs, value)


class VEmployeeFilter(django_filters.FilterSet):
    Department = django_filters.CharFilter(method="filter_department", label="Department")

    class Meta:
        model = VEmployee
        fields = "__all__"

    def filter_department(self, queryset, name, value):
        business_entity_ids = EmployeeDepartment.objects.filter(
            Department__icontains=value
        ).values_list("BusinessEntityID", flat=True)
        return queryset.filter(BusinessEntityID__in=business_entity_ids)


class SalesOrderFilter(django_filters.FilterSet):
    OrderDate = DateRangeFilter()
    start_date = DateFilter(field_name="OrderDate", lookup_expr="gte")
    end_date = EndFilter(field_name="OrderDate", lookup_expr="lte")

    class Meta:
        model = SalesOrderHeader
        fields = "__all__"
