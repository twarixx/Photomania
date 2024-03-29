import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import {AuthContextProvider} from "./context/AuthContext";

TimeAgo.addDefaultLocale(en)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    </React.StrictMode>
);