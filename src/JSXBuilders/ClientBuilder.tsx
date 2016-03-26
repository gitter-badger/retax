/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { IJSXBuilder, IBuilderConfig } from './interfaces';

export default class ClientBuilder implements IJSXBuilder {
  public build(options: IBuilderConfig): JSX.Element {
    const { store, renderProps } = options;

    return (
      <Provider store={store} key="provider">
        <div className="flex layout vertical">
          <Router {...renderProps} />
        </div>
      </Provider>
    );
  }
}
