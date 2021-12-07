import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addService.scss';
import LoginContainer from '../../components/loginContainer';
import Loading from '../../components/loading';

export default function AddService() {

  var history = useHistory();

  var { type } = useParams();

  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custo, setCusto] = useState("");
  const [message, setMessage] = useState();

  const port = process.env.REACT_APP_PORT || 3002;
  
  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  const AddService = () => {
    const data = {
      descricao: descricao,
      quantidade: quantidade,
      valor_unitario: custo,
    }
    axios.post(`${reprografia_url}/services/type=${type}`, data, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
      if (result.data.status === "error") {
        setMessage(result.data.message)
      }
      else {
        setMessage(result.data.message)
        setTimeout(() => {
          history.push("/services")
        }, 1500);
      }
    })
  }

  const voltar = () => {
    axios
      .get(`${reprografia_url}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((result) => {
        history.push("/services");
      })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AddService();
  }

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [])

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <LoginContainer />
          <div className="finishing">
            <form onSubmit={onSubmit}>
              <h2 id="h2" className="service-subTitle">
                Adicionar Serviço
              </h2>
              <input
                className="input-service"
                name="descricao"
                type="text"
                placeholder="descrição de capa e acabamento"
                required
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              />
              <input
                className="input-service"
                name="quantidade"
                type="number"
                placeholder="quantidade do serviço"
                required
                onChange={(e) => {
                  setQuantidade(e.target.value);
                }}
              />
              <input
                className="input-service"
                name="custo"
                type="number"
                step="any"
                placeholder="custo unitário do serviço"
                required
                onChange={(e) => {
                  setCusto(e.target.value);
                }}
              />
              <h3>{message}</h3>
              <input
                type="submit"
                className="nu-send-button"
                id="btn"
                value="Adicionar"
              />
            </form>
            <button
              className="btn-back-user"
              id="btn"
              onClick={voltar}>Voltar</button>
          </div>
        </>
      }
    </>
  );
}