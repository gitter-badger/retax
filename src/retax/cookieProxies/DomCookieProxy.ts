import { inject } from 'inversify';
import * as Cookie from 'js-cookie';

import { IDomCookieProxy } from './interfaces';

import { IInternalConfig } from '../../config';
import { IConfigStore } from '../../utils';

@inject('InternalConfigStore')
export default class DomCookieProxy implements IDomCookieProxy {
  constructor(
    private _store: IConfigStore<IInternalConfig>
  ) {}

  public getAuthToken(): string {
    const { COOKIE_AUTH_TOKEN_KEY } = this._store.config;
    return Cookie.get(COOKIE_AUTH_TOKEN_KEY);
  }
}
