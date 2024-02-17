export interface IUserDetailsDTO {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    image: string;
    imageUrl: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    email: string;
    emailConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: string | null; 
    lockoutEnabled: boolean;
    accessFailedCount: number;
}
