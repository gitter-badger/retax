import { ILifecycleServiceConstructor } from '../../components';

import { IConfigStore } from '../../../utils';

export interface IClientConfig {
  keepInitialState?: boolean;
}

export interface IReducersMap {
  [key: string]: Function;
}

export interface IReduxStoreConfig {
  nonImmutableKeys?: string[];
  middlewares?: Redux.Middleware[];
  reducers?: IReducersMap;
  initialState?: Object;
  storeEnhancers?: Function[];
}

export type IRoute = ReactRouter.PlainRoute | ReactRouter.RouteElement;

export interface IReactRouterConfig {
  static?: IRoute;
  dynamic?: (store: Redux.Store, userAgent: string) => IRoute;
}

export interface IReactConfig {
  appendChild?: JSX.Element;
}

export interface IApiConfig {
  baseUrl?: string;
  authHeaderName?: string;
}

export interface ILifecycleConfig {
  willResolveRoute?: ILifecycleServiceConstructor;
}

export interface IRetaxConfig {
  api?: IApiConfig;
  client?: IClientConfig;
  lifecycle?: ILifecycleConfig;
  react?: IReactConfig;
  router?: IReactRouterConfig;
  store?: IReduxStoreConfig;
}


export interface IRetaxConfigStore extends IConfigStore<IRetaxConfig> {
  /**
   * Runtime evaluated config
   */
  evaluateConfig(store: Redux.Store): IRetaxConfig;
}
