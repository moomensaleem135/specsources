from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Employee, Department, Address, Person, VEmployee, SalesOrderHeader
from .serializers import (
    EmployeeSerializer,
    JobTitleSerializer,
    DepartmentSerializer,
    AddressSerializer,
    PersonSerializer,
    VEmployeeSerializer,
    VEmployeeDetailSerializer,
    SalesOrderHeaderSerializer,
)
from .filters import VEmployeeFilter, SalesOrderFilter


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class JobTitleViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.order_by("JobTitle").values("JobTitle").distinct()
    serializer_class = JobTitleSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class SalesOrderHeaderViewSet(viewsets.ModelViewSet):
    queryset = SalesOrderHeader.objects.all()
    serializer_class = SalesOrderHeaderSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    filterset_class = SalesOrderFilter
    search_fields = ["AccountNumber", "SalesOrderNumber"]


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class VEmployeeViewSet(viewsets.ModelViewSet):
    queryset = VEmployee.objects.all()
    serializer_class = VEmployeeSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    filterset_class = VEmployeeFilter
    search_fields = [
        "FirstName",
        "LastName",
        "City",
        "StateProvinceName",
        "PostalCode",
        "CountryRegionName",
        "PhoneNumber",
        "EmailAddress",
    ]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except VEmployee.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = VEmployeeDetailSerializer(instance)
        return Response(serializer.data)
