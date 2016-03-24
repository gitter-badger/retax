import { IReducersMap } from '../../redux';

export interface IClientOptions {
  keepInitialState?: boolean;
}

export interface IReduxStoreOptions {
  nonImmutableKeys?: string[];
  middlewares?: Redux.Middleware[];
  reducers?: IReducersMap;
  initialState?: Object;
  storeEnchancers?: Function[];
}

export interface IReactRouterOptions {
  root?: ReactRouter.PlainRoute | ReactRouter.RouteElement;
}

export interface IRetaxOptions {
  store?: IReduxStoreOptions;
  router?: IReactRouterOptions;
  client?: IClientOptions;
}
