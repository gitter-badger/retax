import { Request } from 'express';

import { IBootstrapper } from '../../../utils';
import { IRetaxConfig, IIsomorphicTools } from '../../../config';

export interface IServerBootstrapConfig {
  req: Request;
  isomorphicTools: IIsomorphicTools;
}

export interface IServerBootstrapper extends IBootstrapper<
  IRetaxConfig,
  IServerBootstrapConfig,
  Promise<string>
> {}
