import React from 'react';
import './styles.scss';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router';


import Logo from '../img/logo';

function Header (props) {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push('/')
  }; 
  
  return (
    <header>
      <Logo />
      <div className="icons">
        <FaHome className="icon" />
        <FaUserAlt className="icon" onClick={() => history.push(`/user/${props.nif}`)} />
        <FaSignOutAlt className="icon" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
