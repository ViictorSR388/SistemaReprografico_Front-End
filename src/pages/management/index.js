import React, { useState, useEffect } from 'react';
import '../../styles/management.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

import Menu from '../../../src/components/hamburgerButton';
import Header from '../../../src/components/header';
import SideBar from '../../../src/components/formSideBar';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function Management(props) {
  var history = useHistory();

  //lista
  var [users, setUsers] = useState({
    status: false,
    list: [],
    message: "",
  });

  var [ativos, setAtivos] = useState();
  var [loading, setLoading] = useState();


  const usuariosAtivos = (id) => {
    axios
      .get("http://localhost:3002/users/enabled=" + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        if (result.data.length > 0) {
          setUsers({
            list: result.data,
            status: true
          })
          console.log(result.data)
        }
        else {
          setUsers({
            message: "Sem registros...",
            ativos: true
          })
        }
        if (id === 1) {
          setAtivos(true);
        }
        else {
          setAtivos(false);
        }
      });
  }

  const enableUser = ({ nif, enable }) => {

    if (enable === 1) {
      var id = 0
    }
    else {
      id = 1
    }

    var config = {
      method: 'put',
      url: `http://localhost:3002/user/${nif}/enable=${id}`,
      headers: {
        'accessToken': localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (id === 1) { usuariosAtivos(0); }
        else if (id === 0) { usuariosAtivos(1); }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //map
  useEffect(() => {
    axios
      .get("http://localhost:3002/users/enabled=1", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result)
        if (result.data.length > 0) {
          setUsers({
            list: result.data,
            ativos: true,
            status: true
          })
        }
        else {
          setUsers({
            message: "Sem registros...",
            ativos: true
          })
        }
      });
  }, []);

  const Users = (user) => {
    axios
    .get("http://localhost:3002/user/name/" + user, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      setName(result.data.name);
      setName(result.data.nif);
      console.log(result);
    })
  }

  const [name, setName] = useState('');

  const filter = (e) => {
    const nif = e.target.value;

    if (nif !== '') {
      const results = Users.filter((user) => {
        return user.name.toLowerCase().startsWith(nif.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setUsers(results);
    } else {
      setUsers(Users);
      // If the text field is empty, show all users
    }
    setName(nif);
  };

    return (
      <>
        {/* {loading ? <> Loading... </> : */}
          <>
            <Menu admin={props.admin}/>
            <Header nif={props.nif} />
            <SideBar image={props.image} name={props.name} admin={props.admin} management={true} nif={props.nif} />

            <div className="container-management">
              <div className="management">
                <h1 className="management-title">Gerência de Usuários</h1>
                <div className="div-search">
                  <label htmlFor="search">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      value={name}
                      placeholder="Filtro"
                      onChange={filter}
                    />
                  </label>
                  <FaSearch className="icon-management" />
                </div>
              </div>

              <div className="btns-boot">
                <Button className="btn-boot" onClick={() => usuariosAtivos(1)}>Usuários ativos</Button>
                <Button className="btn-boot" onClick={() => usuariosAtivos(0)}>Usuários inativos</Button>
              </div>

              {ativos ? <h1 className="title-enable-disable">Usuários Ativos:</h1> : <h1 className="title-enable-disable">Usuários Inativos:</h1>}
              {users.status ?
                <>
                  <div className="section">
                    <Table className="tableBootstrap" striped bordered hover responsive size="sm" >
                      <thead>
                        <tr>
                          <th>Imagem</th>
                          <th>Nome</th>
                          <th>Email</th>
                          <th>CPF</th>
                          <th>Telefone</th>
                          <th>Departamento</th>
                          <th>Cargo</th>
                          <th> </th>
                        </tr>
                      </thead>
                      {users.list.map((data) => (
                        <React.Fragment key={data.nif}>
                          <tbody>
                            <tr>
                              <td onClick={() => { history.push(`/user/${data.nif}`) }}><img className="img-user-upload" src={`http://localhost:3002/${data.imagem}`} alt="imagem do usuário" /></td>
                              <td>{data.nome}</td>
                              <td>{data.email}</td>
                              <td>{data.cfp}</td>
                              <td>{data.telefone}</td>
                              <td>{data.depto}</td>
                              <td>{data.roles[0].descricao}</td>
                              <td className="btns-bootM">
                                <Button className="btn-bootM" color="primary" size="lg" onClick={() => { history.push(`/users-requests/${data.nif}`) }}>
                                  Solicitações
                                </Button>{' '}
                                <Button className="btn-bootM" color="primary" size="lg" onClick={() => { history.push(`/edit-user/${data.nif}`) }}>
                                  Editar
                                </Button>{' '}
                                {data.ativado ? <>
                                  <Button className="btn-disable" variant="primary" size="lg" onClick={() => enableUser({ nif: data.nif, enable: data.ativado })}>
                                    Desabilitar
                                  </Button>{' '}</> : <>
                                  <Button className="btn-enable" variant="primary" size="lg" onClick={() => enableUser({ nif: data.nif, enable: data.ativado })}>
                                    Habilitar
                                  </Button>{' '}
                                </>}
                              </td>
                            </tr>
                          </tbody>
                        </React.Fragment>
                      ))}
                    </Table>
                  </div>
                </> :
                <>
                  <h3>{users.message}</h3>
                </>
              }
              <div className="btn-newUser">
                <Button variant="primary" size="lg" onClick={() => { history.push("/newUser/") }}>
                  Cadastrar Usuário
                </Button>{' '}
              </div>
            </div>
          </>
          {/* } */}
      </>
    );
  }

  export default Management;