import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder } from './interfaces';

import { IInversifyKernelFacade } from '../inversifyKernelFacade';
import { Html, RetaxProvider } from '../components';
import { IRetaxConfigStore } from '../configStores';
import { IContext } from '../context';
import { IReduxFacade } from '../redux';
import { IReactRouterFacade } from '../reactRouter';

import {
  HTML_COMPONENT, RETAX_PROVIDER_COMPONENT,
  RETAX_CONFIG_STORE,
  REDUX_FACADE,
  REACT_ROUTER_FACADE,
  CONTEXT,
} from '../inversify';

@injectable()
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_STORE) private _configStore: IRetaxConfigStore,
    @inject(HTML_COMPONENT) private HtmlComponent: typeof Html,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(REACT_ROUTER_FACADE) private _routerFacade: IReactRouterFacade,
    @inject(CONTEXT) private _context: IContext
  ) {}

  public async build(kernel: IInversifyKernelFacade): Promise<JSX.Element> {
    const { HtmlComponent, RetaxProviderComponent } = this;
    const { react: { appendChild } } = this._configStore.config;
    const { isomorphicTools } = this._context.request;

    const [store, renderProps] = await Promise.all([this._reduxFacade.storePromise, this._routerFacade.renderPropsPromise]);

    const assets = isomorphicTools && isomorphicTools.assets();

    const rootComponent = (
      <RetaxProviderComponent kernel={kernel}>
        <Provider store={store} key="provider">
          <div className="flex layout vertical">
            <RouterContext {...renderProps} />
            {appendChild}
          </div>
        </Provider>
      </RetaxProviderComponent>
    );

    return (
      <HtmlComponent
        rootComponent={rootComponent}
        store={store}
        assets={assets}
      />
    );
  }
}
