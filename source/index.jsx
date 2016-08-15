import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import promises from 'es6-promise';

import './styles/general.less';

import { store, history } from './configs';

import { AppView } from './views/AppView';
import { MainView } from './views/MainView';

promises.polyfill();

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={AppView}>
                <IndexRoute component={MainView} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('hostel-app')
);
