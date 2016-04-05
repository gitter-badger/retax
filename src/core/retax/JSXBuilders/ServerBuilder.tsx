import { injectable, inject } from 'inversify';
import * as React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

import { Html, RetaxProvider, HTML_COMPONENT, RETAX_PROVIDER_COMPONENT } from '../components';
import { IRetaxConfigProxy, RETAX_CONFIG_PROXY } from '../configProxy';

@injectable()
export default class ServerBuilder implements IJSXBuilder {
  constructor(
    @inject(RETAX_CONFIG_PROXY) private _retaxConfigProxy: IRetaxConfigProxy,
    @inject(HTML_COMPONENT) private HtmlComponent: typeof Html,
    @inject(RETAX_PROVIDER_COMPONENT) private RetaxProviderComponent: typeof RetaxProvider
  ) {}

  public build(options: IBuilderConfig): React.ReactElement<any> {
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
