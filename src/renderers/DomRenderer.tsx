/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, match } from 'react-router';

import { IRenderer, IRendererOptions, IAppTemplateOptions } from './interfaces';

export default class DomRenderer implements IRenderer {
  public render(options: IRendererOptions): void {
    const { store, history, routes, mountPoint, children } = options;

    const location = history.createLocation(window.location);

    match({ routes, location }, () => {
      // seperate renders in 2 phase to not break server rendering!
      render(this.appTemplate({
        history,
        routes,
        store,
      }), mountPoint);

      if (children) {
        render(this.appTemplate({
          history,
          routes,
          store,
          children,
        }), mountPoint);
      }
    });
  }

  private appTemplate(options: IAppTemplateOptions): JSX.Element {
    const { store, routes, history } = options;

    return (
      <Provider store={store} key="provider">
        <div className="flex layout vertical">
          <Router
            routes={routes}
            history={history}
          />
        </div>
      </Provider>
    );
  }
}
