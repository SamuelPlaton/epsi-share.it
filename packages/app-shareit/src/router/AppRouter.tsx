import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Home, Login, Register, CGU } from '../pages'

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
            </Switch>
        </Router>
    )
}
