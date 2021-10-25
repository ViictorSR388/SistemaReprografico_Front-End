import {useState} from 'react';
import '../../styles/review.scss';
import axios from 'axios';


import Header from '../../components/header';
import Menu from '../../components/hamburgerButton';
import SideBarColaborador from '../../components/sidebarColaborador';

function Review() {

  const [review, setReview] = useState(0);
  const [observacoes, setObservacoes] = useState("");

  var avaliacao;

  if (review === "1") {
    avaliacao = 1
  } else if (review === "2") {
    avaliacao = 2
  }

  const ReviewPost = () => {
    const data = {
      avaliacao: avaliacao, //consultar o como o back está recebendo a avaliação
      observacoes: observacoes //consultar o como o back está recebendo a observação
    }
    axios.put('http://localhost:3002/avaliacao/id', data, { //consultar caminho da requisição
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((result) => {
      console.log(result);
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    ReviewPost();
  };
  
  return (
    <>
      <Menu />
      <Header />
      <SideBarColaborador />

      <div id="main-container">
        <div id="review-container">
          <div id="review-title">
            <h3>Avaliação de Reprografia</h3>
          </div>
          
          <form onSubmit={onSubmit}>
          <div id="review-content">
            <div id="feedback-radio">
              <div className="radio">
                <label for="nao-atendeu">Não Atendeu</label>
                <input
                  type="radio"
                  name="review"
                  id="nao-atendeu"
                  className="checkbox-avaliacao"
                  value="1"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setReview(newValue);
                  }}
                />
              </div>
              <div className="radio">
                <label for="superou">Atendeu</label>
                <input
                  type="radio"
                  name="review"
                  id="superou"
                  className="checkbox-avaliacao"
                  value="2"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setReview(newValue);
                  }}
                />
              </div>
            </div>

            <div id="feedback-text">
              <textarea 
                placeholder=" digite seu feedback" 
                onChange={(e) => {
                    setObservacoes(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div id="button-review">
            <button id="review-button" type="submit"> Enviar Avaliação</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Review;
