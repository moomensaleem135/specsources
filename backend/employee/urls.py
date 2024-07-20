from .viewsets import (
    AddressViewSet,
    DepartmentViewSet,
    EmployeeViewSet,
    JobTitleViewSet,
    PersonViewSet,
    VEmployeeViewSet,
)
from rest_framework import routers

router = routers.DefaultRouter()


# router.register("address", AddressViewSet)
router.register("department", DepartmentViewSet)
# router.register("employee", EmployeeViewSet)
router.register("jobtitle", JobTitleViewSet)
# router.register("salesorderheader", SalesOrderHeaderViewSet)
# router.register("person", PersonViewSet)
router.register("vemployee", VEmployeeViewSet)


urlpatterns = router.urls
