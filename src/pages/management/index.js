import React, { useState, useEffect, useContext } from 'react';
import '../../styles/management.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from './../../helpers/AuthContext';

import MenuG from './../../components/hamburgerButtonG';
import Header from './../../components/header';
import SideBarGerencia from '../../components/formSideBar';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Management() {
  const { setAuthState } = useContext(AuthContext);
  var history = useHistory();

  // var [nameUser, setNameUser] = useState();
  // var [emailUser, setEmailUser] = useState();
  // var [nifUser, setNifUser] = useState();
  // var [CfpUser, setCfpUser] = useState();
  // var [telefoneUser, setTelefoneUser] = useState();

  //autenticação
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status === 500 || response.data.error) {
          setAuthState({ status: false });
          history.push('./')
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
          var resposta = response.data.roles.includes("3_ROLE_ADMIN");
          if (resposta === false) {
            setAuthState({ status: false });
            history.push('./notAuthorized')
          }
        }
      })
  }, []);

  //lista
  var [users, setUsers] = useState({
    status: false,
    list: [],
    message: ""
  });

  //map
  useEffect(() => {
    axios
      .get("http://localhost:3002/usuarios", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result)
        if (result.data.length > 0) {
          result.data.map((data) => {
            if (data.usuarios === "Sem usuários.") {
              data.usuarios = "Sem usuários cadastrados."
            }
            else {
              data.usuarios += " | Atualizado em:" + data.atualizado
            }
            // console.log(result.data.usuarios);
            return null;
          })
          setUsers({
            nif: result.data.nif,
            email: result.data.email,
            nome: result.data.nome,
            imagem: "http://localhost:3002/" + result.data.imagem,
            cfp: result.data.cfp,
            telefone: result.data.telefone,
            depto: result.data.depto,

            list: result.data,
            status: true
          })
        }
        else {
          setUsers({
            message: result.data.message
          })
        }
      });
  }, []);

  const deleteUser = (nif) => {
    axios.delete(`http://localhost:3002/usuario/${nif}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      console.log(result);
    });
  }

  return (
    <>
      <MenuG />
      <Header />
      <SideBarGerencia />

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

          {users.status ?
            <>
              <Table striped bordered hover size="sm" >
                <thead>
                  <tr>
                    <th></th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Departamento</th>
                  </tr>
                </thead>
                {users.list.map((data) => (
                  <React.Fragment key={data.nif}>
                    <tbody>
                      <tr>
                        <td><img className="img-user-upload" src={`http://localhost:3002/${data.imagem}`} alt="imagem do usuário" /></td>
                        <td>{data.nome}</td>
                        <td>{data.email}</td>
                        <td>{data.cfp}</td>
                        <td>{data.telefone}</td>
                        <td>{data.id_depto}</td>
                        <Button color="primary" size="lg" onClick={() => { history.push(`/edit/${data.nif}`) }}>
                          Editar
                        </Button>{' '}
                        <Button variant="primary" size="lg" onClick={() => deleteUser(data.nif)}>
                          Deletar
                        </Button>{' '}
                      </tr>
                    </tbody>
                  </React.Fragment>
                ))}
              </Table>
            </> :
            <>
              <h1>{users.message}</h1>
            </>
          }
        </div>
        <div className="btn-newUser">
          <Button variant="primary" size="lg" onClick={() => { history.push("/newUser/") }}>
            Cadastrar Usuário
          </Button>{' '}
        </div>
      </div>
    </>
  );
}

export default Management;