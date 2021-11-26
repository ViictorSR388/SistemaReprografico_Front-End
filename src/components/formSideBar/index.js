import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useHistory } from 'react-router';
import Repo from '../img/repo';
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
            .get("http://localhost:3002/myUser/" + nif, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
                validateStatus: () => true
            }).then((result) => {
                setName(result.data.nome)
                setNif(result.data.nif)
                setImage(result.data.imagem)
            })
    }, [])

    return (
        <div className="sidebarG">
            <Repo nif={nif} name={name} image={image}/>

            {console.log("NIF: " + nif + " NOME: " + name + " IMAGEM: " + image)}
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
