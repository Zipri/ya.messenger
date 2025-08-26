import './login.scss';
import { compile } from 'handlebars';
import loginTemplate from './login.hbs?raw';

export class LoginPage {
    render() {
        return compile(loginTemplate)({});
    }
}
