from .viewsets import (
    AddressViewSet,
    DepartmentViewSet,
    EmployeeViewSet,
    JobTitleViewSet,
    PersonViewSet,
    VEmployeeViewSet,
    SalesOrderHeaderViewSet,
)
from .views import SalesOrderStatsAPIView
from rest_framework import routers
from django.urls import path

router = routers.DefaultRouter()


# router.register("address", AddressViewSet)
router.register("department", DepartmentViewSet)
# router.register("employee", EmployeeViewSet)
router.register("jobtitle", JobTitleViewSet)
router.register("salesorderheader", SalesOrderHeaderViewSet)
# router.register("person", PersonViewSet)
router.register("vemployee", VEmployeeViewSet)


urlpatterns = [
    path("stats/<int:employee_id>/", SalesOrderStatsAPIView.as_view()),
]
