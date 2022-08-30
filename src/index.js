// import React from 'react';
// import {createRoot} from 'react-dom/client';
// import App from './App'
// import "./index.css";
// import notesReducer from "./reducers/notesReducer";
// import {createStore} from "redux";
// import {Provider} from "react-redux";
//
// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
//
// let noteStore = createStore(notesReducer);
//
// // renderApp will be called anytime an action is dispatched
// const renderApp = () => {
//     root.render(
//         // The <Provider> component makes the Redux store available to any
//         // nested components that need to access the Redux store.
//         <Provider noteStore={noteStore}>
//             <App/>
//         </Provider>
//         // <App noteStore={noteStore}/>
//     );
// }
// // Actions change state -> state change will lead to re-render
// noteStore.subscribe(renderApp);
//
// renderApp();


import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";


import App from './App'
import {Provider} from 'react-redux'
import notesReducer from './reducers/notesReducer'
import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";

// Instead of Redux's createStore function, let's create the store using Redux Toolkit's configureStore function
//This is how you can work with multiple reducers.
const store = configureStore({
    reducer: {
        notes: notesReducer,
        filter: filterReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    // The <Provider> component makes the Redux store available to any
    // nested components that need to access the Redux store.
    <Provider store={store}>
        <App />
    </Provider>
)