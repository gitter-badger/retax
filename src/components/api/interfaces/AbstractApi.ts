import { IUserService } from '../../../kernel';
import { HttpMethod } from './httpMethods';
import { IRestFilter } from './restApi';

export interface IHeader extends HashMap<string> {}
export interface IRoutesMap extends HashMap<string> {}

export interface IUrlConfig {
  url?: string;
  filters?: IRestFilter;
}

export interface IRequestConfig {
  body?: BodyInit;
  headers?: IHeader;
}

export interface IFetchConfig extends IRequestConfig {
  method: HttpMethod;
}

export interface IMethodConfig extends IUrlConfig, IRequestConfig {}

export interface IApi<R extends IRoutesMap> extends IUserService {
  routes: R;

  configure(config: IApiRuntimeConfig<R>): void;

  get<T>(config: IMethodConfig): Promise<T>;
  post<T>(config: IMethodConfig): Promise<T>;
  put<T>(config: IMethodConfig): Promise<T>;
}

export interface IApiConstructor<R extends IRoutesMap> {
  new(...injected: any[]): IApi<R>;
}

export interface IApiRuntimeConfig<R> {
  routes?: R&IRoutesMap;
  baseUrl?: string;
}
