import { inject, INewable } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { Html } from '../components';
import { IRetaxConfigProxy } from '../configProxy';

@inject('RetaxConfigProxy', 'Html')
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    private _retaxConfigProxy: IRetaxConfigProxy,
    private HtmlComponent: INewable<Html>
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { HtmlComponent } = this;
    const { store, renderProps, isomorphicTools } = options;
    const { react: { appendChild } } = this._retaxConfigProxy.config;

    const assets = isomorphicTools && isomorphicTools.assets();

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
