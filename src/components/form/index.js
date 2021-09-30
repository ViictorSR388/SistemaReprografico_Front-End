import React from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';

function Form() {
  return (
    <>
      <div className="containerForm">
        <div className="dateCourse">
          <div className="title-repro">
            <h1>Solicitação de reprografia</h1>
          </div>

          <div className="date">
            <label htmlFor="date-entrance">Data de solicitação:</label>
            <input type="date" name="date-entrance" id="date-entrance" />
            <label htmlFor="date-exit">Data de entrega:</label>
            <input type="date" name="date-exit" id="date-exit" />
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
            <div className="radioName">
              <label htmlFor="cai" className="radio-label">
                CAI
              </label>
              <input className="classRadio" type="radio" name="type-course" id="cai" />
            </div>
            <div className="radioName">
              <label htmlFor="ct">CT</label>
              <input className="classRadio" type="radio" name="type-course" id="ct" />
            </div>
            <div className="radioName">
              <label htmlFor="fc">FC</label>
              <input className="classRadio" type="radio" name="type-course" id="fc" />
            </div>
            <div className="radioName">
              <label htmlFor="cst">CST</label>
              <input className="cst-curso classRadio" type="radio" name="type-course" id="cst" />
            </div>
            <label className="input-pos" htmlFor="pos">
              Pós Graduação
            </label>
            <input type="text" name="pos" id="pos" />
          </div>
        </div>

        <div className="containerWrapper">
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
              <div className="radioName">
                <label className="labelName" htmlFor="attachment">
                  Grampo a cavalo(Capa 150g)
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="attachment"
                  id="attachment"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="attachment">
                  Grampo lateral(Capa 150g)
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="attachment"
                  id="attachment"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="spiral-binding">
                  Espiral de plástico(Capa 150g)
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="attachment"
                  id="attachment"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="front-cover">
                  Espiral de plástico(Capa PVC)
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="attachment"
                  id="attachment"
                />
              </div>
            </div>

            <div className="card">
              <h3 className="cardTitle">Outros detalhes</h3>
              <div className="radioName">
                <label className="labelName" htmlFor="staple">
                  Grampear
                </label>
                <input className="check classRadio" type="radio" name="staple" id="staple" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="staple">
                  Frente e verso
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="staple"
                  id="staple"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="staple">
                  Só frente
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="staple"
                  id="staple"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="staple">
                  Cortar ao meio
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="staple"
                  id="staple"
                />
              </div>
            </div>
          </section>

          <div className="wrapper">
            <div className="card medium">
              <h3 className="cardTitle">Formato e Cor</h3>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  A3 Preto e Branco
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  A4 Preto e Branco
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  A4 Colorida
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  A5 Preto e Branco
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  Reduzida Preto e Branco
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-paper">
                  Ampliada Preto e Branco
                </label>
                <input className="check classRadio" type="radio" name="type-paper" id="type-paper" />
              </div>
            </div>

            <div className="card">
              <h3 className="cardTitle">Suporte</h3>
              <div className="radioName">
                <label className="labelName" htmlFor="type-support">
                  Zipdrive
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="type-support"
                  id="type-support"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-support">
                  Papel
                </label>
                <input
                  className="check classRadio"
                  type="radio"
                  name="type-support"
                  id="type-support"
                />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-support">
                  CD
                </label>
                <input className="check classRadio" type="radio" name="type-support" id="type-support" />
              </div>
              <div className="radioName">
                <label className="labelName" htmlFor="type-support">
                  Email
                </label>
                <input className="check classRadio" type="radio" name="type-support" id="type-support" />
              </div>
              <label className="labelName" htmlFor="others">
                Outro
              </label>
              <input className="text-other" type="text" name="others" id="others" />
            </div>
          </div>

          <div className="contentButton">
            <button className="functionButton">Adicionar Item</button>
            <button className="functionButton">
              Anexar
              <FaFileImport />
            </button>
            <button className="functionButton">
              Solicitar <FaPrint />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
