import { IBootstrapper } from '../../../utils';
import { IServerConfig } from '../../config';
import { IRetaxMiddleware } from '../../middlewares';

export interface IServerBootstrapper extends IBootstrapper<
  IServerConfig,
  void,
  IRetaxMiddleware
> {}
