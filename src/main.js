import React, { Component } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import StoreLocations from './StoreLocations';
import Login from './Login';
import App from './App';
import LandingPage from './landingpage';
class Main extends Component {
    render() {
        return (

            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/StoreLocations" component={StoreLocations} />
                <Route exact path="/app" component={App} />

            </Switch>

        )
    }
}

export default Main;