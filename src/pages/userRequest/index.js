import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Table } from "react-bootstrap";

import "../../styles/usersRequest.scss";

import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';

const UserRequest = (props) => {
  const history = useHistory();

  const { nif } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  useEffect(() => {
    axios
        .get(`http://localhost:3002/pedido/nif/${nif}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
      })
      .then((result) => {
        console.log(result);
        if (result.data.length > 0) {
          result.data.map((data) => {
            if (data.avaliacao_pedido === "Ainda não avaliado.") {
              data.avaliacao_pedido =
                "Ainda Não avaliado! | Criado em:" + data.criado;
              data.avaliado = false;
            } else {
              data.avaliacao_pedido += " | Atualizado em:" + data.atualizado;
              data.avaliado = true;
            }
            return null;
          });
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

  return (
    <>
      <Menu />
      <Header />
      <SideBar image={props.image} name={props.name} admin={true}/>
      
      <div className="container-management">
        <div className="management">
          <h1 className="userRequest">Solicitação de usuário</h1>
        </div>
      </div>

      <div className="container-management">
        <>
          <div className="request">
            {pedidos.status ? (
              <>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Centro de custos</th>
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
                            <Card.Text>{data.centro_custos}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.avaliacao_pedido}</Card.Text>
                          </td>
                          <td>
                            <Button
                              className="detailsForm"
                              variant="secondary"
                              onClick={() => {
                                history.push("/detPedido/" + data.id_pedido);
                              }}
                            >
                              detalhes
                            </Button>
                            {data.avaliado ? (
                              <></>
                            ) : (
                              <Button
                                className="detailsForm"
                                variant="secondary"
                                onClick={() => {
                                  history.push("/review/" + data.id_pedido);
                                }}
                              >
                                Avaliar
                              </Button>
                            )}
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
            <Button
              className="GoBack"
              onClick={() => {
                history.push("/userInfo");
              }}
            >
              {" "}
              Voltar{" "}
            </Button>
          </div>
        </>
      </div>
    </>
  );
};

export default UserRequest;