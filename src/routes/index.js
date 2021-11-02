import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from '../pages/login';
import notAuthorized from "../NotAuthorized";
import NewUser from '../pages/newUser';
import newPassword from '../pages/newPassword';
import forgotPassword from '../pages/forgotPassword';
import UserInfo from '../pages/userInfo';
import RequestForm from '../pages/requestForm';
import Management from '../pages/management';
import RequestManager from '../pages/requestManager';
import Review from '../pages/review';
import historyDefault from '../pages/historyDefault';
import historyAdmin from '../pages/historyAdmin';
import Statistics from '../pages/statistics';
import MyRequests from '../pages/myRequests';
import DetPedido from '../pages/detPedido';
import EditUser from '../pages/EditUser';
import Request from '../pages/userRequest';
import RequestList from "../pages/requestList";
import { isAuthenticated } from '../auth';
import { RemountingRoute } from './RemountingRoute';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import HistoryAdmin from '../pages/historyAdmin';
import FirstAccess from '../pages/firstAccess';
import { AuthContext } from "../helpers/AuthContext";
// import { InfoContext } from '../helpers/InfosContext';


function Rotas() {
  const [authState, setAuthState] = useState({
    nif: 0,
    email: "",
    nome: "",
    imagem: "",
    Roles: [],
    redirect: false
  });
  
  // const { setInfoState } = useContext(InfoContext)

  const [loading, setLoading] = useState(false);

  const [administrator, setAdministrator] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      })
      .then((response) => {
        setLoading(false)
        if (response.status === 500 || response.data.error) {
          setAuthState({ redirect: true });
        }
        else {
          // setInfoState({
          //   nif: 1
          // })
          setAuthState({
            status: true,
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            roles: response.data.roles,
          });
          if (response.data.roles[0] === "2_ROLE_ADMIN") {
            setAdministrator(true)
          }
          setAuthState({ redirect: false })
        }
      })
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <>{loading ? <>Loading...</> : <>
        <Router>

          <Switch>
            <Route path='/' exact component={login} />
            <Route path='/forgotPassword' exact component={forgotPassword} />
            <Route path='/newPassword' exact component={newPassword} />
            {authState.redirect ? (
              <>
                <Route path='*' exact component={notAuthorized} />
              </>
            ) :
              <>
                <Route path='/newUser' exact component={() => (<NewUser image={authState.imagem} name={authState.nome} nif={authState.nif} />)} />
                <Route path='/user/:id' exact component={() => (<UserInfo image={authState.imagem} name={authState.nome} nif={authState.nif} admin={administrator} />)} />
                <Route path='/requestForm' exact component={() => (<RequestForm image={authState.imagem} name={authState.nome} nif={authState.nif} />)} />
                <Route path='/management' exact component={() => (<Management image={authState.imagem} name={authState.nome} nif={authState.nif} />)} />
                <Route path='/requestManager' exact component={() => (<RequestManager image={authState.imagem} />)} />

                {/* <Route path='/review/:id' exact component={review} /> */}
                {/* <Route path="/review/:id" render={(props) => (
              <Page key={props.match.params.pageid} {...props} />)
            } /> */}

                <Route path="/review/:id" component={() => (<Review image={authState.imagem} />)} />


                <Route path='/historyDefault' exact component={() => (<MyRequests image={authState.imagem} name={authState.nome} />)} />
                <Route path='/historyAdmin/:nif' exact component={() => (<HistoryAdmin image={authState.imagem} name={authState.nome} />)} />
                <Route path='/statistics' exact component={() => (<Statistics image={authState.imagem} name={authState.nome} />)} />
                <Route path='/notAuthorized' exact component={notAuthorized} />
                <Route path='/myRequests' exact component={() => (<MyRequests image={authState.imagem} name={authState.nome} />)} />
                <Route path='/detPedido/:id' exact component={() => (<DetPedido image={authState.imagem} name={authState.nome} />)} />
                <Route path="/edit-user/:nif" exact component={() => (<EditUser image={authState.imagem} name={authState.nome} />)} />
                <Route path="/users-requests/:nif" exact component={() => (<Request image={authState.imagem} name={authState.nome} />)} />
                <Route path="/requestList/:nif" exact component={() => (<RequestList image={authState.imagem} name={authState.nome} />)} />
                <Route path="/firstAccess" exact component={() => (<FirstAccess image={authState.imagem} name={authState.nome} />)} />
              </>
            }
          </Switch>
        </Router>
      </>}
      </>
    </AuthContext.Provider>
  );
}

export default Rotas;