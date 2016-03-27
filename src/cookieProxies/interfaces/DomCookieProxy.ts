import { ICookieProxy } from './CookieProxy';

export interface IDomCookieProxy extends ICookieProxy {
  getAuthToken(): string;
}
