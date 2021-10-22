import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import ProfileContainer from "../../components/profileContainer";
import axios from 'axios'
import { PassContext } from "../../helpers/changePassContext";

const MyRequests = () => {

    const history = useHistory();

    const { setChangePass } = useContext(PassContext);

    var [pedidos, setPedidos] = useState({
        status: false,
        list: [],
        message: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:3002/meusPedidos", {
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
    }, []);

    return (
        <>
            <div className="content">

                <ProfileContainer changePassword={() => {
                    history.push("/userInfo")
                    setChangePass(true)
                }} />
                <div className="container">
                    {pedidos.status ?
                        <>
                            {pedidos.list.map((data) => (
                                <React.Fragment key={data.id_pedido}> {/* é a mesma coisa que <> ... <> é a abreviação de <React.Fragment>
                            A key é para referenciar uma key única para o map não se perder... e também parar de dar erro no console */}
                                    <div>
                                        <h2>Pedido{/*<N.ºspan>{data.id_pedido}</span>*/}:<span>{data.titulo_pedido}</span></h2>
                                        {/* <h2>Realizado pelo usuário com Nif: <span>{data.nif}</span> </h2> */}
                                        <h2>Centro de custos: <span>{data.centro_custos}</span></h2>

                                        <h2>status: <span>{data.avaliacao_pedido}</span></h2>
                                    </div>
                                    <button onClick={() => { history.push("/detPedido/" + data.id_pedido) }}>detalhes</button>
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
                </div>
            </div>
        </>
    )
}

export default MyRequests;