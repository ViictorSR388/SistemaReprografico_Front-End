import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import LoginContainer from "../../components/loginContainer";
import { FaSignOutAlt } from 'react-icons/fa';
import '../../styles/firstAccess.scss';
import { AuthContext } from "./../../helpers/AuthContext";

function FirstAccess(props) {
    var history = useHistory();
    //nome
    const [senha, setSenha] = useState('');
    //email
    const [confirmSenha, setConfirmSenha] = useState('');

    const [message, setMessage] = useState();

    const { setAuthState } = useContext(AuthContext);

    const atualizarSenha = () => {
        axios.put('http://localhost:3002/myUser/firstAccess', { senha: senha, confirmSenha: confirmSenha }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((result) => {
            setMessage(result.data.message)
            if (result.data.status === "ok") {
                setTimeout(() => {
                    setAuthState({
                        firstAccess: false
                    })
                }, 1000);
                setTimeout(() => {
                    history.push(`/user/${props.nif}`)
                }, 1200)
            }
            else if (result.data.message === "Esse não é o seu primeiro acesso!"){
                
                setTimeout(() => {
                    logout();
                }, 1000);
            } 
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        atualizarSenha();
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        history.push('/')
    };

    return (
        <>
            <div className="content">
                <LoginContainer />
                <div className="container-login">
                    <h2 className="title-firstAccess">
                        Insira sua nova senha
                    </h2>
                    <form onSubmit={onSubmit}>
                        <input
                            className="pass-first"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            required
                            onChange={(e) => {
                                setSenha(e.target.value);
                            }}
                        />
                        <input
                            className="pass-first"
                            name="password"
                            type="password"
                            placeholder="Confirmar senha"
                            required
                            onChange={(e) => {
                                setConfirmSenha(e.target.value);
                            }}
                        />
                        
                        <div className="btns">
                            <input
                                className="env-first"
                                type="submit"
                                value="Enviar"
                            />
                        </div>
                    </form>
                    <h4>{message}</h4>
                    <div className="exit-access">
                        <FaSignOutAlt className="exit-firstAccess" onClick={logout} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FirstAccess;