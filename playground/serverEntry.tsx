import express from 'express';
import morgan from 'morgan';

import retax from '../src/server';

const app = express();

app.use(morgan('dev'));
app.use(retax({
  serverRendering: true,
  retaxOptions: {}
}));

console.log('Starting server');

app.listen(3000, (error: Error) => {
  if (error) {
    console.error(error);
  }
  console.log('It Runs');
});

