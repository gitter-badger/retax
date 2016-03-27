import { IReducersMap } from '../../redux';

export interface IClientConfig {
  keepInitialState?: boolean;
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

export interface IRetaxConfig {
  store?: IReduxStoreConfig;
  router?: IReactRouterConfig;
  client?: IClientConfig;
}
