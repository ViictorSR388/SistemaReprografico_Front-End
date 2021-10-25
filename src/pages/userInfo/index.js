import React, { useState, useEffect } from "react";
import "../../styles/userInfo.scss";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from 'react-router';
import ProfileContainer from "../../components/profileContainer";

function UserInfo() {

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nif, setNif] = useState("");

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [edit, setEdit] = useState(false);

  const [changePass, setChangePass] = useState();

  const [pastPassword, setPastPassword] = useState();

  const [newPassword, setNewPassowrd] = useState();

  const [message, setMessage] = useState();

  const [loading, setLoading] = useState();

  const [title, setTitle] = useState("Alterar Senha");

  var id_depto = deptoUser;

  //estrutura de decisão para exibir corretamente o departamento
  if (deptoUser === "1") {
    id_depto = "Aprendizagem Industrial Presencial"
  }
  else if (deptoUser === "2") {
    id_depto = "Graduação Tecnológica Presencial"
  }
  else if (deptoUser === "3") {
    id_depto = "Pós-Graduação Presencial"
  }
  else if (deptoUser === "4") {
    id_depto = "Extensão Presencial"
  }
  else if (deptoUser === "5") {
    id_depto = "Iniciação Profissional Presencial"
  }
  else if (deptoUser === "6") {
    id_depto = "Qualificação Profissional Presencial"
  }
  else if (deptoUser === "7") {
    id_depto = "Aperfeiç./Especializ. Profis. Presencial"
  }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const history = useHistory();

  // const routeUserInfo = () => {
  //   history.goBack();
  // }

  const handleUpload = (e) => {
    e.preventDefault();

    //Retirei o departamento e CFP, refleti e acho que não seria bacana o usuário estar modificando
    //coisas como essas, isso deveria ficar a cargo da gerente trocar caso for necessário, o funcionário
    //não pode definir o setor que o usuário dele trabalha... Sobre o CFP, acho que será algo tão único 
    //quanto o NIF, sendo também meio irrelevante pro usuário ficar aparecendo toda hora na parte de edit,
    //coisa que ele não ia atualizar acho que nunca, e se precisar ser modificado, tem o administrador do sistema
    //que pode alterar qualquer informação de qualquer usuário.

    // var departamento;
    //estrutura de decisão para enviar o valor para o back como numero inteiro
    // if (deptoUser === "1") {
    //   departamento = 1;
    // } else if (deptoUser === "2") {
    //   departamento = 2;
    // } else if (deptoUser === "3") {
    //   departamento = 3;
    // } else if (deptoUser === "4") {
    //   departamento = 4;
    // } else if (deptoUser === "5") {
    //   departamento = 5;
    // } else if (deptoUser === "6") {
    //   departamento = 6;
    // } else if (deptoUser === "7") {
    //   departamento = 7;
    // }

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    // if (cfpUser !== "") {
    //   formData.append("cfp", cfpUser);
    // }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }
    // if (deptoUser !== "") {
    //   formData.append("depto", departamento);
    // }

    axios
      .put("http://localhost:3002/meuUsuario", formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
      });
  };

  const passwordPost = (e) => {
    e.preventDefault();

    axios.put("http://localhost:3002/mudarSenha", { senhaAntiga: pastPassword, senhaNova: newPassword }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((result) => {
      if (result.data.error) {
        setMessage(result.data.error)
      }
      else {
        setMessage(result.data.message)
        history.go()
      }
    })
  }

  useEffect(() => {
    //Setando Loading como true antes do fetch ter passado as informações pros nossos hooks.
    setLoading(true)
    axios
      .get("http://localhost:3002/meuUsuario", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setNif(result.data.nif)
        setNameUser(result.data.nome);
        setEmailUser(result.data.email);
        setCfpUser(result.data.cfp);
        setTelefoneUser(result.data.telefone);
        setDeptoUser(result.data.id_depto);
        setImage({ preview: "http://localhost:3002/" + result.data.imagem });

        //Setando Loading como falso depois do fetch já ter passado as informações pros nossos hooks. (Exibirá as informações da página => Operador ternário no return)
        setLoading(false)
      });
  }, []);

  return (
    <div className="content">
      {loading ? <> Loading... {/* Pode ser substituido por um componente mais tarde
          Sugiro fazer isso em todas as páginas que precisam do useEffect para exibir as 
          informações. Ai caso demore para exibir, para que a experiência do usuário não fique
          ruim, é bacana a gente exibir um loading para ele e só mostrar as informações depois
          que o FETCH GET tive sido completado.
          */}</> :

        <> <ProfileContainer title={title} source={image.preview} name={nameUser} changePassword={() => { setChangePass(true); setTitle("") }} />
          <div className="container">

            {changePass ? <>
              <h2 id="h2" className="ui-subTitle">
                Alterar senha
              </h2>
              <form onSubmit={passwordPost}>
                <div>
                  <h2 id="h2" className="ui-subTitle">
                    Senha antiga
                  </h2>
                  <input required type="password" className="input-box" placeholder="Insira sua senha antiga"
                    onChange={(e) => {
                      setPastPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <h2 id="h2" className="ui-subTitle">
                    Nova senha
                  </h2>
                  <input required type="password" className="input-box" placeholder="Insira a nova senha"
                    onChange={(e) => {
                      setNewPassowrd(e.target.value);
                    }}
                  ></input>
                </div>
                <button type="submit">Enviar</button>
              </form>
              <button onClick={() => { setChangePass(false); setTitle("Alterar Senha") }}>Voltar</button>
              <h4>{message}</h4>
            </> : <>
              <h2 id="h2" className="ui-subTitle">
                Informações pessoais
              </h2>
              {edit ? (
                <>
                  {" "}
                  <form onSubmit={handleUpload}>
                    <h3 className="input-title">NOME</h3>
                    <input
                      className="input-box"
                      name="nameUser"
                      type="text"
                      placeholder={nameUser}
                      onChange={(e) => {
                        setNameUser(e.target.value);
                      }}
                    />
                    <h3 className="input-title">EMAIL</h3>
                    <input
                      className="input-box"
                      name="emailUser"
                      type="email"
                      placeholder={emailUser}
                      onChange={(e) => {
                        setEmailUser(e.target.value);
                      }}
                    />
                    {/* <h3 className="input-title">CFP</h3>
                <input
                  className="input-box"
                  name="cfpUser"
                  type="text"
                  placeholder={cfpUser}
                  onChange={(e) => {
                    setCfpUser(e.target.value);
                  }}
                /> */}
                    <h3 className="input-title">TELEFONE</h3>
                    <input
                      className="input-box"
                      name="telefoneUser"
                      type="text"
                      placeholder={telefoneUser}
                      onChange={(e) => {
                        setTelefoneUser(e.target.value);
                      }}
                    />
                    <h3 className="input-title">IMAGEM</h3>
                    <label className="customize">
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                      />
                      <FaCloudUploadAlt />
                      Uploud
                    </label>
                    {/* <h3 className="input-title">DEPARTAMENTO</h3> */}
                    {/* <select
                  className="select"
                  id="deptoUser"
                  name="deptoUser"
                  onChange={(e) => {
                    setDeptoUser(e.target.value);
                  }}
                >
                  <option value="0" name="nothing" id="nothing">
                    Nenhuma Selecionada
                  </option>
                  <option value="1" name="AIP" id="AIP">
                    Aprendizagem Industrial Presencial
                  </option>
                  <option value="2" name="GTP" id="GTP">
                    Graduação Tecnológica Presencial
                  </option>
                  <option value="3" name="PGP" id="PGP">
                    Pós-Graduação Presencial
                  </option>
                  <option value="4" name="EP" id="EP">
                    Extensão Presencial
                  </option>
                  <option value="5" name="IPP" id="IPP">
                    Iniciação Profissional Presencial
                  </option>
                  <option value="6" name="QPP" id="QPP">
                    Qualificação Profissional Presencial
                  </option>
                  <option value="7" name="AEPP" id="AEPP">
                    Aperfeiç./Especializ. Profis. Presencial
                  </option>
                </select> */}
                    <div className="btns">
                      <input type="submit" className="nu-button" id="btn" value="Enviar"
                      />
                      <button className="nu-button" id="btn" onClick={() => { setEdit(false); setTitle("Alterar Senha") }}> Voltar</button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="input-title">NIF</h3>
                  <h2 className="userInformation">{nif}</h2>
                  <h3 className="input-title">EMAIL</h3>
                  <h2 className="userInformation">{emailUser}</h2>
                  <h3 className="input-title">CFP</h3>
                  <h2 className="userInformation">{cfpUser}</h2>
                  <h3 className="input-title">TELEFONE</h3>
                  <h2 className="userInformation">{telefoneUser}</h2>
                  <h3 className="input-title">DEPARTAMENTO</h3>
                  <h2 className="userInformation">{id_depto}</h2>
                  <div className="btns">
                    <button className="btn-edit-user" id="btn" onClick={() => { setEdit(true); setTitle("") }}> Editar </button>
                    <button className="btn-back-user" id="btn" onClick={() => { history.push("/requestFormC") }}> Voltar</button>
                  </div>
                </>
              )}</>}

          </div>
        </>}

    </div>
  );
}

export default UserInfo;
