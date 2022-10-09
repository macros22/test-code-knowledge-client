
export enum Role {
    Admin = 'admin',
    User = 'user',
}

export interface IUser {
    name: string;
    email: string;
    role: Role;
}

export interface ISignInDto {
    email: string;
    password: string;
}

export interface ISignUpDto extends ISignInDto {
    name: string;
}

export interface IAuthPageProps extends Record<string, string> {
    authMode: 'sign-in' | 'sign-up';
}