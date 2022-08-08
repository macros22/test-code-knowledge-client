
export enum Role {
    ADMIN = 'admin',
    USER = 'user',
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