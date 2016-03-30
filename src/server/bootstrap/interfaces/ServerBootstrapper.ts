import { IBootstrapper } from '../../../utils';
import { IServerConfig } from '../../config';
import { IRetaxMiddleware } from '../../middlewares';

export interface IServerBoostrapper extends IBootstrapper<
  IServerConfig,
  void,
  IRetaxMiddleware
> {}
