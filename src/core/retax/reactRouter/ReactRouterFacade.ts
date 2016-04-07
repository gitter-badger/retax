import { injectable } from 'inversify';
import { match } from 'react-router';
import { replace } from 'react-router-redux';

import { IReactRouterFacade, IMatchArgs, IMatchResult, IResolveRouteConfig } from './interfaces';

@injectable()
export default class ReactRouterFacade implements IReactRouterFacade {
  public async resolveRoute(config: IResolveRouteConfig): Promise<ReactRouter.IRouterContextProps> {
    let resolutionTry = 0;
    let finalRenderProps;

    do {
      const { renderProps, redirectLocation } = await this.match({
        history: config.history,
        routes: config.routes,
      });

      if (redirectLocation) {
        config.store.dispatch(replace(redirectLocation));
      }

      finalRenderProps = renderProps;
      resolutionTry++;
    } while (!finalRenderProps && resolutionTry < 3);

    if (!finalRenderProps && resolutionTry === 3) {
      throw new Error('Error in react-router');
    }

    return finalRenderProps;
  }

  private match(config: IMatchArgs): Promise<IMatchResult> {
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
