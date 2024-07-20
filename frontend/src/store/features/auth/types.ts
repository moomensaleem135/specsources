export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  image?: string;
}

export interface IInitialState {
  user: IUser | null | undefined;
  isAuthenticated: boolean;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}