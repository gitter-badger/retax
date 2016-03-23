import { IReducersMap } from '../../../redux';

export interface IClientOptions {
  keepInitialState?: boolean;
}

export interface IServerOptions {
  serverRendering?: boolean;
  isomorphicTools?: Object;
}

export interface IReduxStoreOptions {
  nonImmutableKeys?: string[];
  middlewares?: Redux.Middleware[];
  reducers?: IReducersMap;
  initialState?: Object;
  storeEnchancers?: Function[];
}

export interface IReactRouterOptions {
  routes?: Object;
}

export interface IRetaxOptions {
  store?: IReduxStoreOptions;
  router?: IReactRouterOptions;
  client?: IClientOptions;
  server?: IServerOptions;
}

export interface IRetaxOptionReader {
  config: IRetaxOptions;
  read(options: IRetaxOptions): IRetaxOptions;
}
