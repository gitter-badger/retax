import { ICookieProxy } from './CookieProxy';

export type Cookies = any;

export interface IRequestCookieProxy extends ICookieProxy {
  getAuthToken(cookies: Cookies): string;
}
