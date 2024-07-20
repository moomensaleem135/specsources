from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Employee,
    JobTitle,
    Department,
    Address,
    Person,
    VEmployee,
)
from .serializers import (
    EmployeeSerializer,
    JobTitleSerializer,
    DepartmentSerializer,
    AddressSerializer,
    PersonSerializer,
    VEmployeeSerializer,
)
from .filters import VEmployeeFilter


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class JobTitleViewSet(viewsets.ModelViewSet):
    queryset = JobTitle.objects.all()
    serializer_class = JobTitleSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


# class SalesOrderHeaderViewSet(viewsets.ModelViewSet):
#     queryset = SalesOrderHeader.objects.all()
#     serializer_class = SalesOrderHeaderSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class VEmployeeViewSet(viewsets.ModelViewSet):
    queryset = VEmployee.objects.all()
    serializer_class = VEmployeeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = VEmployeeFilter
