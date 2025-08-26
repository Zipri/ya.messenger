import { LoginPage } from './pages/login/login';
import './styles/style.scss';

class App {
    private rootElement: HTMLElement;

    constructor() {
        this.rootElement = document.querySelector('#app')!;
    }

    render() {
        const loginPage = new LoginPage();
        this.rootElement.innerHTML = loginPage.render();
    }
}

export default App;
