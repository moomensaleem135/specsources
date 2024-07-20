from django.db import models
import uuid
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    class Meta:
        abstract = True
        managed = False


class Department(BaseModel):
    DepartmentID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        db_table = "[HumanResources].[Department]"


class StateProvince(models.Model):
    StateProvinceID = models.AutoField(primary_key=True)
    StateProvinceCode = models.CharField(max_length=3)
    CountryRegionCode = models.CharField(max_length=3)
    IsOnlyStateProvinceFlag = models.BooleanField()
    Name = models.CharField(max_length=50)
    TerritoryID = models.IntegerField(
        null=True, blank=True
    )  # Adjust type based on your needs
    rowguid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        db_table = "[Person].[StateProvince]"

    def __str__(self):
        return self.Name


class Address(BaseModel):
    AddressID = models.AutoField(primary_key=True)
    AddressLine1 = models.CharField(max_length=60)
    AddressLine2 = models.CharField(max_length=60, null=True, blank=True)
    City = models.CharField(max_length=30)
    StateProvinceID = models.ForeignKey(
        StateProvince, db_column="StateProvinceID", on_delete=models.CASCADE
    )
    PostalCode = models.CharField(max_length=15)
    rowguid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"{self.AddressLine1}, {self.City}, {self.PostalCode}"

    class Meta:
        db_table = "[Person].[Address]"
        managed = False


class Person(BaseModel):
    BusinessEntityID = models.IntegerField(primary_key=True)
    PersonType = models.CharField(max_length=2)  # nchar(2)
    NameStyle = models.CharField(max_length=1)  # Enum-like; assuming a single character
    Title = models.CharField(max_length=8, null=True, blank=True)
    FirstName = models.CharField(max_length=50)
    MiddleName = models.CharField(max_length=50, null=True, blank=True)
    LastName = models.CharField(max_length=50)
    Suffix = models.CharField(max_length=10, null=True, blank=True)
    EmailPromotion = models.IntegerField()
    rowguid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        db_table = "[Person].[Person]"

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"


class Flag(models.TextChoices):
    """Assuming the Flag type is an enumeration of values like 0 and 1."""

    HOURLY = "0", "Hourly"
    SALARIED = "1", "Salaried"


class Employee(BaseModel):
    BusinessEntityID = models.IntegerField(primary_key=True)
    NationalIDNumber = models.CharField(max_length=15)
    LoginID = models.CharField(max_length=256)
    OrganizationLevel = models.IntegerField(
        null=True, blank=True
    )  # Calculated field, needs custom handling
    JobTitle = models.CharField(max_length=50)
    BirthDate = models.DateField()
    MaritalStatus = models.CharField(
        max_length=1, choices=[("S", "Single"), ("M", "Married")]
    )
    Gender = models.CharField(max_length=1, choices=[("M", "Male"), ("F", "Female")])
    HireDate = models.DateField()
    SalariedFlag = models.CharField(
        max_length=1, choices=Flag.choices, default=Flag.SALARIED
    )
    VacationHours = models.SmallIntegerField(default=0)
    SickLeaveHours = models.SmallIntegerField(default=0)
    CurrentFlag = models.CharField(
        max_length=1, choices=Flag.choices, default=Flag.SALARIED
    )
    rowguid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    ModifiedDate = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "[HumanResources].[Employee]"

    def __str__(self):
        return f"{self.LoginID} - {self.JobTitle}"


class SalesPerson(BaseModel):
    BusinessEntityID = models.PositiveIntegerField(primary_key=True)
    TerritoryID = models.PositiveIntegerField(null=True, blank=True)
    SalesQuota = models.DecimalField(
        max_digits=19, decimal_places=4, null=True, blank=True
    )
    Bonus = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    CommissionPct = models.DecimalField(max_digits=5, decimal_places=4, default=0.00)
    SalesYTD = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    SalesLastYear = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)

    class Meta:
        db_table = "[Sales].[SalesPerson]"


class Customer(models.Model):
    CustomerID = models.AutoField(primary_key=True)
    PersonID = models.ForeignKey(Person, on_delete=models.CASCADE, db_column="PersonID")
    StoreID = models.IntegerField(null=True, blank=True)
    TerritoryID = models.IntegerField(null=True, blank=True)
    AccountNumber = models.CharField(max_length=20, blank=True, default="")

    class Meta:
        db_table = "Sales.Customer"


class CountryRegion(models.Model):
    CountryRegionCode = models.CharField(max_length=3, primary_key=True)

    class Meta:
        db_table = "[Person].[CountryRegion]"


class SalesTerritory(models.Model):
    TerritoryID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=50)
    CountryRegionCode = models.ForeignKey(
        CountryRegion, on_delete=models.CASCADE, db_column="CountryRegionCode"
    )
    Group = models.CharField(max_length=50)
    SalesYTD = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    SalesLastYear = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    CostYTD = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    CostLastYear = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)

    class Meta:
        db_table = "[Sales].[SalesTerritory]"


class SalesOrderHeader(BaseModel):
    STATUS_CHOICES = [
        (0, _("In process")),
        (1, _("Approved")),
        (2, _("Backordered")),
        (3, _("Rejected")),
        (4, _("Shipped")),
        (5, _("Cancelled")),
    ]

    SalesOrderID = models.AutoField(primary_key=True)
    OrderDate = models.DateTimeField(auto_now_add=True)
    Status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=1)
    SalesOrderNumber = models.CharField(max_length=50, blank=True, editable=False)
    PurchaseOrderNumber = models.CharField(max_length=50, null=True, blank=True)
    AccountNumber = models.CharField(max_length=50, null=True, blank=True)
    SalesPersonID = models.ForeignKey(
        SalesPerson,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        db_column="SalesPersonID",
    )
    BillToAddressID = models.ForeignKey(
        Address, on_delete=models.CASCADE, db_column="BillToAddressID"
    )
    SubTotal = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    TaxAmt = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    Freight = models.DecimalField(max_digits=19, decimal_places=4, default=0.00)
    TotalDue = models.DecimalField(max_digits=19, decimal_places=4, editable=False)
    ModifiedDate = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "[Sales].[SalesOrderHeader]"


class VEmployee(BaseModel):
    BusinessEntityID = models.IntegerField(primary_key=True)
    Title = models.CharField(max_length=8, null=True, blank=True)
    FirstName = models.CharField(max_length=50)
    MiddleName = models.CharField(max_length=50, null=True, blank=True)
    LastName = models.CharField(max_length=50)
    JobTitle = models.CharField(max_length=50)
    PhoneNumber = models.CharField(max_length=25, null=True, blank=True)
    PhoneNumberType = models.CharField(max_length=50, null=True, blank=True)
    EmailAddress = models.CharField(max_length=50, null=True, blank=True)
    EmailPromotion = models.IntegerField()
    AddressLine1 = models.CharField(max_length=60)
    AddressLine2 = models.CharField(max_length=60, null=True, blank=True)
    City = models.CharField(max_length=30)
    StateProvinceName = models.CharField(max_length=50)
    PostalCode = models.CharField(max_length=15)
    CountryRegionName = models.CharField(max_length=50)

    class Meta:
        db_table = "[HumanResources].[vEmployee]"
