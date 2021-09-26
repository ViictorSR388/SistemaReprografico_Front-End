import React from 'react';
import './styles.scss';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <img className="logo" src="assets/img/logo.jpg" />
      <div className="icons">
        <FaHome className="icon" />
        <FaUserAlt className="icon" />
        <FaSignOutAlt className="icon" />
      </div>
    </header>
  );
};

export default Header;
