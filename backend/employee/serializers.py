from .models import (
    Department,
    JobTitle,
    Address,
    Employee,
    Person,
    VEmployee,
)
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTitle
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"


# class SalesOrderHeaderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SalesOrderHeader
#         fields = "__all__"


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"


class VEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VEmployee
        fields = "__all__"
