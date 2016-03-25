import { IOptionReader } from './OptionReader';
import { IReducersMap } from '../../redux';

export interface IClientOptions {
  keepInitialState?: boolean;
}

export interface IReduxStoreOptions {
  nonImmutableKeys?: string[];
  middlewares?: Redux.Middleware[];
  reducers?: IReducersMap;
  initialState?: Object;
  storeEnhancers?: Function[];
}

export type IRoute = ReactRouter.PlainRoute | ReactRouter.RouteElement;

export interface IReactRouterOptions {
  static?: IRoute;
  dynamic?: (s: Redux.Store) => IRoute;
}

export interface IRetaxOptions {
  store?: IReduxStoreOptions;
  router?: IReactRouterOptions;
  client?: IClientOptions;
}

export interface IRetaxOptionReader extends IOptionReader<IRetaxOptions> {
  evaluateRoute(store: Redux.Store): IRoute;
}
