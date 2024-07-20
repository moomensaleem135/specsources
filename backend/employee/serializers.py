from .models import Department, Address, Employee, Person, VEmployee, SalesOrderHeader
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
    class Meta:
        model = VEmployee
        fields = "__all__"


class VEmployeeDetailSerializer(serializers.ModelSerializer):
    BirthDate = serializers.SerializerMethodField()

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
