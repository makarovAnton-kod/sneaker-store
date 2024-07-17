import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store/configureStore";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import App from './App';
import theme from "./theme";
import {Router} from "react-router-dom";
import history from "./history";
import './index.css';


const app = (
<Provider store={store}>
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App/>
        </Router>
    </ThemeProvider>
</Provider>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);