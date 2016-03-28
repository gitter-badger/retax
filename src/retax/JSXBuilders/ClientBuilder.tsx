import { inject } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { IRetaxConfigProxy } from '../configProxy';

@inject('RetaxConfigProxy')
export default class ClientBuilder implements IJSXBuilder {
  constructor(
    private _configProxy: IRetaxConfigProxy
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { store, renderProps } = options;
    const { react: { appendChild } } = this._configProxy.config;

    return (
      <Provider store={store} key="provider">
        <div className="flex layout vertical">
          <Router {...renderProps} />
          {appendChild}
        </div>
      </Provider>
    );
  }
}
