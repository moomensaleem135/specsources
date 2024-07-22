/* eslint-disable no-unused-vars */
import { JSX } from 'react';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export interface IEmployeesRequestParams {
  page: number;
  search: string;
  JobTitle: string;
}

export interface IEmployee {
  BusinessEntityID: number;
  Title: string | null;
  FirstName: string;
  MiddleName: string | null;
  LastName: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneNumberType: string;
  EmailAddress: string;
  EmailPromotion: number;
  AddressLine1: string;
  AddressLine2: string | null;
  City: string;
  StateProvinceName: string;
  PostalCode: string;
  CountryRegionName: string;
  Birthday?: string;
}

export interface IDepartment {
  DepartmentID: number;
  name: string;
}

export interface IJobTitle {
  JobTitle: string;
}

export interface IStatus {
  id?: string;
  name: string;
  value: string;
}

export type IconType = (_props: IconBaseProps) => JSX.Element;

export interface ISalesRequestParams {
  page?: number;
  Status?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
}

export interface ISalesInfo {
  total_sales_with_freight_and_tax?: number;
  average_sales_with_freight_and_tax?: number;
  average_sales_without_freight_and_tax?: number;
  total_sales_without_freight_and_tax?: number;
}

export interface ISales {
  SalesOrderID: number;
  SalesOrderNumber: string;
  PurchaseOrderNumber: string;
  AccountNumber: string;
  OrderDate: string;
  Status: number;
  SubTotal: string;
  TaxAmt: string;
  Freight: string;
  TotalDue: string;
  ModifiedDate: string;
  SalesPersonID: number;
  BillToAddressID: {
    AddressID: number;
    AddressLine1: string;
    AddressLine2: string | null;
    City: string;
    PostalCode: string;
    rowguid: string;
    StateProvinceID: number;
  };
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  image?: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface IPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IEmployeeResponse extends IPaginatedResponse<IEmployee> {}
export interface IDepartmentResponse extends IPaginatedResponse<IDepartment> {}
export interface IJobTitleResponse extends IPaginatedResponse<IJobTitle> {}
export interface ISalesResponse extends IPaginatedResponse<ISales> {}
