import React from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';

function Form() {
  return (
    <>
      <div className="container-f">
        <div className="dat">
          <div className="title-repro">
            <h1>Solicitação de reprografia</h1>
          </div>

          <div className="date">
            <label htmlFor="date-request">Data de solicitação:</label>
            <input type="date" name="date-request" id="entrance" />
            <label htmlFor="date-delivery">Data de entrega:</label>
            <input type="date" name="date-delivery" id="exit" />
            <label htmlFor="cost">Centro de custos:</label>
            <select>
              <option>Aprendizagem Industrial Presencial</option>
              <option>Técnico de Nível Médio Presencial</option>
              <option>Graduação Tecnológica Presencial</option>
              <option>Pós-Graduação Presencial</option>
              <option>Extensão Presencial</option>
              <option>Iniciação Profissional Presencial</option>
              <option>Qualificação Profissional Presencial</option>
              <option>Aperfeiç./Especializ. Profis. Presencial</option>
            </select>
          </div>

          <div className="course">
            <span>Curso:</span>
            <div className="lbi">
              <label className="check-container" htmlFor="cai">
                CAI
              </label>
              <input type="checkbox" name="cai" id="" />
            </div>
            <div className="lbi">
              <label htmlFor="ct">CT</label>
              <input type="checkbox" name="ct" id="" />
            </div>
            <div className="lbi">
              <label htmlFor="fc">FC</label>
              <input type="checkbox" name="fc" id="" />
            </div>
            <div className="lbi">
              <label htmlFor="cst">CST</label>
              <input className="cst-curso" type="checkbox" name="cst" id="" />
            </div>
            <label className="input-pos" htmlFor="pos">
              Pós Graduação
            </label>
            <input type="text" name="pos" id="pos" />
          </div>
        </div>

        <div className="containerForm">
          <section className="card-wrapper">
            <div className="card">
              <h3 className="cardTitle">Item</h3>
              <label htmlFor="title">Titulo</label>
              <input className="input-minor" type="text" name="title" id="" />
              <label htmlFor="page-request">Páginas</label>
              <input
                className="short"
                type="number"
                name="page-request"
                id=""
              />
              <label htmlFor="copy">Cópias</label>
              <input className="short" type="number" name="copy" id="" />
              <label htmlFor="total">Total</label>
              <input className="short" type="number" name="total" id="" />
            </div>

            <div className="card">
              <h3 className="cardTitle">Encadernação</h3>
              <div className="lbi">
                <label className="grampo" htmlFor="attachment">
                  Grampo a cavalo(Capa 150g)
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="attachment"
                  id="cavalo"
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="attachment-late">
                  Grampo lateral(Capa 150g)
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="attachment-late"
                  id="lateral"
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="spiral-binding">
                  Espiral de plástico(Capa 150g)
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="spiral-binding"
                  id="espiralC"
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="front-cover">
                  Espiral de plástico(Capa PVC)
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="front-cover"
                  id="espiralP"
                />
              </div>
            </div>

            <div className="card">
              <h3 className="cardTitle">Outros detalhes</h3>
              <div className="lbi">
                <label className="grampo" htmlFor="staple">
                  Grampear
                </label>
                <input className="check" type="checkbox" name="staple" id="" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="front-back">
                  Frente e verso
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="front-back"
                  id=""
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="only-front">
                  Só frente
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="only-front"
                  id=""
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="cut-half">
                  Cortar ao meio
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="cut-half"
                  id=""
                />
              </div>
            </div>
          </section>

          <div className="wrapper">
            <div className="card">
              <h3 className="cardTitle">Formato e Cor</h3>
              <div className="lbi">
                <label className="grampo" htmlFor="a3">
                  A3 Preto e Branco
                </label>
                <input className="check" type="checkbox" name="a3" id="a3" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="a4">
                  A4 Preto e Branco
                </label>
                <input className="check" type="checkbox" name="a4" id="a4" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="a4">
                  A4 Colorida
                </label>
                <input className="check" type="checkbox" name="a4" id="a4" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="a5">
                  A5 Preto e Branco
                </label>
                <input className="check" type="checkbox" name="a5" id="a5" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="a5">
                  Reduzida Preto e Branco
                </label>
                <input className="check" type="checkbox" name="a5" id="a5" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="a5">
                  Ampliada Preto e Branco
                </label>
                <input className="check" type="checkbox" name="a5" id="a5" />
              </div>
            </div>

            <div className="card">
              <h3 className="cardTitle">Suporte</h3>
              <div className="lbi">
                <label className="grampo" htmlFor="zipdrive">
                  Zipdrive
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="zipdrive"
                  id=""
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="spt-paper">
                  Papel
                </label>
                <input
                  className="check"
                  type="checkbox"
                  name="spt-paper"
                  id=""
                />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="cd">
                  CD
                </label>
                <input className="check" type="checkbox" name="cd" id="" />
              </div>
              <div className="lbi">
                <label className="grampo" htmlFor="e-mail">
                  Email
                </label>
                <input className="check" type="checkbox" name="e-mail" id="" />
              </div>
              <label className="grampo" htmlFor="others">
                Outro
              </label>
              <input className="titulo" type="text" name="others" id="" />
            </div>
          </div>

          <div className="botoes">
            <button className="botao">Adicionar Item</button>
            <button className="botao">
              Anexar
              <FaFileImport />
            </button>
            <button className="botao">
              Solicitar <FaPrint />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
