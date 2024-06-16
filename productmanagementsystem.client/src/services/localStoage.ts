import { IUser } from '../models/entities/user';

export class LocalStorageService {
  protected static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static set(key: string, newValue: string): void {
    localStorage.setItem(key, newValue);
  }

  static setJson(key: string, newValue: any): void {
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  protected static removeByKey(key: string): void {
    localStorage.removeItem(key);
  }
}

export class AppLocalStorageService extends LocalStorageService {
  static getSignUpEmail(): string | null {
    return this.get('signUpEmail');
  }

  static setSignUpEmail(email: string) {
    this.set('signUpEmail', email);
  }

  static getUserData(): IUser | undefined {
    const userStr = this.get('userData');
    if (userStr) return JSON.parse(userStr) as IUser;
  }

  static setUserData(userData: IUser) {
    this.set('userData', JSON.stringify(userData));
  }

  static removeUserData() {
    this.removeByKey('userData');
  }
}
