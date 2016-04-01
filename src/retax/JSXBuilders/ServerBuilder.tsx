import { injectable } from 'inversify';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { Html, Retax } from '../components';
import { IRetaxConfigProxy, RetaxConfigProxy } from '../configProxy';

@injectable(RetaxConfigProxy, 'HtmlComponent', 'RetaxComponent')
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    private _retaxConfigProxy: IRetaxConfigProxy,
    private HtmlComponent: typeof Html,
    private RetaxComponent: typeof Retax
  ) {}

  public build(options: IBuilderConfig): JSX.Element {
    const { HtmlComponent, RetaxComponent } = this;
    const { kernel, store, renderProps, isomorphicTools } = options;
    const { react: { appendChild } } = this._retaxConfigProxy.config;

    const assets = isomorphicTools && isomorphicTools.assets();

    const rootComponent = (
      <RetaxComponent kernel={kernel}>
        <Provider store={store} key="provider">
          <div className="flex layout vertical">
            <RouterContext {...renderProps} />
            {appendChild}
          </div>
        </Provider>
      </RetaxComponent>
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
