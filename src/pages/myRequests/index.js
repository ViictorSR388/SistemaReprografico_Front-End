import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from '../../../src/components/header';
import SideBar from '../../../src/components/formSideBar';
import axios from 'axios'
import { Button, Card, Table } from 'react-bootstrap';
import '../../styles/myRequests.scss'

const MyRequests = (props) => {

    const history = useHistory();

    var [pedidos, setPedidos] = useState({
        status: false,
        list: [],
        message: ""
    });

    var [avaliados, setAvaliados] = useState();
    var [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:3002/myRequests/rated=0", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((result) => {
                if (result.data.length > 0) {
                    setPedidos({
                        list: result.data,
                        status: true
                    })
                }
                else {
                    setPedidos({
                        message: result.data.message
                    })
                }
                setLoading(false)
            });
    }, []);

    // const [pastPassword] = useState();
    // const [newPassword] = useState();
    // const [setMessage] = useState();

    // const passwordPost = (e) => {
    //     e.preventDefault();

    //     axios.put("http://localhost:3002/mudarSenha", { senhaAntiga: pastPassword, senhaNova: newPassword }, {
    //         headers: {
    //             accessToken: localStorage.getItem("accessToken"),
    //         },
    //     }).then((result) => {
    //         if (result.data.error) {
    //             setMessage(result.data.error)
    //         }
    //         else {
    //             setMessage(result.data.message)
    //         }
    //     })
    // }

    const getAvaliados = (id) => {
        axios
            .get("http://localhost:3002/myRequests/rated=" + id, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((result) => {
                console.log(result)
                if (result.data.length > 0) {
                    setPedidos({
                        list: result.data,
                        status: true
                    })
                    console.log(result.data)
                    if (id === 1) {
                        setAvaliados(true);
                    }
                    else {
                        setAvaliados(false);
                    }
                }
                else {
                    setPedidos({
                        message: "Sem registros...",
                        ativos: true
                    });
                }
            });
    }

    return (
        <>
            <div className="content">
                {loading ? <> loading... </> : <>
                    <Header nif={props.nif} />
                    <SideBar image={props.image} name={props.name} requestsNoInfo={true} nif={props.nif} admin={props.admin} />

                    <div className="container">
                        <div className="avaliacao-request">
                            {avaliados ? <>Já avaliados</> : <>Ainda não avaliados</>}
                        </div>
                        <div className="btns-request">
                            <button className="btn-request" onClick={() => getAvaliados(0)}>Não avaliados</button>
                            <button className="btn-request" onClick={() => getAvaliados(1)}>Avaliados</button>
                        </div>
                        <>
                            {pedidos.status ?
                                <>
                                    <Table className="table-request" striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Pedido</th>
                                                {avaliados ? <th>Atualizado</th> : <th>Realizado</th>}
                                                <th>Status</th>
                                                <th>⠀⠀⠀⠀⠀⠀⠀⠀⠀</th>
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
                                                            {avaliados ? <Card.Text>{data.updatedAt}</Card.Text> : <Card.Text>{data.createdAt}</Card.Text>}
                                                        </td>
                                                        <td>
                                                            <Card.Text>{data.id_avaliacao_pedido}</Card.Text>
                                                        </td>
                                                        <td>
                                                            <div className="details-btns">
                                                                {avaliados ? <>
                                                                    <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/requestList/" + data.id_pedido) }}>detalhes</Button>
                                                                </> :
                                                                    <>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/review/" + data.id_pedido) }}>avaliar</Button>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/requestList/" + data.id_pedido) }}>detalhes</Button>
                                                                    </>}
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </React.Fragment>
                                        ))}
                                    </Table>

                                </> :
                                <>
                                    <h1>{pedidos.message}</h1>
                                </>
                            }
                        </>
                        {/**<Button className="back-request" onClick={() => history.push('/requestForm')}> Voltar </Button>**/}
                    </div>
                </>}
            </div>
        </>
    )
}

export default MyRequests;