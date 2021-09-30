import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {Home, Login, Register, CGU, Menu, Join} from '../pages'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/cgu">
                    <CGU/>
                </Route>
                <Route exact path="/menu">
                    <Menu/>
                </Route>
                <Route exact path="/join/:id">
                     <Join/>
                </Route>
            </Switch>
        </Router>
    )
}
