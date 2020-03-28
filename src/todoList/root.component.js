import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import App from "./App";
const AnimationExample = () => {
    return (
        <Router basename="/todoList">
            <Route
                render={({location}) => (
                    <App/>
                )}
            />
        </Router>
    );
};
export default AnimationExample;