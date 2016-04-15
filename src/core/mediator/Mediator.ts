import { injectable, inject } from 'inversify';

import { IRetaxMediator } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { ICookieProxy } from '../cookieProxies';
import { IStateProxy } from '../stateProxies';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';
import { ILifecycleService } from '../components';
import { IJSXBuilder } from '../JSXBuilders';

import {
  COOKIE_PROXY,
  STATE_PROXY,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
  LIFECYCLE_ACTIONS_CREATOR,
  JSX_BUILDER,
} from '../inversify';

@injectable()
export default class RetaxMediator implements IRetaxMediator {
  constructor(
    @inject(COOKIE_PROXY) private _cookieProxy: ICookieProxy,
    @inject(STATE_PROXY) private _stateProxy: IStateProxy,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade,
    @inject(LIFECYCLE_ACTIONS_CREATOR) private _lifecycleActionsCreator: ILifecycleService,
    @inject(JSX_BUILDER) private _jsxBuilder: IJSXBuilder
  ) {}

  public async run(kernel: IInversifyKernelFacade): Promise<JSX.Element> {
    // initial state
    const initialState = await this._stateProxy.read();

    // this.redux Facade init
    this._reduxFacade.initialize(initialState);

    // hook preroute hook
    await this._runPreRouteHook();

    // this.router resolve route
    await this._routerFacade.initialize();

    // builder
    const appPromise =  this._jsxBuilder.build(kernel);

    return appPromise;
  }

  private async _runPreRouteHook(): Promise<void> {
    const { authToken } = this._cookieProxy;

    if (this._lifecycleActionsCreator) {
      await this._reduxFacade.dispatch(this._lifecycleActionsCreator.willResolveRoute(!!authToken));
    }
  }
}
