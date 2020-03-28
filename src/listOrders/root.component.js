import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import App from './App'
import {OrderProvider} from "./OrderContext";
const AnimationExample = () => (
    <Router basename="/listContact">
        <Route
            render={({ location }) => (
                <OrderProvider>
                    <App/>
                </OrderProvider>
            )}
        />
    </Router>
);
export default AnimationExample;