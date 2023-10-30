import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import TimeAgo from 'javascript-time-ago'
import store  from './app/store';
// import Login from "./components/auth/Login";
// import SignUp from "./components/auth/SignUp";
import en from 'javascript-time-ago/locale/en.json'
// import ru from 'javascript-time-ago/locale/ru.json'
// import { Link, Route, Routes, BrowserRouter as Router, BrowserRouter } from 'react-router-dom'
TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(ru)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <Provider store={store}>
        <App />
    </Provider>

    </>
 
);