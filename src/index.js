import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App'
import "./index.css";
import notesReducer from "./reducers/notesReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

let noteStore = createStore(notesReducer);

const renderApp = () => {
    root.render(
        // The <Provider> component makes the Redux store available to any
        // nested components that need to access the Redux store.
        // <Provider noteStore={noteStore}>
        //     <App/>
        // </Provider>
        <App noteStore={noteStore}/>
    );
}

noteStore.subscribe(renderApp);

renderApp();