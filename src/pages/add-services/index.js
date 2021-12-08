import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import '../../styles/addService.scss';
import LoginContainer from '../../components/loginContainer';

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
    axios.post(`${reprografia_url}/service/type=${type}`, data, {
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

  const onSubmit = (e) => {
    e.preventDefault();
    AddService();
  }


  return (
    <>
      <LoginContainer />
      <div className="finishing">
        <form onSubmit={onSubmit}>
          <h2 id="" className="service-subTitle">
            Adicionar Serviço
          </h2>
          <h4>Onde houver "*" o preenchimento é obrigatório</h4>
          <label>*
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
          </label>
          <label>*
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
          </label>
          <label>*
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
          </label>
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
          onClick={() => { history.push("/services") }}>Voltar</button>
      </div>
    </>
  );
}