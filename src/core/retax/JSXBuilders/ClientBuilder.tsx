import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { RetaxProvider, RETAX_PROVIDER_COMPONENT } from '../components';
import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';

@injectable()
export default class ClientBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_PROXY) private _configProxy: IRetaxConfigProxy,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider
  ) {}

  public build(options: IBuilderConfig): React.ReactElement<any> {
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
