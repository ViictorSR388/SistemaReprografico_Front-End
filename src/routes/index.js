import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from "../pages/login";
import notAuthorized from "../NotAuthorized";
import NewUser from "../pages/newUser";
import newPassword from "../pages/newPassword";
import forgotPassword from "../pages/forgotPassword";
import UserInfo from "../pages/userInfo";
import RequestForm from "../pages/requestForm";
import Management from "../pages/management";
import Review from "../pages/review";
import Statistics from "../pages/statistics";
import MyRequests from "../pages/myRequests";
import DetPedido from "../pages/detPedido";
import EditUser from "../pages/EditUser";
import Request from "../pages/userRequest";
import AddService from "../pages/add-services";
import RequestList from "../pages/requestList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FirstAccess from "../pages/firstAccess";
import { AuthContext } from "../helpers/AuthContext";
import Services from "../pages/services";

function Rotas() {
  const [authState, setAuthState] = useState({
    nif: 0,
    email: "",
    nome: "",
    imagem: "",
    admin: false,
    redirect: false,
    firstAccess: false
  });

  const [administrator, setAdministrator] = useState();
  const [firstAccess, setFirstAccess] = useState();

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3002/myUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true,
      })
      .then((response) => {
        if (
          response.status === 500 ||
          response.status === 403 ||
          response.data.error
        ) {
          setAuthState({ redirect: true });
        } else if(response.data.primeiro_acesso === 1) {
          setAuthState({ firstAccess: true, nif: response.data.nif })
          setFirstAccess(1);
        }
        else {
          setAuthState({
            redirect: false,
            status: true,
            nif: response.data.nif,
            email: response.data.email,
            nome: response.data.nome,
            imagem: "http://localhost:3002/" + response.data.imagem,
            firstAccess: false
          });
          setFirstAccess(0);
          if (response.data.roles && response.data.roles[0].descricao === "admin") {
            setAuthState({
              admin: true,
            });
            setAdministrator(1);
          } else {
            setAuthState({
              admin: false,
            });
            setAdministrator(0);
          }
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <>
        {/* {loading ? <>Loading...</> : <> */}
        <Router>
          <Switch>
            <Route path="/" exact component={login} />
            <Route path="/forgotPassword" exact component={forgotPassword} />
            <Route path="/newPassword" exact component={newPassword} />
            {authState.redirect ? (
              <>
                <Route path="*" exact component={notAuthorized} />
              </>
            ) : (
              <>
                <Route
                  path="/firstAccess"
                  exact
                  component={() => (
                    <FirstAccess
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                /> 
              {authState.firstAccess || firstAccess === 1 ? <><Route path="*" exact component={notAuthorized} /></> : <> 
                <Route
                  path="/user/:id"
                  exact
                  component={() => (
                    <UserInfo
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                />
                <Route
                  path="/requestForm"
                  exact
                  component={() => (
                    <RequestForm
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                />
                <Route
                  path="/review/:id"
                  component={() => (
                    <Review
                      image={authState.imagem}
                      admin={authState.admin}
                      nif={authState.nif}
                    />
                  )}
                />
                {/* <Route path="/notAuthorized" exact component={notAuthorized} /> */}
                <Route
                  path="/myRequests"
                  exact
                  component={() => (
                    <MyRequests
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                />
                <Route
                  path="/detPedido/:id"
                  exact
                  component={() => (
                    <DetPedido
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                />
                <Route
                  path="/requestList/:id"
                  exact
                  component={() => (
                    <RequestList
                      image={authState.imagem}
                      name={authState.nome}
                      nif={authState.nif}
                      admin={authState.admin}
                    />
                  )}
                />
                {administrator === 1 || authState.admin === true ? (
                  <>
                    <Route
                      path="/newUser"
                      exact
                      component={() => (
                        <NewUser
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/management"
                      exact
                      component={() => (
                        <Management
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/edit-user/:id"
                      exact
                      component={() => (
                        <EditUser
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/users-requests/:nif"
                      exact
                      component={() => (
                        <Request
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/services"
                      exact
                      component={() => (
                        <Services
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/addService/:type"
                      exact
                      component={() => (
                        <AddService
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                    <Route
                      path="/statistics"
                      exact
                      component={() => (
                        <Statistics
                          image={authState.imagem}
                          name={authState.nome}
                          nif={authState.nif}
                          admin={authState.admin}
                        />
                      )}
                    />
                  </>
                ) : (
                  <></>
                )}                
                </>}
              </>
            )}
          </Switch>
        </Router>
        {/* </>} */}
      </>
    </AuthContext.Provider>
  );
}

export default Rotas;
