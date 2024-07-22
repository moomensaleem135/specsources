from .models import (
    Department,
    Address,
    Employee,
    Person,
    VEmployee,
    SalesOrderHeader,
    EmployeeDepartment,
)
from rest_framework import serializers


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["JobTitle"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"


class SalesOrderHeaderSerializer(serializers.ModelSerializer):
    BillToAddressID = AddressSerializer()

    class Meta:
        model = SalesOrderHeader
        fields = "__all__"


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"


class VEmployeeSerializer(serializers.ModelSerializer):
    Department = serializers.SerializerMethodField()
    BirthDate = serializers.SerializerMethodField()
    StartDate = serializers.SerializerMethodField()

    class Meta:
        model = VEmployee
        fields = "__all__"

    def get_BirthDate(self, obj):
        try:
            # Assuming there's a way to fetch related Employee instance by BusinessEntityID
            employee = Employee.objects.get(BusinessEntityID=obj.BusinessEntityID)
            return employee.BirthDate
        except Employee.DoesNotExist:
            return None

    def get_Department(self, obj):
        try:
            # Assuming there's a way to fetch related Department instance by BusinessEntityID
            department = EmployeeDepartment.objects.get(
                BusinessEntityID=obj.BusinessEntityID
            )
            return department.Department
        except Department.DoesNotExist:
            return None

    def get_StartDate(self, obj):
        try:
            # Assuming there's a way to fetch related Employee instance by BusinessEntityID
            employee = EmployeeDepartment.objects.get(
                BusinessEntityID=obj.BusinessEntityID
            )
            return employee.StartDate
        except Employee.DoesNotExist:
            return None
