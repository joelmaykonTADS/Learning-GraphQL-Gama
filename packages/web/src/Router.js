import React from 'react';
import { Switch, Router } from 'react-router-dom';

export default function Router() {
    return (
        <Switch>
            <Router exact path={["","/"]}component={} />
            <Router exact path="/sign-in" component={}/>
        </Switch>
    )
}