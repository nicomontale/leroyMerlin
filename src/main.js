import React, { Component } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import StoreLocations from './StoreLocations';

import App from './App';
class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={StoreLocations} />
                    <Route exact path="/app" component={App} />

                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;