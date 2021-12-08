import React, { useState, useEffect } from "react";
import "../../styles/statistics.scss";
import { Table, Card } from "react-bootstrap";

import Header from "../../components/header";
import SideBar from "../../components/formSideBar";
import MenuG from "../../components/hamburgerButton";

import axios from "axios";

export default function Statistics(props) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    const mesesArray = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const [fetchMesStatus, setFetchMesStatus] = useState();
    const [fetchMesesStatus, setFetchMesesStatus] = useState();

    const [meses, setMeses] = useState({
        list: [],
    });
    const [message, setMessage] = useState();

    const [unicoMes, setUnicoMes] = useState([]);
    const [firstRequest, setFirstRequest] = useState(false);

    const [ano, setAno] = useState();
    const [mes, setMes] = useState();

    const selectMesAno = (e) => {
        e.preventDefault();

        var anoInt = parseInt(ano);

        fetchMes(anoInt, mes);
    };

    const fetchMes = (ano, mes) => {
        if (mes === "0" || mes === undefined) {
            setMessage("Selecione um mês para consulta")
        }
        else if (!ano) {
            setMessage("Insira um ano para consulta!")
        }
        else {
            axios
                .get(`http://localhost:3002/estatisticas/mensais/${ano}/${mes}`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                .then((result) => {
                    console.log(result);
                    setUnicoMes([result.data[0]]);
                    setFirstRequest(false)
                    setFetchMesStatus(true);
                    setMessage(null)
                });
        }
    };


    useEffect(() => {
        axios
        .get(`http://localhost:3002/estatisticas/mensais/${anoAtual}/${mesAtual}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        .then((result) => {
            console.log(result)
            setUnicoMes([result.data[0]]);
            setFetchMesStatus(true);
            setFirstRequest(true);
        });
    }, [anoAtual, mesAtual]);

    var [loading, setLoading] = useState(false);

    return (
        <>
            <Header nif={props.nif} />
            <MenuG />
            <SideBar image={props.image} name={props.name} admin={props.admin} estatisticas={true} nif={props.nif} />

            <div className="statistics-container">
                <div className="statistics-title">
                    <h1>Estatísticas Gerais</h1>
                </div>
                <div className="form-container">
                    <div className="month-form">
                        <select
                            className="input-mes"
                            onChange={(e) => {
                                setMes(e.target.value);
                            }}
                        >
                            <option value="0" name="padrão">
                                Selecione um Mês
                            </option>
                            <option value="1" name="janeiro">
                                Janeiro
                            </option>
                            <option value="2" name="fevereiro">
                                Fevereiro
                            </option>
                            <option value="3" name="março">
                                Março
                            </option>
                            <option value="4" name="abril">
                                Abril
                            </option>
                            <option value="5" name="maio">
                                Maio
                            </option>
                            <option value="6" name="junho">
                                Junho
                            </option>
                            <option value="7" name="julho">
                                Julho
                            </option>
                            <option value="8" name="agosto">
                                Agosto
                            </option>
                            <option value="9" name="setembro">
                                Setembro
                            </option>
                            <option value="10" name="outubro">
                                Outubro
                            </option>
                            <option value="11" name="novembro">
                                Novembro
                            </option>
                            <option value="12" name="dezembro">
                                Dezembro
                            </option>
                        </select>
                        <h2>{message}</h2>
                        <input
                            className="input-ano"
                            placeholder="Especifique o Ano"
                            onChange={(e) => {
                                setAno(e.target.value);
                            }}
                        />
                    </div>
                    <form onSubmit={selectMesAno} className="button-form">
                        <button className="send-date" type="submit">
                            Atualizar
                        </button>

                    </form>

                </div>

                {unicoMes.map((data) => (
                    <React.Fragment>
                        {firstRequest ? <><h1>Informações do mês atual ({mesesArray[mesAtual - 1]}):</h1></> : <><h1 className="">{data.mes} - {data.ano}</h1></>}
                        <div className="tables">
                            <div className="first-line-div">
                                <div className="first-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Pedidos</h1> : <></>}




                                    <Table striped bordered hover size="sm">
                                        <tbody>
                                            {data.avaliacao_pedido.map((data) => (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <strong>Atendeu</strong>
                                                        </td>
                                                        <td>
                                                            <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong>Não Atendeu</strong>
                                                        </td>
                                                        <td>
                                                            <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                        </td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>
                                                            <strong>Total de Pedidos</strong>
                                                        </td>
                                                        <td>
                                                            <Card.Text>
                                                                {data[0].qtdade_solicitada +
                                                                    data[1].qtdade_solicitada +
                                                                    data[2].qtdade_solicitada}
                                                            </Card.Text>
                                                        </td>
                                                    </tr> */}
                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="first-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Estatisticas Gerais</h1> : <></>}
                                    <Table className="table-statistics" striped bordered hover size="sm">
                                        {unicoMes.map((data) => (
                                            <React.Fragment>
                                                <tbody>
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <strong>Total de Pedidos</strong>
                                                            </td>
                                                            <td>
                                                                <Card.Text>{data.pedidos}</Card.Text>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Total de Folhas Impressas</strong>
                                                            </td>
                                                            <td>
                                                                <Card.Text>{data.folhas_impressas}</Card.Text>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Total de Copias</strong>
                                                            </td>
                                                            <td>
                                                                <Card.Text>{data.num_copias}</Card.Text>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Total de Paginas</strong>
                                                            </td>
                                                            <td>
                                                                <Card.Text>{data.num_paginas}</Card.Text>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Total de Custo</strong>
                                                            </td>
                                                            <td>
                                                                <Card.Text>{(Math.round((data.custo_total * 1000)/10)/100).toFixed(2)}</Card.Text>
                                                            </td>
                                                        </tr>
                                                    </>
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>
                                </div>
                                <div className="first-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Solicitações por Departamento</h1> : <></>}
                                    <Table striped bordered hover size="sm">
                                        {unicoMes.map((data) => (
                                            <React.Fragment>
                                                <tbody>
                                                    {data.centro_custos.map((data) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[1].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[2].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[3].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[3].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[4].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[4].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[5].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[5].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[6].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[6].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[7].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[7].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[8].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[8].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>

                                </div>
                            </div>
                            <div className="second-line-div">
                                <div className="second-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Solicitações por Cursos</h1> : <></>}
                                    <Table className="" striped bordered hover size="sm">
                                        {unicoMes.map((data) => (
                                            <React.Fragment>
                                                <tbody>
                                                    {data.curso.map((data) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[1].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[2].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[3].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[3].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[3].descricao}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[3].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>
                                </div>
                                <div className="second-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Solicitações por Capa & Acabamento</h1> : <></>}
                                    <Table className="" striped bordered hover size="sm">
                                        {unicoMes.map((data) => (
                                            <React.Fragment>
                                                <tbody>
                                                    {data.servico_capaAcabamento.map((data) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[1].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[2].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[3].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[3].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[4].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[4].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>
                                </div>
                                <div className="second-line-tables">
                                    {fetchMesStatus ? <h1 className="title-tables">Solicitações por Copia & Tamanho</h1> : <></>}
                                    <Table className="" striped bordered hover size="sm">
                                        {unicoMes.map((data) => (
                                            <React.Fragment>
                                                <tbody>
                                                    {data.servico_copiaTamanho.map((data) => (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[1].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[1].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[2].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[2].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[3].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[3].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[4].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[4].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[5].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[5].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>{data[6].status}</strong>
                                                                </td>
                                                                <td>
                                                                    <Card.Text>{data[6].qtdade_solicitada}</Card.Text>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>
                                </div>
                            </div>
                            {fetchMesStatus ? <></> : <h1 className="select-a-date">Selecione uma Data</h1>}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}