import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import managerData from './managerData';
import userData from './userData'
import { IconContext } from 'react-icons';
import axios from 'axios'
import './styles.scss';

function Menu(props) {
  const [sidebar, setSidebar] = useState(false);
  const [admin, setAdmin] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [nif, setNif] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/myUser/" + nif, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true
      }).then((result) => {
        setNif(result.data.nif)
      })
  }, [])

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push('/')
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/myUser/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.roles && result.data.roles[0].descricao === "admin") {
          setAdmin(true)
        }
        else {
          setAdmin(false)
        }
        if (props.admin) {
          setAdmin(props.admin)
        }

      })
  }, [props.admin])


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbarH">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <img className="logo" src="assets/img/logo.jpg" alt="logo" />
            <div className="user-access"><FaIcons.FaUserAlt onClick={() => history.push(`/user/${nif}`)}/><span>Informações do usuário</span></div>
            <div className="form-access"><FaIcons.FaTelegram onClick={() => history.push(`/requestForm`)}/><span>Solicitação de impressão</span></div>
            <div className="management-access"><FaIcons.FaWrench onClick={() => history.push(`/management`)}/><span>Gerência de usuário</span></div>
            <div className="services-access"><FaIcons.FaUserCog onClick={() => history.push(`/services`)}/><span>Serviços</span></div>
            <div className="statistics-access"><FaIcons.FaChartLine onClick={() => history.push(`/statistics`)}/><span>Estatísticas</span></div>
            <div className="statistics-access"><FaIcons.FaPaste onClick={() => history.push(`/myRequests`)}/><span>Meus pedidos</span></div>
            <div className="logout-access"><FaIcons.FaSignOutAlt onClick={logout} /><span>Sair</span></div>
            {/* {admin ?
              <> {managerData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              </>
              :
              <> {userData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}</>} */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
export default Menu;