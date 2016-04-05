import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IServerConfigProxy, SERVER_CONFIG_PROXY } from '../configProxy';
import { IInternalConfig, INTERNAL_CONFIG_STORE } from '../../core';
import { IConfigStore } from '../../utils';

@injectable()
export default class StaticMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    @inject(SERVER_CONFIG_PROXY) private _configProxy: IServerConfigProxy,
    @inject(INTERNAL_CONFIG_STORE) private _store: IConfigStore<IInternalConfig>
  ) {}

  public create(): IRetaxMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const markup = this._generateHtmlMarkup();
        res.status(200).send(markup);
      } catch (e) {
        next(e);
      }
    };
  }

  private _generateHtmlMarkup(): string {
    const { INITIAL_STATE_KEY } = this._store.config;
    const assets = this._configProxy.config.isomorphicTools.assets();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>RetaxTest</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body class="fullbleed layout vertical">
          <div id="root" class="flex layout vertical">
            Loading...
          </div>
          <script>
            window.${INITIAL_STATE_KEY} = ${JSON.stringify({})};
          </script>
          ${
            Object.keys(assets.javascript).map((scriptName: string, i: number) => (
              `<script src="${assets.javascript[scriptName]}" defer></script>`
            )).join('')
          }
        </body>
      </html>
    `;
  }
}
