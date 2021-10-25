import React, { useState } from 'react';
import { useHistory } from "react-router";
import LoginContainer from '../../components/loginContainer';
import '../../styles/forgotPassword.scss';
import axios from "axios";

export default function ForgotPassword() {

  //Input de email, também usamos esse valor para definir a mensagem personalizada.
  const [email, setEmail] = useState("");

  //UseState() => Mensagem que será definida quando a requisição for enviada (começa com o valor abaixo...)
  const [mensagem, setMensagem] = useState("Um link será enviado ao seu e-mail para a recuperação de senha")

  //UseState() => Usado para setar o status de envio e realizar alguma alteração em função disso 
  const [enviado, setEnviado] = useState();

  //Instanciando o useHistory para utilização na navegação do site
  const history = useHistory();

  const ForgotPasswordPost = () => {
    //Se o input do email estiver vázio ele seta um valor para a mensagem.
    if (email === '') {
      setMensagem("Insira um email!")
    }

    //Se não, ele faz a requisição POST na rota (/forgot-password) setando o status de envio como true e a mensagem com
    // o valor abaixo.
    else {
      const data = { mail: email };
      axios.post("http://localhost:3002/esqueceuSenha", data).then((response) => {

        //Retorna o valor de "enviado" como TRUE => Serve para usarmos na parte do operador ternário (trocar o botão por mensagem
        // se for true, por exemplo...)
        setEnviado(true)

        //Valor setado para "mensagem"
        setMensagem(`Se esse email pertencer a alguma conta, será enviado um email de recuperação para: ${email}`)
      });
    }
  }

  //Função que executa os padrões de required do FORM do html e depois executa a nossa requisição (newPasswordPost)
  const onSubmit = e => {
    e.preventDefault();
    ForgotPasswordPost();
  }

  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="fp-subTitle">Insira o seu e-mail</h2>

        <form onSubmit={onSubmit}>
          <input
            id="email"
            type="email"
            className="email-input-box"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
            required
          />
          {enviado ? <button id="forgot-password-button" className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            : <> <input
              type="submit"
              id="forgot-password-button"
              className="fp-button"
              name="forgot-password-button"
              onClick={ForgotPasswordPost} // Tirar duvidas sobre esse botão de login (VERIFICAR com o back)
              value="Enviar"
            />
              <button className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            </>
          }
        </form>
        {/* Mensagem que será personalizada dependendo do que houver, se for feita ou não uma requisição ou houver algum
        tipo de erro */}
        <h4>{mensagem}</h4>
      </div>
    </div>
  );
}