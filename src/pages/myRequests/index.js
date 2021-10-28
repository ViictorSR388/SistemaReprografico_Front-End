import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import ProfileContainer from "../../components/profileContainer";
import axios from 'axios'
import { PassContext } from "../../helpers/changePassContext";
import { Button, Card, Table } from 'react-bootstrap';

const MyRequests = () => {

    const history = useHistory();

    const { setChangePass } = useContext(PassContext);

    var [pedidos, setPedidos] = useState({
        status: false,
        list: [],
        message: ""
    });

    var [nameUser, setNameUser] = useState();
    var [image, setImage] = useState();
    var [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:3002/meusPedidos", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((result) => {
                console.log(result)
                if (result.data.length > 0) {
                    result.data.map((data) => {
                        if (data.avaliacao_pedido === "Ainda não avaliado.") {
                            data.avaliacao_pedido = "Ainda Não avaliado! | Criado em:" + data.criado
                        }
                        else {
                            data.avaliacao_pedido += " | Atualizado em:" + data.atualizado
                        }
                        // console.log(result.data.avaliacao_pedido)
                        return null;
                    })
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
            });

        axios.get("http://localhost:3002/meuUsuario", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((result) => {
            setImage("http://localhost:3002/" + result.data.imagem)
            setNameUser(result.data.nome)
            setLoading(false)
        })
    }, []);

    return (
        <>
            <div className="content">
            {loading ? <> Loading...</> : <><ProfileContainer requestsNoInfo="true" source={image} name={nameUser} changePassword={() => {
                    history.push("/userInfo")
                    setChangePass(true)
                }} />
                <div className="container">
                    {pedidos.status ?
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
                                    <React.Fragment key={data.id_pedido}> {/* é a mesma coisa que <> ... <> é a abreviação de <React.Fragment>
                            A key é para referenciar uma key única para o map não se perder... e também parar de dar erro no console */}
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
                                                <td >
                                                    <Button className="detailsForm" variant="secondary" onClick={() => { history.push("/detPedido/" + data.id_pedido) }}>detalhes</Button>
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
                    <Button className="btn-back-user" onClick={() => { history.push("/userInfo") }}> Voltar </Button>
                </div>
                </>}
            </div>
        </>
    )
}

export default MyRequests;