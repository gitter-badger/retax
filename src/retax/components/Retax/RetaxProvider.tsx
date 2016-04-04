import * as React from 'react';
import { Kernel } from 'inversify';

import { IRetaxProps, IRetaxChildContext } from './interfaces';

export default class RetaxProvider extends React.Component<IRetaxProps, void> {
  public static propTypes: React.ValidationMap<any> = {
    kernel: React.PropTypes.instanceOf(Kernel).isRequired,
  };

  public static childContextTypes: React.ValidationMap<any> = {
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
