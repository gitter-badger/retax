import { inject } from 'inversify';

import { Request, Response, NextFunction } from 'express';

import { IRetaxMiddlewareFactory, IRetaxMiddleware } from './interfaces';

import { IOptionReader, IMiddlewareOptions } from '../optionsReaders';
import { IInternalConfig } from '../internalConfig';

@inject('MiddlewareOptionReader', 'InternalConfig')
export default class StaticMiddlewareFactory implements IRetaxMiddlewareFactory {
  constructor(
    private _optionsReader: IOptionReader<IMiddlewareOptions>,
    private _internalConfig: IInternalConfig
  ) {}

  public create(): IRetaxMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send(
        this.generateHtmlMarkup()
      );
    };
  }

  private generateHtmlMarkup(): string {
    const { INITIAL_STATE_KEY } = this._internalConfig;
    const assets = this._optionsReader.config.isomorphicTools.assets();

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
