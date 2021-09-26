import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from "./routes/index.js";

function App(){
  return(
      <div className="App">
          <Routes />
      </div>
  );
}

export default App;
