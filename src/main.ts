import Handlebars from 'handlebars';

import App from './app';

Handlebars.registerHelper('eq', (a: object, b: object) => {
  return a === b;
});

const runApp = async () => {
  const app = new App();
  await app.start();
};

runApp();
