import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import Hello from "./HelloWorld";

const AnimationExample = () => {
    return (
        <Router basename="/home">
            <Route
                render={({location}) => (
                   <Hello/>
                )}
            />
        </Router>
    );
};
export default AnimationExample;
