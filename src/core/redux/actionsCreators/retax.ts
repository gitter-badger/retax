// import { injectable, inject } from 'inversify';
// import { createAction } from 'redux-actions';

// import {
//   IRetaxActionsCreator,
//   IActionsCreator,
//   ISetAuthTokenPayload,
// } from './interfaces';
// import { SET_AUTH_TOKEN } from '../constants';

// import { IDomCookieProxy } from '../../cookieProxies';

// import { DOM_COOKIE_PROXY } from '../../inversify';

// @injectable()
// export default class RetaxActionsCreator implements IRetaxActionsCreator {
//   constructor(
//     @inject(DOM_COOKIE_PROXY) private _cookieProxy: IDomCookieProxy
//   ) {}

//   public setAuthToken: IActionsCreator = createAction<ISetAuthTokenPayload>(SET_AUTH_TOKEN);

//   public setCredentials(token: string) {
//     return (dispatch) => {
//       this._cookieProxy.set();
//       dispatch(this.setAuthToken)
//     }
//   }
// }


import { createAction } from 'redux-actions';

import { ISetAuthTokenPayload } from './interfaces';
import { SET_AUTH_TOKEN } from '../constants';

export const setAuthToken = createAction<ISetAuthTokenPayload>(SET_AUTH_TOKEN);
