import { injectable } from 'inversify';
import { match } from 'react-router';

import { IReactRouterFacade, IMatchArgs, IMatchResult } from './interfaces';

@injectable()
export default class ReactRouterFacade implements IReactRouterFacade {
  public match(config: IMatchArgs): Promise<IMatchResult> {
    return new Promise<IMatchResult>((resolve, reject) => {
      match(config, (err, redirectLocation, renderProps) => {
        if (err) reject(err);

        // todo: handle redirectLocation

        resolve({
          redirectLocation,
          renderProps,
        });
      });
    });
  }
}
