import { inject } from 'inversify';
import { browserHistory } from 'react-router';

import { IBootstrapper } from './interfaces';
import { IRetaxOptionReader, IRetaxOptions } from '../optionsReaders/retax';
import { IStateReader } from '../stateReaders';
import { ICookieReader } from '../cookieReaders';
import { IReduxFacade } from '../redux';
import { IRenderer } from '../renderers';

@inject('IRetaxOptionReader', 'IStateReader', 'ICookieReader', 'IReduxFacade', 'IRenderer')
export default class DefaultBoostrapper implements IBootstrapper {
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
    this._reduxFacade.connectRedux(initialState, browserHistory);
    this._reduxFacade.setAuthToken(authToken);

    // render the app
    this._renderer.render({
      history: browserHistory,
      mountPoint: element,
      routes: this._optionsReader.config.router.root,
      store: this._reduxFacade.reduxStore,
    });
  }
}
