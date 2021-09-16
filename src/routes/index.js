import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import forgotPassword from '../pages/forgotPassword';
import form from '../pages/form';
import formDetails from '../pages/formDetails';
import historyAdmin from '../pages/historyAdmin';
import historyDefault from '../pages/historyDefault';
import login from '../pages/login';
import newPassword from '../pages/newPassword';
import newUser from '../pages/newUser';
import review from '../pages/review';
import statistics from '../pages/statistics';
import userInfo from '../pages/userInfo';
import userManagement from '../pages/userManagement';


const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={ login } />
            <Route exact path='/forgotPassword' component={ forgotPassword } />
            <Route exact path='/form' component={ form } />
            <Route exact path='/formDetails' component={ formDetails } />
            <Route exact path='/historyAdmin' component={ historyAdmin } />
            <Route exact path='/historyDefault' component={ historyDefault } />
            <Route exact path='/newPassword' component={ newPassword } />
            <Route exact path='/newUser' component={ newUser } />
            <Route exact path='/review' component={ review } />
            <Route exact path='/statistics' component={ statistics } />
            <Route exact path='/userInfo' component={ userInfo } />
            <Route exact path='/userManagement' component={ userManagement } />
        </Switch>
    </BrowserRouter>
);

export default routes;