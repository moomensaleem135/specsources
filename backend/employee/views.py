from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SalesOrderHeader


class SalesOrderStatsAPIView(APIView):
    def get(self, request, employee_id, *args, **kwargs):

        if not employee_id:
            return Response(
                {"detail": "employee_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        sales_orders = SalesOrderHeader.objects.filter(SalesPersonID=employee_id)

        total_sales = 0
        total_sales_with_freight_and_tax = 0
        total_sales_without_freight_and_tax = 0

        for order in sales_orders:
            subtotal = float(order.SubTotal)
            tax = float(order.TaxAmt)
            freight = float(order.Freight)

            total_sales += subtotal
            total_sales_with_freight_and_tax += subtotal + tax + freight
            total_sales_without_freight_and_tax += subtotal

        count = sales_orders.count()
        average_sales = total_sales / count if count else 0
        average_sales_with_freight_and_tax = (
            total_sales_with_freight_and_tax / count if count else 0
        )
        average_sales_without_freight_and_tax = (
            total_sales_without_freight_and_tax / count if count else 0
        )

        data = {
            "total_sales_with_freight_and_tax": total_sales_with_freight_and_tax,
            "average_sales_with_freight_and_tax": average_sales_with_freight_and_tax,
            "total_sales_without_freight_and_tax": total_sales_without_freight_and_tax,
            "average_sales_without_freight_and_tax": average_sales_without_freight_and_tax,
        }

        return Response(data, status=status.HTTP_200_OK)
