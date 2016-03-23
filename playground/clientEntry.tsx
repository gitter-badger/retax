import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Playground from 'component-playground';
import Retax from '../src';

const RetaxExample: string = require('raw!../src/Retax.example');

const Index = () => (
  <div className="component-documentation">
    <Playground codeText={RetaxExample} scope={{ React, Retax }} />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('root'));
