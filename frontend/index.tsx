import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    HashRouter
} from "react-router-dom";
import App from './src/App';
import store from './src/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </StrictMode>);