import { inject } from 'inversify';

import { IMiddlewareConfig } from '../config';

import { IMiddlewareConfigProxy } from './interfaces';
import ConfigProxy from './ConfigProxy';

@inject('MiddlewareConfigStore')
export default class MiddlewareConfigProxy extends ConfigProxy<IMiddlewareConfig> implements IMiddlewareConfigProxy {}
