import { injectable, inject } from 'inversify';
import { match } from 'react-router';
import { replace } from 'react-router-redux';

import { IReactRouterFacade, IMatchArgs, IMatchResult } from './interfaces';

import { IReduxFacade } from '../redux';
import { IRetaxConfigStore } from '../configStores';
import { IContext } from '../context';

import {
  CONTEXT,
  REDUX_FACADE,
  RETAX_CONFIG_STORE,
} from '../inversify';

@injectable()
export default class ReactRouterFacade implements IReactRouterFacade {
  private _renderPropsPromise: Promise<ReactRouter.IRouterContextProps>;

  constructor(
    @inject(CONTEXT) private _context: IContext,
    @inject(REDUX_FACADE) private _reduxFacade: IReduxFacade,
    @inject(RETAX_CONFIG_STORE) private _configStores: IRetaxConfigStore
  ) {
    this._renderPropsPromise = this._resolveRoute();
  }

  get renderPropsPromise(): Promise<ReactRouter.IRouterContextProps> {
    if (this._renderPropsPromise === null) {
      throw new Error('The react router module has not been initialized yet');
    }

    return this._renderPropsPromise;
  }

  private async _resolveRoute(): Promise<ReactRouter.IRouterContextProps> {
    let resolutionTry = 0;
    let finalRenderProps;

    const store = await this._reduxFacade.storePromise;

    do {
      const routes = this._configStores.evaluateConfig(store).router.static;

      const { renderProps, redirectLocation } = await this._match({
        history: this._context.history,
        routes,
      });

      if (redirectLocation) {
        this._reduxFacade.dispatch(replace(redirectLocation));
      }

      finalRenderProps = renderProps;
      resolutionTry++;
    } while (!finalRenderProps && resolutionTry < 3);

    if (!finalRenderProps && resolutionTry === 3) {
      throw new Error('Error in react-router, too much try');
    }

    return finalRenderProps;
  }

  private _match(config: IMatchArgs): Promise<IMatchResult> {
    return new Promise<IMatchResult>((resolve, reject) => {
      match(config, (err, redirectLocation, renderProps) => {
        if (err) reject(err);

        resolve({
          redirectLocation,
          renderProps,
        });
      });
    });
  }
}
