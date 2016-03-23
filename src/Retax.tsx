import * as React from 'react';

import styles from './styles';

export interface RetaxProps {
  text?: string;
}

export default class Retax extends React.Component<RetaxProps, void> {
  render() {
    const { text } = this.props;

    return (
      <div style={styles.div}>
        Prejkwehfkjhfix
        { text || 'Hay.'}
      </div>
    );
  }
}
