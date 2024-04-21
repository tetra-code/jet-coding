import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './pages/Home'
import { AppProvider } from './utils/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </AppProvider>
);
