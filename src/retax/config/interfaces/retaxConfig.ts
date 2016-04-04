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

export interface IRetaxConfig {
  store?: IReduxStoreConfig;
  router?: IReactRouterConfig;
  react?: IReactConfig;
  client?: IClientConfig;
  api?: IApiConfig;
}
