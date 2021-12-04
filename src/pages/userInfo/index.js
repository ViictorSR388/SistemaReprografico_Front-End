import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../styles/userInfo.scss";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from "react-router";
// import { PassContext } from "../../helpers/changePassContext";
import { AuthContext } from "./../../helpers/AuthContext";
import ProfileContainer from "../../components/profileContainer";
import Loading from '../../../src/components/loading';

function UserInfo(props) {
  var { id } = useParams();

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nif, setNif] = useState("");

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [cfpUser, setCfpUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [edit, setEdit] = useState(false);

  const [changePass, setChangePass] = useState(false);

  const [pastPassword, setPastPassword] = useState();

  const [newPassword, setNewPassword] = useState();
  
  const [newPasswordConfirm, setNewPasswordConfirm] = useState();

  const [message, setMessage] = useState();

  const [notFound, setNotFound] = useState(false);

  const { setAuthState } = useContext(AuthContext);

  // var id_depto = deptoUser;

  // //estrutura de decisão para exibir corretamente o departamento
  // if (deptoUser === "1") {
  //   id_depto = "Aprendizagem Industrial Presencial"
  // }
  // else if (deptoUser === "2") {
  //   id_depto = "Graduação Tecnológica Presencial"
  // }
  // else if (deptoUser === "3") {
  //   id_depto = "Pós-Graduação Presencial"
  // }
  // else if (deptoUser === "4") {
  //   id_depto = "Extensão Presencial"
  // }
  // else if (deptoUser === "5") {
  //   id_depto = "Iniciação Profissional Presencial"
  // }
  // else if (deptoUser === "6") {
  //   id_depto = "Qualificação Profissional Presencial"
  // }
  // else if (deptoUser === "7") {
  //   id_depto = "Aperfeiç./Especializ. Profis. Presencial"
  // }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const history = useHistory();

  const handleUpload = (e) => {
    e.preventDefault();
    // var departamento;

    // //estrutura de decisão para enviar o valor para o back como numero inteiro
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
    if (cfpUser !== "") {
      formData.append("cfp", cfpUser);
    }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }

    axios
      .put("http://localhost:3002/myUser", formData, {
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

    axios
      .put(
        "http://localhost:3002/myUser/changePassword",
        { senhaAntiga: pastPassword, senhaNova: newPassword, confirmSenhaNova: newPasswordConfirm },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((result) => {
        console.log(result)
        if (result.data.status === "error") {
          setMessage(result.data.message);
        } else {
          setMessage(result.data.message);
          setTimeout(() => {
            setChangePass(false);
          }, 1500);
          
        }
      });
  };

  var [myNif, setMyNif] = useState();
  var [adm, setAdm] = useState();

  useEffect(() => {
    onLoad();
    setAdm(props.admin);
    return () => {
      setAdm({});
    };
  }, [props.admin]);

  const onLoad = () => {
    axios
      .get("http://localhost:3002/user/" + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true,
      })
      .then((result) => {
        if (result.status === 404) {
          setNotFound(true);
        }

        setNif(result.data.nif);
        setNameUser(result.data.nome);
        setEmailUser(result.data.email);
        setCfpUser(result.data.cfp);
        setTelefoneUser(result.data.telefone);
        setDeptoUser(result.data.depto);
        setImage({ preview: "http://localhost:3002/" + result.data.imagem });
        // if (props.nif === result.data.nif) {
        //   setEditableAccount(true)
        // }
      });
    axios
      .get("http://localhost:3002/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setMyNif(result.data.nif);
        if(props.nif){
          setMyNif(props.nif);
        }
      });
  };
//Importante para mandar pelo useContext se o usuário é administrador ou não
// e assim enviar para o header o valor para o props.admin trazendo as informações
// corretas no header para cada tipo de usuári (Esta terefa seria feita na página de login)
// mas como vocês estão redirecionando para página de perfil de usuário assim que faz login,
// temos que verificar se o usuário é admin pq vamos renderizar o header logo em seguida.
  const voltar = () => {
    axios
      .get("http://localhost:3002/myUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.roles) {
          console.log(response.data.primeiro_acesso)
          if(response.data.primeiro_acesso === 1){
            setAuthState({
              firstAccess: true,
            });
            history.push("/firstAccess")
          }
          else if (response.data.roles[0].descricao === "admin") {
            history.push("/management");
            setAuthState({
              admin: true
            });
          } else {
            history.push("/requestForm");
            setAuthState({
              admin: false
            });
          }
        }
      });
  };

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 1300);
  }, [])

  return (
    <>
      {loading ? (
        <> <Loading /> </>
      ) : (
        <>
          {notFound ? (
            <> Usuário não encontrado </>
          ) : (
            <>
              <div className="content">
                {/* <PassContext.Provider value={{ changePass, setChangePass }}> */}
                {adm && myNif !== nif ? 
                <>
                <ProfileContainer
                    image={image.preview}
                    name={nameUser}
                    nif={nif}
                    change={false}
                    admin={true}
                    edit={() => {
                      history.push(`edit/${nif}`)
                    }}
    
                  />
                </>: 
                <>
                 {myNif === nif ? (
                  <ProfileContainer
                    image={image.preview}
                    name={nameUser}
                    nif={nif}
                    change={true}
                    edit={() => {
                      setEdit(true);
                      setChangePass(false);
                    }}
                    changePassword={() => {
                      setChangePass(true);
                      setEdit(false)
                    }}
                  />
                ) : (
                  <ProfileContainer
                    image={image.preview}
                    name={nameUser}
                    nif={nif}
                  />
                )}
                </>}
               

                <div className="container-userInfo">
                  {changePass ? (
                    <>
                      {" "}
                      <h2 id="h2" className="ui-subTitle">
                        Alterar senha
                      </h2>
                      <form onSubmit={passwordPost}>
                        <div>
                          <h2 id="h2" className="ui-subTitle">
                            Senha antiga
                          </h2>
                          <input
                            required
                            type="password"
                            className="input-box"
                            placeholder="Insira sua senha antiga"
                            onChange={(e) => {
                              setPastPassword(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div>
                          <h2 id="h2" className="ui-subTitle">
                            Nova senha
                          </h2>
                          <input
                            required
                            type="password"
                            className="input-box"
                            placeholder="Insira a nova senha"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                            }}
                          ></input>
                        </div>
                        <div>
                          <h2 id="h2" className="ui-subTitle">
                            Confirmar nova senha
                          </h2>
                          <input
                            required
                            type="password"
                            className="input-box"
                            placeholder="Insira a nova senha"
                            onChange={(e) => {
                              setNewPasswordConfirm(e.target.value);
                            }}
                          ></input>
                        </div>
                        <button className="nu-send-button" type="submit">
                          Enviar
                        </button>
                      </form>
                      <button
                        className="nu-back-button"
                        onClick={() => {
                          setChangePass(false);
                        }}
                      >
                        Voltar
                      </button>
                      <h4>{message}</h4>
                    </>
                  ) : (
                    <>
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
                            <h3 className="input-title">CFP</h3>
                            <input
                              className="input-box"
                              name="cfpUser"
                              type="text"
                              placeholder={cfpUser}
                              onChange={(e) => {
                                setCfpUser(e.target.value);
                              }}
                            />
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
                              <FaCloudUploadAlt className="uploud" />
                              Upload
                            </label>
                            {/* <h3 className="input-title">DEPARTAMENTO</h3>
                    <select
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
                              <input
                                type="submit"
                                className="nu-send-button"
                                id="btn"
                                value="Enviar"
                              />
                              <button
                                className="nu-back-button"
                                id="btn"
                                onClick={() => {
                                  setEdit(false);
                                }}
                              >
                                {" "}
                                Voltar
                              </button>
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
                          <h2 className="userInformation">{deptoUser}</h2>
                          <div className="btns">
                            {/* {adm || myNif === nif ? <button className="btn-edit-user" id="btn" onClick={() => { setEdit(true) }}> Editar </button> : <></>} */}

                            <button
                              className="btn-back-user"
                              id="btn"
                              onClick={voltar}
                            >
                              {" "}
                              Voltar
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* </PassContext.Provider> */}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserInfo;
