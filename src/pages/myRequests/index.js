import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import ProfileContainer from "../../components/profileContainer";
import axios from 'axios'
// import { PassContext } from "../../helpers/changePassContext";
import { Button, Card, Table } from 'react-bootstrap';

const MyRequests = (props) => {

    const history = useHistory();

    // const { setChangePass } = useContext(PassContext);

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
                    })
                }
            });
    }

    return (
        <>
            <div className="content">
                {loading ? <> Loading... </> : <><ProfileContainer requestsNoInfo="true" image={props.image} name={props.name} changePassword={() => {
                    history.push("/userInfo")
                }} />
                    <div className="container">
                        <div>
                            <button onClick={() => getAvaliados(0)}>Não avaliados</button>
                            <button onClick={() => getAvaliados(1)}>Avaliados</button>
                        </div>
                        {avaliados ? <>Já avaliados</> : <>Ainda não avaliados</>}
                        <>
                            {pedidos.status ?
                                <>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Pedido</th>
                                                {avaliados ? <th>Atualizado</th> : <th>Realizado</th>}
                                                <th>Status</th>
                                                <th>⠀⠀⠀⠀⠀⠀⠀⠀⠀</th>
                                            </tr>
                                        </thead>
                                        {pedidos.list.map((data) => (
                                            <React.Fragment key={data.id_pedido}> {/* é a mesma coisa que <> ... <> é a abreviação de <React.Fragment>
                            A key é para referenciar uma key única para o map não se perder... e também parar de dar erro no console */}
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
                                                                    <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/detPedido/" + data.id_pedido) }}>detalhes</Button>
                                                                </> :
                                                                    <>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/review/" + data.id_pedido) }}>avaliar</Button>
                                                                        <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/detPedido/" + data.id_pedido) }}>detalhes</Button>
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
                        <Button className="btn-back-user" onClick={() => { history.push("/userInfo") }}> Voltar </Button>
                    </div>
                </>}
            </div>
        </>
    )
}

export default MyRequests;