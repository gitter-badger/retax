import { ICookieProxy } from './CookieProxy';

export type Cookies = any;

export interface IServerCookieProxy extends ICookieProxy {
  getAuthToken(cookies: Cookies): string;
}
