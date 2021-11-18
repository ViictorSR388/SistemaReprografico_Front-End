import React, { useState, useEffect } from 'react';
import '../../styles/statistics.scss';

import Header from "../../components/header";
import SideBar from "../../components/formSideBar";
import MenuG from "../../components/hamburgerButtonG";

import axios from 'axios';


export default function Statistics(props) {

    const [fetchStatus, setFetchStatus] = useState();

    const [meses, setMeses] = useState({
        list: [],
    });

    const [unicoMes, setUnicoMes] = useState([])

    const [ano, setAno] = useState();
    const [mes, setMes] = useState();

    const selectMesAno = (e) => {
        e.preventDefault();

        var anoInt = parseInt(ano)

        fetchMes(anoInt, mes);
    }

    const fetchMes = (ano, mes) => {
        axios.get(`http://localhost:3002/estatisticas/mensais/${ano}/${mes}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((result) => {
            console.log(result)
            setUnicoMes([result.data[0]])
        })
    }

    const fetch4 = () => {
        axios.get("http://localhost:3002/estatisticas/quatroMeses", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((result) => {
            console.log(result.data)

            setMeses({
                list: [result.data],
                mes1: result.data[8],
                mes2: result.data[9],
                mes3: result.data[10],
                mes4: result.data[11],
            });

            setFetchStatus(true);
        })
    }

    useEffect(() => {
        fetch4();
    }, [])


    return (
        <>
            {fetchStatus ? <>


                MAP UNICO MES

                {unicoMes.map((data) => (
                    <>
                    <div>{data.mes}</div>
                    <div>{data.ano}</div>
                    <div>Quantos pedidos foram feitos: {data.pedidos}</div>

                    {data.avaliacao_pedido.map((data) => (
                        <>
                        {data[0].status}: {data[0].qtdade_solicitada}
                        </>
                    ))}
                    </>
                ))}

                <form onSubmit={selectMesAno}>
                    <label>ano</label>
                    <input onChange={(e) => {setAno(e.target.value)}}></input>
                    
                    <label>mes</label>
                    <input onChange={(e) => {setMes(e.target.value)}}></input>

                    <button type="submit">ENTER</button>

                </form>

                {meses.list.map((data) => (
                    <>
                        <div id="mes1">{data[8].mes}</div>
                        <hr></hr>
                        AVALIACAO PEDIDO
                        {data[8].avaliacao_pedido.map((data) => (
                            <>
                                <div>{data[0].status}:{data[0].qtdade_solicitada}</div>
                                <div>{data[1].status}:{data[1].qtdade_solicitada}</div>
                                <div>{data[2].status}:{data[2].qtdade_solicitada}</div>
                            </>
                        ))}
                        <hr></hr>
                        CENTRO CUSTOS
                        {data[8].centro_custos.map((data) => (
                            <>
                                <div>{data[1].descricao}: {data[1].qtdade_solicitada}</div>
                                <div>{data[2].descricao}: {data[2].qtdade_solicitada}</div>
                            </>
                        ))}
                        <hr></hr>

                        <div>custo total: {data[8].custo_total}</div>
                        <hr></hr>
                        <br></br>

                        <div>{data[9].mes}</div>
                        <br></br>
                        <div>{data[10].mes}</div>
                        <br></br>
                        <div>{data[11].mes}</div>

                    </>
                ))}
            </> : <> </>}

        </>
    );
}