import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import '../../styles/newUser.scss';
// import Header from '../../components/header';
// import Menu from '../../components/hamburgerButton';
// import SideBar from '../../components/formSideBar';

// import NewUserContainer from '../../components/newUserContainer';

function FirstAccess(props) {
    var history = useHistory();

    //nome
    const [senha, setSenha] = useState('');
    //email
    const [confirmSenha, setConfirmSenha] = useState('');

    const [message, setMessage] = useState();

    const atualizarSenha = () => {
        axios.put('http://localhost:3002/myUser/firstAccess', { senha: senha, confirmSenha: confirmSenha }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((result) => {
            setMessage(result.data.message)
            setTimeout(() => {
                if(result.data.status === "ok"){
                    history.push("/requestForm")
                }
            }, 1000);
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        atualizarSenha();
    }

    return (
        <>
            {/*  <div className="content">

        <Menu />
        <Header />
        <SideBar image={props.image} name={props.name} admin={true}/> */ }

            <div className="container">
                <h2 id="h2" className="nu-subTitle">
                    Insira sua senha
                </h2>
                <form onSubmit={onSubmit}>
                    <input
                        className="input-box"
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => {
                            setSenha(e.target.value);
                        }}
                    />
                    <input
                        className="input-box"
                        name="password"
                        type="password"
                        placeholder="Confirmar senha"
                        required
                        onChange={(e) => {
                            setConfirmSenha(e.target.value);
                        }}
                    />
                    <h4>{message}</h4>
                    <div className="btns">
                        <input
                            type="submit"
                            className="nu-button"
                            id="btn"
                            value="Enviar"
                        />
                    </div>
                </form>
            </div>
            {/* </div> */}
        </>
    );
};

export default FirstAccess;