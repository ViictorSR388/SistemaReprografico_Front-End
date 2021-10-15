import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import login from './pages/login';
import NotFound from "../src/NotFound";
import newUser from './pages/newUser';
import newPassword from './pages/newPassword';
import forgotPassword from './pages/forgotPassword';
import userInfo from './pages/userInfo';
import requestFormC from './pages/requestFormC';
import requestFormG from './pages/requestFormG';
import management from './pages/management';
import review from './pages/review';
import historyDefault from './pages/historyDefault';
import historyAdmin from './pages/historyAdmin';
import statistics from './pages/statistics';
import { isAuthenticated } from './auth';
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";


function App() {
  const [authState, setAuthState] = useState({
    nif: 0,
    email: "",
    nome: "",
    imagem: "",
    Roles: [],
    status: false
  });

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      })
      .then((response) => {
        console.log(response)
        if (response.status == 500 || response.data.error) {
          setAuthState({ status: false });
          setRedirect(true)
        }
        else {
          setAuthState({
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
            status: true
          });
        }
      })
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/NotFound", state: { from: props.location } }} />
        )
      }
    />
  );


  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {redirect ? (<Redirect push to="/" />) : null}
          <Switch>
            <Route path='/' exact component={login} />
            <PrivateRoute path='/newUser' exact component={newUser} />
            <PrivateRoute path='/newPassword' exact component={newPassword} />
            <PrivateRoute path='/forgotPassword' exact component={forgotPassword} />
            <PrivateRoute path='/userInfo' exact component={userInfo} />
            <PrivateRoute path='/requestFormC' exact component={requestFormC} />
            <PrivateRoute path='/requestFormG' exact component={requestFormG} />
            <PrivateRoute path='/management' exact component={management} />
            <PrivateRoute path='/review' exact component={review} />
            <PrivateRoute path='/historyDefault' exact component={historyDefault} />
            <PrivateRoute path='/historyAdmin' exact component={historyAdmin} />
            <PrivateRoute path='/statistics' exact component={statistics} />
            <Route path='/NotFound' exact component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;