/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface IAppProps {
  time: number;
}

export default class RootComponent extends React.Component<IAppProps, any> {
  public render(): JSX.Element {
    const { time } = this.props;
    return (
      <div>
        Here is the time {time || +new Date()}
      </div>
    );
  }
}
