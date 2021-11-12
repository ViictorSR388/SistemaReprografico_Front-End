import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import '../../styles/services.scss';
import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';
import { Card, Table } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

export default function Services(props) {
  var history = useHistory();

  var [capaAcabamento, setCapaAcabamento] = useState({
    status: false,
    list: [],
    message: ""
  });

  var [copiaTamanho, setCopiaTamanho] = useState({
    status: false,
    list: [],
    message: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/service/1/type=ca`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data) {
          setCapaAcabamento({
            list: [result.data],
            status: true,
          });
        } else {
          setCapaAcabamento({
            message: ""
          });
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/service/1/type=ct`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data) {
          setCopiaTamanho({
            list: [result.data],
            status: true,
          });
        } else {
          setCopiaTamanho({
            message: ""
          });
        }
      });
  }, []);

  return (
    <>

      <Menu />
      <Header nif={props.nif} />
      <SideBar image={props.image} name={props.name} admin={true} />

      <div className="services-card">

        <div className="ct-table-div">
          <h1 className="title-services">Copia & Tamanho</h1>

          {copiaTamanho.status ? (
            <>
              <Table className="table-services" striped bordered hover size="sm">
                {copiaTamanho.list.map((data) => (
                  <React.Fragment key={data.id_services}>
                    <tbody>
                      <tr>
                        <td className="column-services"><strong>DESCRIÇÃO</strong></td>
                        <td className="column-quant"><strong>QUANTIDADE</strong></td>
                        <td className="column-cost"><strong>CUSTO</strong></td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Preto & Branco - Tamanho A5</td>
                        <td>
                          {/* QUANTIDADE */}
                          975
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.7
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Preto & Branco - Tamanho A4</td>
                        <td>
                          {/* QUANTIDADE */}
                          1899
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.4
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Preto & Branco - Tamanho A3</td>
                        <td>
                          {/* QUANTIDADE */}
                          1564
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.4
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Colorida - Tamanho A4</td>
                        <td>
                          {/* QUANTIDADE */}
                          4525
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.3
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Petro & Branco - Reduzida</td>
                        <td>
                          {/* QUANTIDADE */}
                          4525
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.3
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Petro & Branco - Ampliada</td>
                        <td>
                          {/* QUANTIDADE */}
                          4525
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.3
                        </td>
                      </tr>
                    </tbody>
                  </React.Fragment>
                ))}
              </Table>
            </>
          ) : (
            <>
              <h1>{copiaTamanho.message}</h1>
            </>
          )}
          <Button className="btn-services" variant="primary" size="lg" onClick={() => { history.push("/addServiceCT") }}>
            Adicionar Serviço
          </Button>
        </div>
        {/* ~~~~~~~~~~~~~~ */}
        <div className="ca-table-div">
          <h1 className="title-services">Capa & Acabamento</h1>

          {capaAcabamento.status ? (
            <>
              <Table className="table-services" striped bordered hover size="sm">
                {capaAcabamento.list.map((data) => (
                  <React.Fragment key={data.id_services}>
                    <tbody>
                      <tr>
                        <td className="column-services"><strong>DESCRIÇÃO</strong></td>
                        <td className="column-quant"><strong>QUANTIDADE</strong></td>
                        <td className="column-cost"><strong>CUSTO</strong></td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Capa em Papel 150g e 2 Grampos Laterais</td>
                        <td>
                          {/* QUANTIDADE */}
                          975
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.7
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Capa em Papel 150g e 2 Grampos Cavalo</td>
                        <td>
                          {/* QUANTIDADE */}
                          1899
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.4
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Capa em Papel 150g e Espirais de Plástico</td>
                        <td>
                          {/* QUANTIDADE */}
                          1564
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.4
                        </td>
                      </tr>
                      <tr>
                        {/* DESCRIÇÃO */}
                        <td>Capa em PVC e Espiriais de Plástico</td>
                        <td>
                          {/* QUANTIDADE */}
                          4525
                        </td>
                        <td>
                          {/* CUSTO */}
                          0.3
                        </td>
                      </tr>
                    </tbody>
                  </React.Fragment>
                ))}
              </Table>
            </>
          ) : (
            <>
              <h1>{capaAcabamento.message}</h1>
            </>
          )}
          <Button className="btn-services" variant="primary" size="lg" onClick={() => { history.push("/addServiceCA") }}>
            Adicionar Serviço
          </Button>
        </div>
      </div>
    </>
  );
}