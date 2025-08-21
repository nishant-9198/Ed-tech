import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import AppDemo from './AppDemo';
import App from './App'
import {Provider} from "react-redux"
// import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css"
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
//centeral store is created in which we pass a combined reducer
const store = configureStore({
    reducer:rootReducer, 
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </Provider>

);

// we add browse router to use route

