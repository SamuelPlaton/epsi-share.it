import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Login, Register, CGU} from '../pages'

export default function App() {
    return (

        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route exact path="/cgu">
                    <CGU/>
                </Route>
            </Switch>
        </Router>
    )
}
