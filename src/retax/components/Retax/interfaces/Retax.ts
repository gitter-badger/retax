import * as React from 'react';
import { IKernel } from 'inversify';

export interface IRetaxChildContext {
  kernel: IKernel;
}

export interface IRetaxProps extends IRetaxChildContext {}
export interface IRetaxContextTypes extends React.ValidationMap<any> {}
