import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';
import { FaBookReader } from 'react-icons/fa';
import { FaWrench } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/management',
    icon: <FaHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Usuário',
    path: '/userInfo',
    icon: <FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Solicitar impressão',
    path: '/requestFormG',
    icon: <FaTelegram />,
    cName: 'nav-text'
  },
  {
    title: 'Gerência de usuários',
    path: '/management',
    icon: <FaWrench />,
    cName: 'nav-text'
  },
  {
    title: 'Histórico',
    path: '/historyAdmin',
    icon: <FaBookReader />,
    cName: 'nav-text'
  },
  {
    title: 'Estatística',
    path: '/statistics',
    icon: <FaChartLine />,
    cName: 'nav-text'
  },
  {
    title: 'Sair',
    path: '/',
    icon: <FaSignOutAlt />,
    cName: 'nav-text'
  }
];