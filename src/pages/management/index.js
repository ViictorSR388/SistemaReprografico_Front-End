import React from 'react';
import '../../styles/management.scss';

import { FaSearch } from 'react-icons/fa';

const Management = () => {
  return (
    <>
      <div className="container-management">
        <div className="management">
          <h1 className="management-title">Gerência de Usuários</h1>
          <label htmlFor="search">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Filtro"
            />
          </label>
          <FaSearch className="icon-management" />
        </div>
        <div className="section">
          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />
          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="section">
          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />
          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="section">
          <input className="input-management" type="text" placeholder="Nome" />
          <input
            className="input-management"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-management nif"
            type="number"
            placeholder="NIF"
          />
          <input
            className="input-management dp"
            type="text"
            placeholder="Departamento"
          />
          <input
            className="input-management cfp"
            type="number"
            placeholder="CFP"
          />
          <input
            className="input-management tel"
            type="text"
            placeholder="TEL"
          />
          <div className="btn-management">
            <button className="btn-management-E">Editar</button>
            <button className="btn-management-D">Apagar</button>
          </div>
        </div>
        <div className="btn-newUser">
          <button>Criar novo usuário</button>
        </div>
      </div>
    </>
  );
};

export default Management;
