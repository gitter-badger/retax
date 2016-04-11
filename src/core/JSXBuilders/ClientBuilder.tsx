import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';
import { RetaxProvider } from '../components';
import { IRetaxConfigStore } from '../configStores';

import {
  RETAX_PROVIDER_COMPONENT,
  RETAX_CONFIG_STORE,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
} from '../inversify';

@injectable()
export default class ClientBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _configStore: IRetaxConfigStore,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade
  ) {}

  public async build(kernel: IInversifyKernelFacade): Promise<JSX.Element> {
    const { RetaxProviderComponent} = this;
    const { react: { appendChild } } = this._configStore.config;

    const [store, renderProps] = await Promise.all([this._reduxFacade.storePromise, this._routerFacade.renderPropsPromise]);

    return (
      <RetaxProviderComponent kernel={kernel}>
        <Provider store={store} key="provider">
          <div className="flex layout vertical">
            <Router {...renderProps} />
            {appendChild}
          </div>
        </Provider>
      </RetaxProviderComponent>
    );
  }
}
