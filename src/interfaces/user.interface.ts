
export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

export interface IUser {
    name: string;
    email: string;
    role: Role;
}