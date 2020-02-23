import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

ReactDOM.render(
<Provider store={configureStore()}>
    <HashRouter>
        <Routes/>
    </HashRouter>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
