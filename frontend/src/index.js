import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import React from 'react';

import {setupStore} from "./redux";
import {history} from './services'
import App from './App';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);


