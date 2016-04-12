import { isSetAuthTokenAction } from '../actionsCreators';

import { ICookieProxy } from '../../cookieProxies';
import { IAction } from '../../../utils';

export default function credentialsMiddleware(cookieProxy: ICookieProxy): Redux.Middleware {
  return () => next => (action: IAction<any, any>) => {
    if (!isSetAuthTokenAction(action)) {
      return next(action);
    } else {
      const { payload } = action;
      cookieProxy.authToken = payload;
    }
  };
}
