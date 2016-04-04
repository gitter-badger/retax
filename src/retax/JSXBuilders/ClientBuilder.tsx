import { injectable } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { RetaxProvider } from '../components';
import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';

@injectable(RetaxConfigProxy, 'RetaxProvider')
export default class ClientBuilder implements IJSXBuilder {
  constructor(
    private _configProxy: IRetaxConfigProxy,
    private RetaxProviderComponent: typeof RetaxProvider
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { RetaxProviderComponent} = this;
    const { kernel, store, renderProps } = options;
    const { react: { appendChild } } = this._configProxy.config;

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
