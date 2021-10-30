import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/requestList.scss";
import axios from "axios";
import { Table, Card } from "react-bootstrap";

import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';

function RequestList(props) {

  const { nif } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/detPedido/${nif}`, {
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

  return (
    <>
      <Menu />
      <Header />
      <SideBar image={props.image} name={props.name} admin={true} />

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
                      <th>Curso</th>
                      <th>Centro de custos</th>
                      <th>Titulo</th>
                      <th>Página</th>
                      <th>Cópias</th>
                      <th>Total</th>
                      <th>Encadernação</th>
                      <th>Formato e Cor</th>
                      <th>Modo de Envio</th>
                    </tr>
                  </thead>
                  {pedidos.list.map((data) => (
                    <React.Fragment key={data.id_pedido}>
                      <tbody>
                        <tr>
                          <td>
                            <Card.Text>{data.curso}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.centro_custos}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.titulo_pedido}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.num_paginas}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.num_copias}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.custo_total}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.acabamento}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.tamanho}</Card.Text>
                          </td>
                          <td>
                            <Card.Text>{data.modo_envio}</Card.Text>
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
          </div>
        </>
      </div>
    </>
  );
};

export default RequestList;