import { inject } from 'inversify';
import { browserHistory } from 'react-router';

import { IBootstrapper } from './interfaces';
import { IRetaxOptionReader, IRetaxOptions } from '../optionsReaders/retax';
import { IStateReader } from '../stateReaders';
import { ICookieReader } from '../cookieReaders';
import { IReduxFacade } from '../redux';

@inject('IRetaxOptionReader', 'IStateReader', 'ICookieReader', 'IReduxFacade')
export default class DefaultBoostrapper implements IBootstrapper {
  constructor(
    private _optionsReader: IRetaxOptionReader,
    private _stateReader: IStateReader,
    private _cookieReader: ICookieReader,
    private _reduxFacade: IReduxFacade
  ) {}

  public config(options: IRetaxOptions): void {
    this._optionsReader.read(options);
  }

  public async bootstrap(): Promise<void> {
    // read initial state
    const initialState = await this._stateReader.read();

    // initialize Redux store
    this._reduxFacade.connectRedux(initialState, browserHistory);

    // retrieve the auth token
    console.log(this._cookieReader.getAuthToken());
  }
}
