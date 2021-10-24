import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom"
import ProfileContainer from "../../components/profileContainer";
import axios from 'axios';


const MyRequests = () => {

    const history = useHistory();

    var [pedidos, setPedidos] = useState({
        status: false,
        list: [],
        message: ""
    });

    var [nameUser, setNameUser] = useState();
    var [image, setImage] = useState();

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

                            //Setei algumas coisas para os elementos do nosso data, para que possamos usar isso no map lá embaixo,
                            //e renderizar coisas diferentes dependendo do status da avaliação (se tiver sido avaliado fica de uma forma,
                            // se não fica de outra, etc...)
                            data.criado = { color: "red", margin: "10px" }

                            //Aqui usei o campo de avaliado para mostrar o botão de avaliar caso o pedido ainda não tenha sido avaliado.
                            data.avaliado = false
                        }
                        else {
                            data.avaliacao_pedido += " | Atualizado em:" + data.atualizado

                            //Setei algumas coisas para os elementos do nosso data, para que possamos usar isso no map lá embaixo,
                            //e renderizar coisas diferentes dependendo do status da avaliação (se tiver sido avaliado fica de uma forma,
                            // se não fica de outra, etc...)
                            data.criado = { color: "green", margin: "10px" }

                            //Aqui usei o campo de avaliado para mostrar o botão de avaliar caso o pedido ainda não tenha sido avaliado.
                            data.avaliado = true
                        }
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


            axios
            .get("http://localhost:3002/meuUsuario", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((result) =>{
                setImage( "http://localhost:3002/" + result.data.imagem)
                setNameUser(result.data.nome)
            })
    }, []);

    return (
        <>
            <div className="content">

                <ProfileContainer requestsNoInfo = "true" source={image} name={nameUser} changePassword={() => {
                    history.push("/userInfo")
                }} />
                <div className="container">
                    {pedidos.status ?
                        <>
                            {pedidos.list.map((data) => (
                                <React.Fragment key={data.id_pedido}> {/* é a mesma coisa que <> ... <> é a abreviação de <React.Fragment>
                            A key é para referenciar uma key única para o map não se perder... e também parar de dar erro no console */}

                                    <div style={data.criado}> {/* Setei a cor das palavras dentro da div lá em cima no UseEffect para estar passando um estilo diferente 
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
                </div>
            </div>
        </>
    )
}

export default MyRequests;