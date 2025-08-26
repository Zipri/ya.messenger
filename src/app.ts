class App {
    private rootElement: HTMLElement;

    constructor() {
        this.rootElement = document.querySelector('#app')!;
    }

    render() {
        // Пока просто показываем заглушку
        this.rootElement.innerHTML = `
            <div class="app">
                <h1>Messenger App</h1>
                <p>Приложение мессенджера в разработке...</p>
            </div>
        `;
    }
}

export default App;
