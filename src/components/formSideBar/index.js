import React, { useEffect, useState } from "react";
import "./styles.scss";
import "../img/repo.scss"
import { useHistory } from 'react-router';
import axios from 'axios';

function SideBar(props) {
    
    const [name, setName] = useState("");
    const [nif, setNif] = useState("");
    const [image, setImage] = useState("");

    const history = useHistory();

    const routeForm = () => {
        history.push("/requestForm");
    }

    const routeManagement = () => {
        history.push("/management");
    }

    const routeMyRequests = () => {
        history.push("/myRequests");
    }

    const routeStatistics = () => {
        history.push("/statistics");
    }

    const routeServices = () => {
        history.push("/services");
    }


    useEffect(() => {
        axios
            .get("http://localhost:3002/myUser/", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((result) => {
                setName(result.data.nome)
                setNif(result.data.nif)
                setImage(`http://localhost:3002/${result.data.imagem}`)
            })

            if(props.nif){
                setNif(props.nif)
            }
            if(props.image){
                setImage(`${props.image}`)
            }
            if(props.name){
                setName(props.name)
            }
    }, [props.nif, props.image, props.name])

    return (
        <div className="sidebarG">
        <div onClick={() => { history.push(`/user/${nif}`) }} className="circle">
        <img src={image} className="repo" alt="imagem do usuário" />
      </div>
            <h2 className="subTitle" onClick={() => { history.push(`/user/${nif}`) }}>{name}</h2>
            <div className="buttonsG">

                {props.requestForm ? <></> : <><button className="buttonG" onClick={routeForm}>Solicitar Impressão</button></>}
                {props.admin ?
                    <>
                        {props.management ? <></> : <button className="buttonG" onClick={routeManagement}>Gerencia de usuários</button>}
                        {props.estatisticas ? <></> : <button className="buttonG" onClick={routeStatistics}>Estatísticas</button>}
                        {props.services ? <></> : <button className="buttonG" onClick={routeServices}>Serviços</button>}
                    </> : <></>}
                <button className="buttonG" onClick={routeMyRequests}>Meus Pedidos</button>
            </div>
        </div>
    );
}

export default SideBar;
