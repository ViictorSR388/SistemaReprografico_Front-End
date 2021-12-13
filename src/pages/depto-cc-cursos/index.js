import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../styles/services.scss";
import Header from "../../../src/components/header";
import SideBar from "../../../src/components/formSideBar";
import { Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Menu from "../../components/hamburgerButton";
import Loading from '../../../src/components/loading';

function DeptoCursos(props) {

  const [mudarTabela, setMudarTabela] = useState(true);

  const [curso, setCurso] = useState()

  const [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_REPROGRAFIA_URL}/cursos/enabled=:enabled`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        setCurso(result.data.curso);
        console.log(result);
        setLoading(false);
      })
  }, [])


  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
        <Menu />
        <Header nif={props.nif} />
        <SideBar
          image={props.image}
          name={props.name}
          admin={props.admin}
          deptoCursos={true}
          nif={props.nif}
        />
          {mudarTabela ? <>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Cursos</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {/* {mudarTabela.list.map((data) => (
                  <React.Fragment key={data.id_servico}>
                    <tr>
                      <td>{data.descricao}</td>
                      <>
                        <td>
                          <Button
                            className="btn-disable"
                            // onClick={}
                          >
                            Desabilitar
                          </Button>
                        </td>
                      </>
                    </tr>
                  </React.Fragment>
                ))} */}
              </tbody>
            </Table>
          </> : <>
          </>}
        </>
      }
    </>
  );
}

export default DeptoCursos;