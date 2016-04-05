import {
  IUserService,
} from './Injector';

import { IReduxFacade, IRetaxConfigProxy } from '../../../retax';

/**
 * API Like service
 */
export interface IRoutesMap extends HashMap<string> {}

/**
 * This is the type of the object passed in the annotation
 */
export interface IApiServiceRuntimeConfig {
  routes?: IRoutesMap;
  baseUrl?: string;
}

/**
 * This is the type of the configure function of the api
 * In this case, it is the same than `IApiRuntimeConfig`
 */
export interface IApiServiceConfig extends IApiServiceRuntimeConfig {}

/**
 * A service allowing to create an api
 */
export interface IApiService extends IUserService {
  routes: IRoutesMap;

  configure(config: IApiServiceRuntimeConfig): void;
}

export interface IAggregateApiService {
  reduxFacade: IReduxFacade;
  configProxy: IRetaxConfigProxy;
}

export interface IApiServiceConstructor {
  new(_reduxFacade: IReduxFacade, _configProxy: IRetaxConfigProxy): IApiService;
}


