import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../../styles/services.scss";
import Header from "../../../src/components/header";
import Menu from "../../../src/components/hamburgerButton";
import SideBar from "../../../src/components/formSideBar";
import { Card, Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

export default function Services(props) {
  var history = useHistory();

  const [servicos, setServicos] = useState({
    servicosCA: [],
    servicosCT: [],
    status: false,
  });

  var [servicoCA, setServicoCA] = useState();
  var [servicoCT, setServicoCT] = useState();
  var [loading, setLoading] = useState();

  var [ativos, setAtivos] = useState();

  useEffect(() => {
    setLoading(true);
    onLoad();
    return () => {
      setServicos({});
    };
  }, []);

  const servicosAtivos = (id) => {
    axios
      .get("http://localhost:3002/services/enabled=" + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        if (id === 1) {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
          });
          setAtivos(true);
        } else {
          setServicos({
            servicosCA: response.data[0].servicosCA,
            servicosCT: response.data[0].servicosCT,
          });
          setAtivos(false);
        }
      });
  };

  const onLoad = async () => {
    var config = {
      method: "get",
      url: `http://localhost:3002/services/enabled=1`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios(config);
      if (response) {
        setServicos({
          servicosCA: response.data.servicosCA,
          servicosCT: response.data.servicosCT,
          status: true,
        });
        setAtivos(true);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const enableUser = ({ id, type, enable }) => {

    var atvr = 1;

    if (enable === 1) {
      atvr = 0;
    };

    var config = {
      method: 'put',
      url: `http://localhost:3002/service/${id}/type=${type}/enable=${atvr}`,
      headers: {
        'accessToken': localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (atvr === 1) { servicosAtivos(0); }
        else if (atvr === 0) { servicosAtivos(1); }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {loading ? (
        <> </>
      ) : (
        <>
          {" "}
          <Menu />
          <Header nif={props.nif} />
          <SideBar
            image={props.image}
            name={props.name}
            admin={true}
            management={true}
            nif={props.nif}
          />
          <div className="services-card">
            <Button className="btn-boot" onClick={() => servicosAtivos(1)}>
              Serviços Ativos
            </Button>
            <Button className="btn-boot" onClick={() => servicosAtivos(0)}>
              Serviços Inativos
            </Button>

            {ativos ? (
              <h1 className="title-enable-disable">Serviços Ativos:</h1>
            ) : (
              <h1 className="title-enable-disable">Serviços Inativos:</h1>
            )}

            <div className="ct-table-div">
              <h1 className="title-services">Capa &#38; Acabamento</h1>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>DESCRIÇÃO</th>
                    <th>QUANTIDADE</th>
                    <th>CUSTO</th>
                    <th> </th>
                  </tr>
                </thead>
                {servicos.servicosCA.map((data) => (
                  <React.Fragment key={data.id_servico}>
                    <tr>
                      {/* DESCRIÇÃO */}
                      <td>{data.descricao}</td>
                      {/* QUANTIDADE */}
                      <td>{data.quantidade}</td>
                      {/* CUSTO */}
                      <td>{data.valor_unitario}</td>
                      {data.ativado ? (
                        <td>
                          <button onClick={() => enableUser({ id: data.id_servico, type: "ca", enable: data.ativado })}>Desabilitar</button>
                        </td>
                      ) : (
                        <td>
                          <button onClick={() => enableUser({ id: data.id_servico, type: "ca", enable: data.ativado })}>Habilitar</button>
                        </td>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </Table>
              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ct");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
            {/* ~~~~~~~~~~~~~~ */}
            <div className="ca-table-div">
              <h1 className="title-services">Copia &#38; Tamanho</h1>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>DESCRIÇÃO</th>
                    <th>QUANTIDADE</th>
                    <th>CUSTO</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.servicosCT.map((data) => (
                    <React.Fragment key={data.id_servico}>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>{data.descricao}</td>
                        {/* QUANTIDADE */}
                        <td>{data.quantidade}</td>
                        {/* CUSTO */}
                        <td>{data.valor_unitario}</td>
                        {data.ativado ? (
                          <td>
                            <button onClick={() => enableUser({ id: data.id_servico, type: "ct", enable: data.ativado })}>Desabilitar</button>
                          </td>
                        ) : (
                          <td>
                            <button onClick={() => enableUser({ id: data.id_servico, type: "ct", enable: data.ativado })}>Habilitar</button>
                          </td>
                        )}
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ca");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
