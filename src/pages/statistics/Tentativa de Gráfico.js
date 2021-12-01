import React, { useState, useEffect } from 'react';
import '../../styles/statistics.scss';
import { Pie, Bar, Doughnut } from "react-chartjs-2";

import Header from "../../components/header";
import SideBar from "../../components/formSideBar";
import MenuG from "../../components/hamburgerButtonG";

import axios from 'axios';


export default function Statistics(props) {
    var dataAtual = new Date();
    var mesAtual = (dataAtual.getMonth() + 1);


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
            <Header />
            <MenuG />
            <SideBar />

            <div className="statistics-container">
                <div className="statistics-title">
                    <h1>Estatísticas Gerais</h1>
                </div>
                {meses.list.map((data) => (
                <div className="statistics">
                    <section className="line1">
                        <div className="cards">
                            <h4 className="statics-subtitle" >Tabela X</h4>
                            <div>
                                {/* {data[8].avaliacao_pedido.map((data) => ( */}
                                <Bar
                                    data={{
                                        labels: [data[mesAtual-3].mes, data[mesAtual-2].mes, data[mesAtual-1].mes, data[mesAtual].mes],
                                        datasets: [
                                            {
                                                label: 'Solicitações Mensais',
                                                // data: [data[0].qtdade_solicitada, data[1].qtdade_solicitada, data[2].qtdade_solicitada],
                                                data: ['10','15','20','25'],
                                                backgroundColor: ['rgba(6, 90, 158, 0.527)'],
                                                borderColor: ['rgba(11, 67, 112, 0.527)'],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    width="210" height="105"
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                        },
                                        legend: {
                                            labels: {
                                                fontSize: 25,
                                            },
                                        },
                                    }}
                                />
                                {/* ))} */}
                            </div>
                        </div>
                        <div className="cards">
                            <h4 className="statics-subtitle" >Tabela Y</h4>
                            <div>
                                {data[8].centro_custos.map((data) => (
                                <Pie
                                    data={{
                                        labels: [data[1].descricao, data[2].descricao, data[3].descricao, data[4].descricao],
                                        datasets: [
                                            {
                                                label: 'Centro de Custos',
                                                data: [data[1].qtdade_solicitada, data[2].qtdade_solicitada, data[3].qtdade_solicitada, data[4].qtdade_solicitada],
                                                data: [12, 19, 3, 5],
                                                backgroundColor: [
                                                    'rgba(213, 81, 253, 0.822)',
                                                    'rgba(181, 72, 214, 0.904)'
                                                  ],
                                                  borderColor: [
                                                    'rgba(141, 141, 141, 0.562)'
                                                  ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    width="210" height="105"
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                        },
                                        legend: {
                                            labels: {
                                                fontSize: 25,
                                            },
                                        },
                                    }}
                                    />
                                    ))}
                            </div>
                        </div>
                        <div className="cards">
                            <h4 className="statics-subtitle" >Tabela Z</h4>
                            <div>
                            {data[8].curso.map((data) => (
                                <Doughnut
                                    data={{
                                        labels: [data[mesAtual-3].mes, data[mesAtual-2].mes, data[mesAtual-1].mes, data[mesAtual].mes],
                                        datasets: [
                                            {
                                                label: 'Curso',
                                                data: [data[1].quantidade_solicitada, data[2].quantidade_solicitada, data[3].quantidade_solicitada, data[4].quantidade_solicitada],
                                                backgroundColor: [
                                                    'rgba(241, 94, 26, 0.733)',
                                                    'rgba(240, 150, 108, 0.829)',
                                                    'rgba(207, 107, 61, 0.829)'
                                                  ],
                                                  borderColor: [
                                                    'rgba(141, 141, 141, 0.562)'
                                                  ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    width="210" height="105"
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                        },
                                        legend: {
                                            labels: {
                                                fontSize: 25,
                                            },
                                        },
                                    }}
                                />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="line2">
                        <div className="cards2">
                            <h4 className="statics-subtitle" >Tabela X</h4>
                        </div>
                        <div className="cards2">
                            <h4 className="statics-subtitle" >Tabela Y</h4>
                        </div>
                        <div className="cards2">
                            <h4 className="statics-subtitle" >Tabela Z</h4>
                        </div>
                    </section>
                </div>
                ))}
            </div>
        </>


        // <>
        //     {fetchStatus ? <>


        //         MAP UNICO MES

        //         {unicoMes.map((data) => (
        //             <>
        //             <div>{data.mes}</div>
        //             <div>{data.ano}</div>
        //             <div>Quantos pedidos foram feitos: {data.pedidos}</div>

        //             {data.avaliacao_pedido.map((data) => (
        //                 <>
        //                 {data[0].status}: {data[0].qtdade_solicitada}
        //                 </>
        //             ))}
        //             </>
        //         ))}

        //         <form onSubmit={selectMesAno}>
        //             <label>ano</label>
        //             <input onChange={(e) => {setAno(e.target.value)}}></input>

        //             <label>mes</label>
        //             <input onChange={(e) => {setMes(e.target.value)}}></input>

        //             <button type="submit">ENTER</button>

        //         </form>

        //         {meses.list.map((data) => (
        //             <>
        //                 <div id="mes1">{data[8].mes}</div>
        //                 <hr></hr>
        //                 AVALIACAO PEDIDO
        //                 {data[8].avaliacao_pedido.map((data) => (
        //                     <>
        //                         <div>{data[0].status}:{data[0].qtdade_solicitada}</div>
        //                         <div>{data[1].status}:{data[1].qtdade_solicitada}</div>
        //                         <div>{data[2].status}:{data[2].qtdade_solicitada}</div>
        //                     </>
        //                 ))}
        //                 <hr></hr>
        //                 CENTRO CUSTOS
        //                 {data[8].centro_custos.map((data) => (
        //                     <>
        //                         <div>{data[1].descricao}: {data[1].qtdade_solicitada}</div>
        //                         <div>{data[2].descricao}: {data[2].qtdade_solicitada}</div>
        //                     </>
        //                 ))}
        //                 <hr></hr>

        //                 <div>custo total: {data[8].custo_total}</div>
        //                 <hr></hr>
        //                 <br></br>

        //                 <div>{data[9].mes}</div>
        //                 <br></br>
        //                 <div>{data[10].mes}</div>
        //                 <br></br>
        //                 <div>{data[11].mes}</div>

        //             </>
        //         ))}
        //     </> : <> </>}

        // </>

    );
}