import App from './app';
import './index.css';

const app = new App();
app.init();

function raf(timestamp) {
    app.update(timestamp);
    app.render(timestamp);
    window.requestAnimationFrame(raf);
}

raf();
