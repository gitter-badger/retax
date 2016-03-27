import { inject } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { Html } from '../components';
import { IMiddlewareConfigProxy, IRetaxConfigProxy } from '../configProxies';

@inject('MiddlewareConfigProxy', 'RetaxConfigProxy', 'Html')
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    private _middlewareConfigProxy: IMiddlewareConfigProxy,
    private _retaxConfigProxy: IRetaxConfigProxy,
    private HtmlComponent: typeof Html
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { HtmlComponent } = this;
    const { store, renderProps } = options;
    const { isomorphicTools } = this._middlewareConfigProxy.config;
    const { react: { appendChild } } = this._retaxConfigProxy.config;

    const assets = isomorphicTools.assets();

    const rootComponent = (
      <Provider store={store} key="provider">
        <div className="flex layout vertical">
          <RouterContext {...renderProps} />
          {appendChild}
        </div>
      </Provider>
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
