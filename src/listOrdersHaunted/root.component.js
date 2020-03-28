import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import './App'
import {OrderProvider} from "../listOrders/OrderContext";
const AnimationExample = () => (
    <Router basename="/OrdersHaunted">
        <Route
            render={({ location }) => (
                <OrderProvider>
                    <my-app />
                </OrderProvider>
            )}
        />
    </Router>
);
export default AnimationExample;