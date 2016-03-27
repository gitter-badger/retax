import { HttpMethod } from './httpMethods';

export type RestFilter = Object;
export interface IHeader {
  [key: string]: string;
}

export interface IRoutesMap {
  [key: string]: string;
}

export interface IUrlConfig {
  url?: string;
  filters?: RestFilter;
}

export interface IRequestConfig {
  body?: BodyInit;
  headers?: IHeader;
}

export interface IFetchConfig extends IRequestConfig {
  method: HttpMethod;
}

export interface IMethodConfig extends IUrlConfig, IRequestConfig {}

export interface IApi {
  baseUrl: string;
  routes: IRoutesMap;
  get<T>(config: IMethodConfig): Promise<T>;
  post<T>(config: IMethodConfig): Promise<T>;
  put<T>(config: IMethodConfig): Promise<T>;
}
