import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Table } from "react-bootstrap";

import "../../styles/usersRequest.scss";

import Header from "../../../src/components/header";
import Menu from "../../../src/components/hamburgerButton";
import SideBar from "../../../src/components/formSideBar";

const UserRequest = (props) => {
  const history = useHistory();
  const { nif } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  var [avaliados, setAvaliados] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/request/nif/${nif}/rated=0`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          setPedidos({
            list: result.data,
            status: true,
          });
        } else {
          setPedidos({
            message: result.data.message,
          });
        }
      });
  }, []);

  const getAvaliados = (id) => {
    axios
      .get(`http://localhost:3002/request/nif/${nif}/rated=${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          setPedidos({
            list: result.data,
            status: true,
          });
          console.log(result.data);
          if (id === 1) {
            setAvaliados(true);
          } else {
            setAvaliados(false);
          }
        } else {
          setPedidos({
            message: "Sem registros...",
            ativos: true,
          });
        }
      });
  };

  return (
    <>
      <Menu />
      <Header nif={props.nif} />
      <SideBar image={props.image} name={props.name} admin={true} />

      <div className="container-management">
        <h1 className="title-usersR">Solicitações do usuário</h1>
        <>
          <div className="avaliacao-usersR">
            {avaliados ? <>Já avaliados</> : <>Ainda não avaliados</>}
          </div>
          <div className="request">
            <div className="btns-usersR">
              <button className="btn-usersR" onClick={() => getAvaliados(0)}>
                Não avaliados
              </button>
              <button className="btn-usersR" onClick={() => getAvaliados(1)}>
                Avaliados
              </button>
            </div>
            {pedidos.status ? (
              <>
                <Table
                  className="table-usersR"
                  striped
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      {avaliados ? <th>Atualizado</th> : <th>Realizado</th>}
                      <th>Status</th>
                    </tr>
                  </thead>
                  {pedidos.list.map((data) => (
                    <React.Fragment key={data.id_pedido}>
                      <tbody>
                        <tr>
                          <td>
                            <Card.Text>{data.titulo_pedido}</Card.Text>
                          </td>
                          <td>
                            {avaliados ? (
                              <Card.Text>{data.updatedAt}</Card.Text>
                            ) : (
                              <Card.Text>{data.createdAt}</Card.Text>
                            )}
                          </td>
                          <td>
                            <Card.Text>{data.id_avaliacao_pedido}</Card.Text>
                          </td>
                          <td>
                            <div className="avaliations">
                              <Button
                                className="usersR-avaliation"
                                variant="secondary"
                                onClick={() => {
                                  history.push(
                                    "/requestList/" + data.id_pedido
                                  );
                                }}
                              >
                                detalhes
                              </Button>
                              {avaliados ? (
                                <></>
                              ) : (
                                <Button
                                  className="usersR-avaliation"
                                  variant="secondary"
                                  onClick={() => {
                                    history.push("/review/" + data.id_pedido);
                                  }}
                                >
                                  Avaliar
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </React.Fragment>
                  ))}
                </Table>
              </>
            ) : (
              <>
                <h1>{pedidos.message}</h1>
              </>
            )}
            <div className="backUsersR">
              <Button
                className="back-usersR"
                onClick={() => {
                  history.push(`/management`);
                }}
              >
                {" "}
                Voltar{" "}
              </Button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default UserRequest;
