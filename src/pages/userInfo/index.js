import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../styles/userInfo.scss";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { AuthContext } from "./../../helpers/AuthContext";
import ProfileContainer from "../../components/profileContainer";
import Loading from '../../../src/components/loading';

function UserInfo(props) {
  var { id } = useParams();

  const [image, setImage] = useState({ raw: "", preview: "" });

  const [nif, setNif] = useState("");

  const [nameUser, setNameUser] = useState("");

  const [emailUser, setEmailUser] = useState("");

  const [telefoneUser, setTelefoneUser] = useState("");

  const [deptoUser, setDeptoUser] = useState("");

  const [edit, setEdit] = useState(false);

  const [changePass, setChangePass] = useState(false);

  const [pastPassword, setPastPassword] = useState();

  const [newPassword, setNewPassword] = useState();

  const [newPasswordConfirm, setNewPasswordConfirm] = useState();

  const [message, setMessage] = useState();

  const { setAuthState } = useContext(AuthContext);

  const port = process.env.REACT_APP_PORT || 3002;

  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  const [mensagem, setMensagem] = useState("");

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

    const formData = new FormData();
    formData.append("image", image.raw);
    if (nameUser !== "") {
      formData.append("nome", nameUser);
    }
    if (emailUser !== "") {
      formData.append("email", emailUser);
    }
    if (telefoneUser !== "") {
      formData.append("telefone", telefoneUser);
    }

    axios
      .put(`${reprografia_url}/myUser`, formData, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        if (result.data.status === "error") {
          setMensagem(result.data.message);
        }
        else {
          setMensagem(result.data.message);
          setTimeout(() => {
            setEdit(false)
          }, 1500);
        }
      });
  };

  const passwordPost = (e) => {
    e.preventDefault();

    axios
      .put(
        `${reprografia_url}/myUser/changePassword`,
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

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${reprografia_url}/user/` + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
        validateStatus: () => true,
      })
      .then((result) => {
        if (result.data.status !== "error") {
          setNif(result.data.nif);
          setNameUser(result.data.nome);
          setEmailUser(result.data.email);
          setTelefoneUser(result.data.telefone);
          setDeptoUser(result.data.depto);
          setImage({ preview: `${reprografia_url}/` + result.data.imagem });
          setLoading(false);
        }
      });
    axios
      .get(`${reprografia_url}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        setMyNif(result.data.nif);
        if (props.nif) {
          setMyNif(props.nif);
        }
      });
    setAdm(props.admin);
    return () => {
      setAdm({});
    };
  }, [props.admin, props.nif, id, reprografia_url]);


  //Importante para mandar pelo useContext se o usuário é administrador ou não
  // e assim enviar para o header o valor para o props.admin trazendo as informações
  // corretas no header para cada tipo de usuário (Esta terefa seria feita na página de login)
  // mas como vocês estão redirecionando para página de perfil de usuário assim que faz login,
  // temos que verificar se o usuário é admin pq vamos renderizar o header logo em seguida.
  const voltar = () => {
    axios
      .get(`${reprografia_url}/myUser`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.roles) {
          if (response.data.primeiro_acesso === 1) {
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

  return (
    <>
      {loading ? (
        <> <Loading /> </>
      ) : (
        <>
          <div className="content">
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
              </> :
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
                    editMyUser={true}
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
                    id="btn-back-change"
                    className="btn-back-user"
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
                        <h4 className="mensagem-edit">{mensagem}</h4>
                        <div className="btns">
                          <input
                            type="submit"
                            className="nu-send-button"
                            id="btn"
                            value="Enviar"
                          />
                          <button
                            className="btn-back-user"
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
                      <h3 className="input-title">TELEFONE</h3>
                      <h2 className="userInformation">{telefoneUser}</h2>
                      <h3 className="input-title">DEPARTAMENTO</h3>
                      <h2 className="userInformation">{deptoUser}</h2>
                      <div className="btns">

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
          </div>
        </>
      )}
    </>
  );
}

export default UserInfo;