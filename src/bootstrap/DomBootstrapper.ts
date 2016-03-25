import { inject } from 'inversify';
import { browserHistory } from 'react-router';

import { IDomBootstrapper } from './interfaces';
import { IRetaxOptionReader, IRetaxOptions } from '../optionsReaders';
import { IStateReader } from '../stateReaders';
import { ICookieReader } from '../cookieReaders';
import { IReduxFacade } from '../redux';
import { IRenderer } from '../renderers';

@inject('RetaxOptionReader', 'StateReader', 'CookieReader', 'ReduxFacade', 'Renderer')
export default class DomBootstrapper implements IDomBootstrapper {
  constructor(
    private _optionsReader: IRetaxOptionReader,
    private _stateReader: IStateReader,
    private _cookieReader: ICookieReader,
    private _reduxFacade: IReduxFacade,
    private _renderer: IRenderer
  ) {}

  public config(options: IRetaxOptions): void {
    this._optionsReader.read(options);
  }

  public async bootstrap(element: Element): Promise<void> {
    // retrieve the auth token
    const authToken = this._cookieReader.getAuthToken();

    // read initial state
    const initialState = await this._stateReader.read();

    // initialize Redux store
    const store = this._reduxFacade.connectRedux(initialState, browserHistory);
    this._reduxFacade.setAuthToken(authToken);

    const routes = this._optionsReader.evaluateRoute(store);

    // render the app
    this._renderer.render({
      history: browserHistory,
      mountPoint: element,
      routes,
      store,
    });
  }
}
