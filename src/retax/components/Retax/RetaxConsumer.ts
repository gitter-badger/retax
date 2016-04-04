import * as React from 'react';
import { Kernel } from 'inversify';

import { IRetaxChildContext } from './interfaces';

export default class RetaxConsumer<P, S> extends React.Component<P, S> {
  public static contextTypes: React.ValidationMap<any> = {
    kernel: React.PropTypes.instanceOf(Kernel),
  };

  public context: IRetaxChildContext;
}
