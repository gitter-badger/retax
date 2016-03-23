export interface IClientOptions {
  keepInitialState?: boolean;
}

export interface IServerOptions {
  serverRendering?: boolean;
  isomorphicTools?: Object;
}

export interface IReduxStoreOptions {
  nonImmutableKeys?: string[];
  middlewares?: Function[];
  reducers?: Object;
  initialState?: Object;
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
  read(options: IRetaxOptions);
}
