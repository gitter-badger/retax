import { inject } from 'inversify';
import * as Cookie from 'js-cookie';

import { ICookieReader } from './interfaces';
import { IInternalConfig } from '../internalConfig';

@inject('InternalConfig')
export default class DomCookieReader implements ICookieReader {
  constructor(
    private _internalConfig: IInternalConfig
  ) {}

  public getAuthToken(): any {
    const { COOKIE_AUTH_TOKEN_KEY } = this._internalConfig;
    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
