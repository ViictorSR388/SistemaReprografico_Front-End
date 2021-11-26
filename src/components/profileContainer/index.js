import React, { useState, useEffect } from 'react';
import './styles.scss';
import '../img/profile.scss';
import { useHistory } from 'react-router';
import axios from 'axios';

function ProfileContainer(props) {

    const [name, setName] = useState("");
    const [nif, setNif] = useState("");
    const [image, setImage] = useState("");

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
                if (props.nif) {
                    setNif(props.nif)
                }
                if (props.image) {
                    setImage(`${props.image}`)
                }
                if (props.name) {
                    setName(props.name)
                }
            })

    }, [props.nif, props.image, props.name])

    var history = useHistory();

    return (
        <div className="left-container" >
            {props.title ? <h2 Style="margin-bottom: 50px">{props.title}</h2> : null}
            <div className="icon-container" >
                <div className="profile-div">
                    <div onClick={() => { history.push(`/user/${nif}`) }} className="profile-div">
                        <img className="profile-image" src={image} id="profile-image" name="profile-image" alt="imagem de perfil" />
                    </div>
                </div>
            </div>
            {props.newUser ? <h2 className="subTitle">{name}</h2> : <h2 className="subTitle" onClick={() => { history.push(`/user/${props.nif}`) }}>{name}</h2> }
            <div className="profile-links" >
                {props.change ? <></> :
                    <>
                        <button className="button-edit" onClick={props.changePassword}>
                            Alterar Senha
                        </button>
                    </>
                }
            </div>
        </div>

    );
}

export default ProfileContainer;