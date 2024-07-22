import { faker } from '@faker-js/faker';

import { IEmployee, IDepartment, IJobTitle, ISales, IStatus } from './types';

export const generateMockDepartments = (
  totalRecords: number
): IDepartment[] => {
  const departments: IDepartment[] = [];

  for (let i = 0; i < totalRecords; i++) {
    departments.push({
      DepartmentID: faker.number.int({ min: 1, max: 1000 }),
      name: faker.commerce.department(),
    });
  }

  return departments;
};

export const generateMockJobTitles = (totalRecords: number): IJobTitle[] => {
  const jobTitles: IJobTitle[] = [];

  for (let i = 0; i < totalRecords; i++) {
    jobTitles.push({
      JobTitle: faker.person.jobTitle(),
    });
  }

  return jobTitles;
};

export const generateMockStatuses = (totalRecords: number): IStatus[] => {
  const statuses: IStatus[] = [];

  for (let i = 0; i < totalRecords; i++) {
    statuses.push({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      value: faker.commerce.department(),
    });
  }

  return statuses;
};

export const generateMockEmployees = (totalRecords: number): IEmployee[] => {
  const employees: IEmployee[] = [];

  for (let i = 0; i < totalRecords; i++) {
    employees.push({
      BusinessEntityID: faker.number.int(),
      Title: faker.person.prefix(),
      FirstName: faker.person.firstName(),
      MiddleName: faker.person.middleName(),
      LastName: faker.person.lastName(),
      JobTitle: faker.person.jobTitle(),
      PhoneNumber: faker.phone.number(),
      PhoneNumberType: faker.random.word(),
      EmailAddress: faker.internet.email(),
      EmailPromotion: faker.number.int({ min: 0, max: 2 }),
      AddressLine1: faker.location.streetAddress(),
      AddressLine2: faker.location.secondaryAddress(),
      City: faker.location.city(),
      StateProvinceName: faker.location.state(),
      PostalCode: faker.location.zipCode(),
      CountryRegionName: faker.location.country(),
      Birthday: faker.date.birthdate().toDateString(),
    });
  }

  return employees;
};

export const generateMockSales = (totalRecords: number): ISales[] => {
  const sales: ISales[] = [];

  for (let i = 0; i < totalRecords; i++) {
    sales.push({
      SalesOrderID: faker.number.int(),
      SalesOrderNumber: `SO${faker.number.int()}`,
      PurchaseOrderNumber: `PO${faker.number.int()}`,
      AccountNumber: `10-4020-${faker.number.int()}`,
      OrderDate: faker.date.anytime().toISOString(),
      Status: faker.number.int({ min: 1, max: 5 }),
      SubTotal: faker.finance.amount(),
      TaxAmt: faker.finance.amount(),
      Freight: faker.finance.amount(),
      TotalDue: faker.finance.amount(),
      ModifiedDate: faker.date.anytime().toISOString(),
      SalesPersonID: faker.number.int(),
      BillToAddressID: {
        AddressID: faker.number.int(),
        AddressLine1: faker.location.streetAddress(),
        AddressLine2: faker.location.secondaryAddress(),
        City: faker.location.city(),
        PostalCode: faker.location.zipCode(),
        rowguid: faker.string.uuid(),
        StateProvinceID: faker.number.int(),
      },
    });
  }

  return sales;
};
