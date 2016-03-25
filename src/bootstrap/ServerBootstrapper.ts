import { inject } from 'inversify';

import { IServerBootstrapper } from './interfaces';
import { IRetaxConfigProxy } from '../configProxies';
import { IRetaxConfig } from '../config';

@inject('RetaxConfigProxy')
export default class ServerBootstrapper implements IServerBootstrapper {
  constructor(
    private _configProxy: IRetaxConfigProxy
  ) {}

  public config(config: IRetaxConfig): void {
    this._configProxy.config = config;
  }

  public bootstrap(): string {
    console.log('here in ServerBootstrapper');

    return 'here';
  }
}
