import React, {useState} from "react";
import {
    html,
} from "haunted";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./Contacts.js"

const AnimationExample = () => {
  return (
      <Router basename="/haunted">
        <link rel="stylesheet" href="./style.css"/>
        <Route
            render={({location}) => (
                <div className='hauntedBody'>
                    <h1 style={{backgroundColor : 'black'}}>🧛🏻️ Haunted 🎃</h1>
                    <div className='hauntedProject'>
                      <list-monster className='monsters'></list-monster>
                    </div>
                </div>
            )}
        />
      </Router>
  );
};
export default AnimationExample;
