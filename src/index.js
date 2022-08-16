import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App'
import "./index.css";
import notesReducer from "./reducers/notesReducer";
import {createStore} from "redux";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

let noteStore = createStore(notesReducer);

const renderApp = () => {
    root.render(<App noteStore={noteStore} tab="home" />);
}

noteStore.subscribe(renderApp);

renderApp();