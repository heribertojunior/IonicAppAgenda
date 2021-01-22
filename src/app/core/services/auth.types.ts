export enum AuthProvider{
  Email
}

export interface Functions{
  name: string;
}
export interface User{
  name?: string;
  email: string;
  password: string;
  //function?: Functions;
}

export interface AuthOptions{
  isSignIn: boolean;
  provider: AuthProvider;
  user: User;
}