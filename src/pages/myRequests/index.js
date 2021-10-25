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

<<<<<<< HEAD
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
=======
    useEffect(() => {
        axios
            .get("http://localhost:3002/meusPedidos", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
>>>>>>> c6e55e8d2ca426ff769dac4ceef9b47230290542
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
<<<<<<< HEAD

        axios.get("http://localhost:3002/meuUsuario", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((result) => {
            setImage("http://localhost:3002/" + result.data.imagem)
            setNameUser(result.data.nome)
            setLoading(false)
        })
=======
>>>>>>> c6e55e8d2ca426ff769dac4ceef9b47230290542
    }, []);

    return (
        <>

<<<<<<< HEAD
            <div className="content">
                {loading ? <> Loading...</> : <><ProfileContainer requestsNoInfo="true" source={image} name={nameUser} changePassword={() => {
=======
                <ProfileContainer changePassword={() => {
>>>>>>> c6e55e8d2ca426ff769dac4ceef9b47230290542
                    history.push("/userInfo")
                    setChangePass(true)
                }} />
<<<<<<< HEAD
                    <div className="container">
                        {pedidos.status ?
                            <>
                                {pedidos.list.map((data) => (
                                    <React.Fragment key={data.id_pedido}> {/* é a mesma coisa que <> ... <> é a abreviação de <React.Fragment>
                            A key é para referenciar uma key única para o map não se perder... e também parar de dar erro no console */}

                                        <div /* style={data.criado} */ > {/* Setei a cor das palavras dentro da div lá em cima no UseEffect para estar passando um estilo diferente 
                                    se um pedido já tiver sido atualizado (vocês podem alterar depois a forma que querem exibir essa diferença, pode ser um border, talvez...) */}

                                            <h2>Pedido{/*<N.ºspan>{data.id_pedido}</span>*/}:<span>{data.titulo_pedido}</span></h2>
                                            {/* <h2>Realizado pelo usuário com Nif: <span>{data.nif}</span> </h2> */}
                                            <h2>Centro de custos: <span>{data.centro_custos}</span></h2>

                                            <h2>status: <span>{data.avaliacao_pedido}</span></h2>
                                        </div>
                                        <button onClick={() => { history.push("/detPedido/" + data.id_pedido) }}>detalhes</button>
                                        {data.avaliado ? <></> : <button onClick={() => { history.push("/review/" + data.id_pedido) }}>Avaliar</button>}
                                        <h3>----------------------------</h3>  {/* Só coloquei para separar, para nao
                ter que mexer no css de voces e bagunçar algo lá... */}

                                    </React.Fragment>
                                ))}

                            </> :
                            <>
                                <h1>{pedidos.message}</h1>
                            </>
                        }
                        <button onClick={() => { history.push("/userInfo") }}> Voltar </button>
                    </div> </>}

=======
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
>>>>>>> c6e55e8d2ca426ff769dac4ceef9b47230290542
            </div>
        </>
    )
}

export default MyRequests;