import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import StoreLocations from './StoreLocations';

import App from './App';
import LandingPage from './landingpage';
class Main extends Component {
    render() {
        return (

            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/StoreLocations" component={StoreLocations} />
                <Route exact path="/app" component={App} />

            </Switch>

        )
    }
}

export default Main;