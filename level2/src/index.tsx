import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
