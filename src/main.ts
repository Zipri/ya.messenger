import App from './app';
import Handlebars from 'handlebars';

Handlebars.registerHelper('eq', (a: any, b: any) => {
  return a === b;
});

const app = new App();
app.render();
