import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import requestFormC from './pages/requestFormC';
import requestFormG from './pages/requestFormG';
import management from './pages/management';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={requestFormC} />
          <Route path='/requestFormG' component={requestFormG} />
          <Route path='/products' component={management} />
        </Switch>
      </Router>
    </>
  );
}

export default App;