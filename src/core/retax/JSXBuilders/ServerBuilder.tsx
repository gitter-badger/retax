import { injectable } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { Html, RetaxProvider } from '../components';
import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';

@injectable(RetaxConfigProxy, 'HtmlComponent', 'RetaxProvider')
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    private _retaxConfigProxy: IRetaxConfigProxy,
    private HtmlComponent: typeof Html,
    private RetaxProviderComponent: typeof RetaxProvider
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { HtmlComponent, RetaxProviderComponent } = this;
    const { kernel, store, renderProps, isomorphicTools } = options;
    const { react: { appendChild } } = this._retaxConfigProxy.config;

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
