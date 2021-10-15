import React, { useState, useEffect } from 'react';
import '../../styles/newPassword.scss';
import { useLocation, useHistory } from 'react-router-dom'
import axios from "axios";
import queryString from 'query-string'

import LoginContainer from '../../components/loginContainer';

export default function NewPassword() {

  //Acessando os valores da URL ?token=...&email=...
  const pathName = useLocation().search;
  
  //Inputs de senha 
  //  ==> ****Realizar verificação no front se ambas as senhas digitadas são iguais antes de enviar.
  const [senhaInput, setSenhaInput] = useState("");
  const [senhaInput2, setSenhaInput2] = useState("");

  //Objetos que vão receber os valores fornecidos pela URL
  const [values, setValues] = useState({
    token: "",
    email: ""
  })

  //UseState() => Usado para setar o status de envio e realizar alguma alteração em função disso 
  // (mudei o botão de enviar para a mensagem abaixo!)
  const [enviado, setEnviado] = useState();

  //UseState() => Mensagem que será definida quando a requisição for enviada
  const [mensagem, setMensagem] = useState("")

  //Instanciando o useHistory para utilização na navegação do site
  const history = useHistory();


  //Função que realiza uma requisição na rota "/reset-password" enviando os valores de senha1 e 2, token e email fornecidos pela URL (enviado pelo email)
  function NewPasswordPost() {
    //Só envia a requisição se as senhas inseridas estiverem iguais.
    if (senhaInput !== senhaInput2) {
      setMensagem(`As senhas inseridas não coincidem!`)
    }
    else {
      const data = { senha: senhaInput, senha2: senhaInput2, token: values.token, email: values.email };
      axios.post("http://localhost:3002/reset-password", data).then((result) => {
        setEnviado(true)
        setMensagem(result.data.message)
        console.log(result)
      })
    }
  }

  //Função que executa os padrões de required do FORM do html e depois executa a nossa requisição (newPasswordPost)
  const onSubmit = (e) => {
    e.preventDefault();
    NewPasswordPost();
  }

  //Aquilo que é carregado/executado sempre que a página é recarregada
  useEffect(() => {
    //Formatando valores passados pela URL em Objetos ( ?token= ... ?email= ...)
    const values = queryString.parse(pathName)

    //Acessando esses objetos e Setando esses valores para conseguir usar eles na requisição (axios)
    setValues({
      token: values.token,
      email: values.email
    })
  },
    // Importante para não virar um Loop
    []);

  return (
    <div className="content">
      <LoginContainer />
      <div className="container">
        <h2 id="h2" className="np-subTitle">Digite a sua nova senha</h2>

        <form onSubmit={onSubmit}>
          <input
            id="new-senha"
            className="input-box"
            type="password"
            name="password1"
            onChange={(e) => {
              setSenhaInput(e.target.value);
            }}
            placeholder="Senha"
            required
          />
          <input
            id="new-senha2"
            className="input-box"
            type="password"
            name="password2"
            onChange={(e) => {
              setSenhaInput2(e.target.value);
            }}
            placeholder="Senha"
            required
          />

          <div className="link-box">
          </div>
          {/* Mensagem que será personalizada dependendo do que houver, se for feita ou não uma requisição ou houver algum
        tipo de erro */}
          <h4>{mensagem}</h4>


          {/* Se o valor de enviado for true, ele muda o botão de enviar para o botão de voltar.
              * importante: para usar o op. ternario, você deverá ter as mesmas tags no começo e final do operador,
              por isso foi usado o <> </>. *
          */}
          {enviado ?
            <>
              <button id="forgot-password-button" className="fp-button" onClick={() => history.push(`/`)}>Voltar</button>
            </>
            :
            <>
              <input
                id="new-password-button"
                className="np-button"
                name="new-password-button"
                type="submit"
                value="Enviar" />
            </>
          }

        </form>

      </div>
    </div>
  );
}