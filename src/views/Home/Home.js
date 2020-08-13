import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect  } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Login from "views/Login/Login.js";
import Register from "views/Register/Register.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import TimeKeeper from "views/CurrentSession/TimeKeeper.js";

export default function Home(props) {
    const hist = createBrowserHistory();

    return (
        <Router history={hist}>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
        );
}
