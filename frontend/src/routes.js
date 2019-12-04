import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import Spot from './pages/Spot';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/new" component={New}/>
                <Route path="/spot/:spot_id" component={Spot}/>
            </Switch>
        </BrowserRouter>
    );
}