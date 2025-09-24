import App from './app';
import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', (a: any, b: any) => {
  return a === b;
});

const runApp = async () => {
  const app = new App();
  await app.start();
};

runApp();
