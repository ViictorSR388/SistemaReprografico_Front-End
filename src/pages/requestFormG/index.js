import React from 'react';
import '../../styles/requestFormG.scss';
import Navbar from '../../components/sidebar';

import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';

const FormGerencia = () => {
  return (
    <>
      <Navbar />
      <div className="container-requestG">
        <h1>Solicitação de reprografia</h1>
        <div className="date">
          <label className="date-request" htmlFor="date-request">
            Data de solicitação:
          </label>
          <input type="date" name="date-request" id="date-request" />
          <label htmlFor="date-delivery">Data de entrega:</label>
          <input type="date" name="date-delivery" id="date-delivery" />
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
          <label className="course-label" htmlFor="cai">
            CAI
          </label>
          <input type="checkbox" name="cai" id="cai" />
          <label className="course-label" htmlFor="ct">
            CT
          </label>
          <input type="checkbox" name="ct" id="ct" />
          <label className="course-label" htmlFor="fc">
            FC
          </label>
          <input type="checkbox" name="fc" id="fc" />
          <label className="course-label" htmlFor="cst">
            CST
          </label>
          <input type="checkbox" name="cst" id="cst" />
          <label className="pos" htmlFor="pos">
            Pós Graduação:
          </label>
          <input type="text" name="pos" id="pos" className="input-pos" />
        </div>
        <main>
          <h3>Item</h3>
          <div className="title-repro">
            <label htmlFor="title-repo">Titulo:</label>
            <input type="text" name="title-repo" id="title-repo" />
          </div>
          <div className="item-page">
            <label htmlFor="page-request">Páginas:</label>
            <input type="text" name="page-request" id="page-request" />
            <label htmlFor="copy">Cópias:</label>
            <input type="text" name="copy" id="copy" />
            <label htmlFor="total">Total:</label>
            <input type="text" name="total" id="total" />
          </div>
          <div className="finishing">
            <h3>Acabamento</h3>
            <label htmlFor="attachment">Grampo a cavalo:</label>
            <input type="checkbox" name="attachment" id="attachment" />
            <label htmlFor="attachment-late">Grampo lateral:</label>
            <input
              type="checkbox"
              name="attachment-late"
              id="attachment-late"
            />
            <label htmlFor="spiral-binding">Cadernação com espiral:</label>
            <input type="checkbox" name="spiral-binding" id="spiral-binding" />
            <label htmlFor="front-cover">Capa PVC:</label>
            <input type="checkbox" name="front-cover" id="front-cover" />

            <label htmlFor="paper">Capa em papel 150 g/m²:</label>
            <input type="checkbox" name="paper" id="paper" />

            <h3>Outros detalhes</h3>
            <label htmlFor="staple">Grampear:</label>
            <input type="checkbox" name="staple" id="staple" />
            <label htmlFor="black-white">Preto&#38;Branco:</label>
            <input type="checkbox" name="black-white" id="black-white" />
            <label htmlFor="front-back">Frente e verso:</label>
            <input type="checkbox" name="front-back" id="front-back" />
            <label htmlFor="only-front">Só frente:</label>
            <input type="checkbox" name="only-front" id="only-front" />
            <label htmlFor="cut-half">Cortar ao meio:</label>
            <input type="checkbox" name="cut-half" id="cut-half" />

            <h3>Formato</h3>
            <label className="a3" htmlFor="a3">
              A3:
            </label>
            <input type="checkbox" name="a3" id="a3" />
            <label className="a4" htmlFor="a4">
              A4:
            </label>
            <input type="checkbox" name="a4" id="a4" />
            <label className="a5" htmlFor="a5">
              A5:
            </label>
            <input type="checkbox" name="a5" id="a5" />

            <h3>Suporte</h3>
            <label className="support" htmlFor="zipdrive">
              Zipdrive:
            </label>
            <input type="checkbox" name="zipdrive" id="zipdrive" />
            <label className="support" htmlFor="spt-paper">
              Papel:
            </label>
            <input type="checkbox" name="spt-paper" id="spt-paper" />
            <label className="support" htmlFor="cd">
              CD:
            </label>
            <input type="checkbox" name="cd" id="cd" />
            <label className="support" htmlFor="e-mail">
              Email:
            </label>
            <input type="checkbox" name="e-mail" id="e-mail" />
            <label className="support-others" htmlFor="others">
              Outro:
            </label>
            <input type="text" name="others" id="others" />

            <div className="btn-attached">
              <button className="btn">
                Anexar
                <FaFileImport />
              </button>
            </div>
          </div>
        </main>
        <div className="btns">
          <button className="btn">Adicionar Item</button>
          <button className="btn">
            Solicitar <FaPrint />
          </button>
        </div>
      </div>
    </>
  );
};

export default FormGerencia;
