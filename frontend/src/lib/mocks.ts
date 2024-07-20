import { faker } from "@faker-js/faker";

import { IEmployee, IDepartment, IJobTitle, ISales, IStatus } from "./types";

export const generateMockDepartments = (totalRecords: number): IDepartment[] => {
    const departments: IDepartment[] = [];

    for (let i = 0; i < totalRecords; i++) {
        departments.push({
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            value: faker.commerce.department()
        });
    }

    return departments;
};

export const generateMockJobTitles = (totalRecords: number): IJobTitle[] => {
    const jobTitles: IJobTitle[] = [];

    for (let i = 0; i < totalRecords; i++) {
        jobTitles.push({
            id: faker.string.uuid(),
            name: faker.person.jobTitle(),
            value: faker.person.jobTitle()
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
            value: faker.commerce.department()
        });
    }

    return statuses;
};

export const generateMockEmployees = (totalRecords: number): IEmployee[] => {
    const employees: IEmployee[] = [];

    for (let i = 0; i < totalRecords; i++) {
        employees.push({
            id: faker.string.uuid(),
            name: `${faker.person.firstName('male').toString()} ${faker.person.middleName('male').toString()} ${faker.person.lastName('male').toString()}`,
            email: faker.internet.email(),
            birthday: faker.date.birthdate({ min: 22, max: 70, mode: "age" }).toDateString(),
            department: faker.commerce.department(),
            jobTitle: faker.person.jobTitle(),
            startData: faker.date.anytime().toDateString(),
            endData: "",
            phoneNumber: faker.phone.number(),
            homeAddress: faker.location.streetAddress(),
        });
    }

    return employees;
};

export const generateMockSales = (totalRecords: number): ISales[] => {
    const sales: ISales[] = [];

    for (let i = 0; i < totalRecords; i++) {
        sales.push({
            id: faker.string.uuid(),
            accountNumber: faker.finance.accountNumber(),
            billToAddress: faker.location.streetAddress(),
            orderDate: faker.date.anytime().toDateString(),
            status: faker.string.sample(10),
            subTotal: faker.finance.amount(),
            tax: faker.finance.amount(),
            totalAmount: faker.finance.amount()
        });
    }

    return sales;
};