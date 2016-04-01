import * as React from 'react';
import { Kernel } from 'inversify';

import { IRetaxProps, IRetaxChildContext, IRetaxContextTypes } from './interfaces';

export default class Retax extends React.Component<IRetaxProps, void> {
  public static childContextTypes: IRetaxContextTypes = {
    kernel: React.PropTypes.instanceOf(Kernel),
  };

  public getChildContext(): IRetaxChildContext {
    return {
      kernel: this.props.kernel,
    };
  }

  public render(): any {
    return React.Children.only(this.props.children);
  }
}
