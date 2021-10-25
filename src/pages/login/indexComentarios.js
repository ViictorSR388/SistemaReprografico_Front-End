import React, { useCallback, useContext, useState } from 'react';
import '../../styles/login.scss';
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from '../../helpers/AuthContext';

// import { FaEnvelope } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

import LoginContainer from '../../components/loginContainer'

export default function Login() {

  //Inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const {setAuthState} = useContext(AuthContext)

    //UseState() => Mensagem que será definida quando a requisição for enviada
    const [mensagem, setMensagem] = useState("")

    //Instanciando o useHistory para utilização na navegação do site
    let history = useHistory();

    //Função que realiza um POST na rota "/auth/signin" enviando dados fornecidos no input email e senha 
    // (acabei deixando o email mesmo, mas podemos discutir sobre isso na reunião de amanhã.)
    const LoginPost = () => {
    const data = { email: email, senha: senha };
    axios.post("http://localhost:3002/auth/signin", data).then((result) => {  
      //Aqui deixei o console.log para vocês verem as informações que são passadas pelo back-end quando o usuário
      // realiza o login.
      console.log(result)

      //Aqui é se caso houver erro, ele vai mostrar na mensagem ( <h4>{mensagem}</h4>) o que definimos de resposta
      // no back-end para cada caso (res.json)
      if (result.data.error) {
          setMensagem(result.data.error)
        }

        //Se não houver erro, ele pega o token gerado pelo back-end e coloca no localStorage da página, isso é útil
        //para vcs verificarem se o usuário está logado ou não, e também para manter a sessão dele mesmo que ele
        //saia da página.
        else {
          localStorage.setItem("accessToken", result.data.accessToken);
          setAuthState(true)
          history.push('requestFormC')
         
         // ===> Deem uma pesquisada sobre isso, ai vcs podem pegar os dados que são ppassados pelo login para 
         //Mostrar o usuário logado na aplicação e também fazer funcionar o botão de LogOut!!
          // setAuthState({
          //   username: result.data.username,
          //   id: result.data.id,
          //   status: true,
          // });
          
          //Exemplo de como pode ser a regra para redirecionar...  Mas podem fazer outra lógica sobre isso, só fiz para testar
          //Quando vcs inserirem um usuário, precisam no front passar de alguma forma uma array de dados para o tipo_usuario.
          if(result.data.roles.length >= 2){history.push('/requestFormG')}
          else{
            history.push('/management')
          }
  
        }
      });
    };

    //Função que executa os padrões de required do FORM do html e depois executa a nossa requisição (newPasswordPost)
  const onSubmit = e => {
    e.preventDefault();
    LoginPost();
  }

  
  return (
    <>
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="login-subTitle">Login</h2>

        <form onSubmit={onSubmit}>
          <input
              id="email" 
              className="login-input-box"
              type="text" 
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="E-mail" 
              required
          />
          <input 
              id="password" 
              className="login-input-box" 
              type="password" 
              name="senha" 
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              placeholder="Senha"
              required  
          />

          <div className="link-box">
            <a className="newPassword" onClick={() => history.push(`/forgotPassword`)}>Esqueci a senha</a>
          </div>

          <input 
              id="login-button" 
              className="login-button" 
              name="login-button"
              type="submit"
              // onClick={LoginPost} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
              value="Entrar" />
        </form>
        {/* Mensagem que será personalizada dependendo do que houver, se for feita ou não uma requisição ou houver algum
        tipo de erro */}
        <h4>{mensagem}</h4>
      </div>
    </div>
    </>
  );
}