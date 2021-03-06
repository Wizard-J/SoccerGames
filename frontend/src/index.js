import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux/redux";


const store = createStore(
    reducer,
    window.devToolsExtension?window.devToolsExtension():undefined
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root'));