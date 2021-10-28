import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import login from './pages/login';
import notAuthorized from "./NotAuthorized";
import newUser from './pages/newUser';
import newPassword from './pages/newPassword';
import forgotPassword from './pages/forgotPassword';
import userInfo from './pages/userInfo';
import requestForm from './pages/requestForm';
import management from './pages/management';
import requestManager from './pages/requestManager';
import review from './pages/review';
import historyDefault from './pages/historyDefault';
import historyAdmin from './pages/historyAdmin';
import statistics from './pages/statistics';
import myRequests from './pages/myRequests';
import detPedido from './pages/detPedido';
import EditUser from './pages/EditUser';
import { isAuthenticated } from './auth';
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


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
        if (response.status === 500 || response.data.error) {
          setAuthState({ status: false });
          setRedirect(true)
        }
        else {
          setAuthState({
            status: true,
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
          });
        setRedirect(false)
        }
      })
  }, []);

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={props =>
  //       isAuthenticated() ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: "/NotFound", state: { from: props.location } }} />
  //       )
  //     }
  //   />
  // );


  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>

          <Switch>
            <Route path='/' exact component={login} />
            <Route path='/forgotPassword' exact component={forgotPassword} />
            <Route path='/newPassword' exact component={newPassword} />
            {redirect ? (
              <>
                  <Route path='*' exact component={notAuthorized} />
              </>
            ) :
              <>
                <Route path='/newUser' exact component={newUser} />
                <Route path='/userInfo' exact component={userInfo} />
                <Route path='/requestForm' exact component={requestForm} />
                <Route path='/management' exact component={management} />
                <Route path='/requestManager' exact component={requestManager} />
                <Route path='/review/:id' exact component={review} />
                <Route path='/historyDefault' exact component={historyDefault} />
                <Route path='/historyAdmin' exact component={historyAdmin} />
                <Route path='/statistics' exact component={statistics} />
                <Route path='/notAuthorized' exact component={notAuthorized} />
                <Route path='/myRequests' exact component={myRequests} />
                <Route path='/detPedido/:id' exact component={detPedido} />
                <Route path="/edit/:nif" component={EditUser} />
              </>
            }
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;