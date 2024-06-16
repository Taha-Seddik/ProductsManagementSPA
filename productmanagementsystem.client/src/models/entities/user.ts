export interface IUser {
  email: string; // identifier
  token: string;
  firstName: string;
  lastName: string;
  telephone: string;
  adresse?: string;
  city?: string;
  zipCode?: string;
  birthDate?: string;
}
