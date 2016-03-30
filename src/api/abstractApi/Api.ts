import { inject } from 'inversify';
import fetch from 'isomorphic-fetch';

import {
  IApi,
  IUrlConfig,
  IMethodConfig,
  IFetchConfig,
  IHeader,
  IRoutesMap,
  HttpMethod,
} from './interfaces';
import { HTTP_METHODS } from './httpMethods';

import { IReduxFacade, IRetaxConfigProxy } from '../../retax';

@inject('ReduxFacade', 'ReduxConfigProxy')
abstract class AApi implements IApi {
  public baseUrl: string;
  public routes: IRoutesMap;

  private _authHeaderName: string;

  constructor(
    private _reduxFacade: IReduxFacade,
    configProxy: IRetaxConfigProxy
  ) {
    const { authHeaderName, baseUrl, routes } = configProxy.config.api;
    this._authHeaderName = authHeaderName;
    this.baseUrl = baseUrl;
    this.routes = routes;
  }

  public get<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.GET, config);
  }

  public post<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.POST, config);
  }

  public put<T>(config: IMethodConfig): Promise<T> {
    return this._abstractMethod<T>(HTTP_METHODS.PUT, config);
  }

  private async _abstractMethod<T>(
    method: HttpMethod,
    { url, filters, body, headers }: IMethodConfig
  ): Promise<T> {
    const fullUrl = this._makeFullUrl({ url, filters });
    const fetchConfig = this._makeFetchConfig({ method, body, headers });

    const response = await fetch(fullUrl, fetchConfig);

    return response.json();
  }

  /**
   * Compute the fetch configuration
   */
  private _makeFetchConfig(
    { method, body, headers }: IFetchConfig = { method: HTTP_METHODS.GET }
  ): RequestInit {
    const token = this._reduxFacade.authToken;

    const isJson = typeof body === 'object' && !(body instanceof FormData);
    const bodyToSend = isJson ? JSON.stringify(body) : body;
    const jsonHeader: IHeader = isJson ? {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } : undefined;
    const authHeader: IHeader = token ? {
      [this._authHeaderName]: token,
    } : undefined;

    return {
      body: bodyToSend,
      credentials: 'include',
      headers: Object.assign(
        jsonHeader,
        headers,
        authHeader
      ),
      method,
    };
  }

  /**
   * Create the full url on which fetch will make a call.
   */
  private _makeFullUrl(
    { url, filters }: IUrlConfig = {}
  ): string {
    return `${this.baseUrl}${url}?Filter=${JSON.stringify(filters)}`;
  }
}

export default AApi;
