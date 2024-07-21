/* eslint-disable no-unused-vars */
import { JSX, ReactNode } from 'react';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export interface IEmployee {
  id?: string;
  email: string;
  department: string;
  jobTitle: string;
  birthday: string;
  startData: string;
  endData: string;
  phoneNumber: string;
  homeAddress: string;
  name: string;
}

export interface IDepartment {
  id?: string;
  name: string;
  value: string;
}

export interface IJobTitle {
  id?: string;
  name: string;
  value: string;
}

export interface IStatus {
  id?: string;
  name: string;
  value: string;
}

export type IconType = (_props: IconBaseProps) => JSX.Element;

export interface ISales {
  id?: string;
  orderDate: string;
  accountNumber: string;
  billToAddress: string;
  status: string;
  subTotal: string;
  tax: string;
  totalAmount: string;
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
