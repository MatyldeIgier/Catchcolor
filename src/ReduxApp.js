import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './App';

const store = createStore(reducers)

const ReduxApp = () => {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

export default ReduxApp;

