import React, { useState } from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';
import axios from 'axios';

function Form() {
  //cursos
  const [course, setCourse] = useState(0);
  const [posGraduacao, setPosGraduacao] = useState('');

  var curso;
  var detalheGraduacao;

  if (course == "1") {
    curso = 1;
    detalheGraduacao = '';
  } else if (course == "1") {
    curso = 2;
    detalheGraduacao = '';
  } else if (course == "1") {
    curso = 3;
    detalheGraduacao = '';
  } else if (course == "1") {
    curso = 4;
    detalheGraduacao = posGraduacao;
  }

  // centro de custos
  const [cc, setCc] = useState('');

  var centro_custos;

  if (cc === 'AIP') {
    centro_custos = 1;
  } else if (cc === 'GTP') {
    centro_custos = 2;
  } else if (cc === 'PGP') {
    centro_custos = 3;
  } else if (cc === 'EP') {
    centro_custos = 4;
  } else if (cc === 'IPP') {
    centro_custos = 5;
  } else if (cc === 'QPP') {
    centro_custos = 6;
  } else if (cc === 'AEPP') {
    centro_custos = 7;
  }

  // function enableText() {
  //   document.getElementById('graduacao').value = 'on';
  //   let value = (document.getElementById('graduacao').value = 'on');
  //   if (value === 'on') {
  //     document.getElementById('posObservacao').disabled = false;
  //   }
  // }

  // function disableText() {
  //   document.getElementById('graduacao').value = 'off';
  //   let value = document.getElementById('graduacao').value = 'off';
  //   if (value === 'off') {
  //     document.getElementById('posObservacao').disabled = true;
  //   }
  // }

  //card item
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [copy, setCopy] = useState('');

  //card encardenação
  const [attachment, setAttachment] = useState(0);

  var acabamento;
  var capa;

  if (attachment === 1) {
    acabamento = 1;
    capa = 1;
  } else if (attachment === 2) {
    acabamento = 2;
    capa = 1;
  } else if (attachment === 3) {
    acabamento = 3;
    capa = 1;
  } else if (attachment === 4) {
    acabamento = 3;
    capa = 2;
  }

  //card outros detalhes
  // const [grampear, setGrampear] = useState(0);
  // const [frenteVerso, setFrenteVerso] = useState(0);
  // const [frente, setFrente] = useState(0);
  // const [cortar, setCortar] = useState(0);

  // var detalhes;

  // if (grampear == 1) {
  //   detalhes = 1
  // } else if (frenteVerso == 1) {
  //   detalhes = 2
  // } else if (frente == 1) {
  //   detalhes = 3
  // } else if (cortar == 1) {
  //   detalhes = 4
  // }

  //card formato e cor
  const [typePaper, setTypePaper] = useState(0);

  var formato;
  var cor;

  if (typePaper === 1) {
    formato = 1;
    cor = 1;
  } else if (typePaper === 2) {
    formato = 2;
    cor = 1;
  } else if (typePaper === 3) {
    formato = 2;
    cor = 2;
  } else if (typePaper === 4) {
    formato = 3;
    cor = 1;
  } else if (typePaper === 5) {
    formato = 4;
    cor = 1;
  } else if (typePaper === 6) {
    formato = 5;
    cor = 1;
  }

  //card suporte
  // const [zipDrive, setZipDrive] = useState(0);
  // const [papel, setPapel] = useState(0);
  // const [cd, setCd] = useState(0);
  // const [email, setEmail] = useState(0);
  // const [outros, setOutros] = useState(0);
  // const [outrosObservacao, setOutrosObservacao] = useState("");

  // var suporte;

  // if (zipDrive == 1) {
  //   suporte = 1
  // } else if (papel == 1) {
  //   suporte = 2
  // } else if (cd == 1) {
  //   suporte = 3
  // } else if (email == 1) {
  //   suporte = 4
  // } else if (outros == 1) {
  //   suporte = 5
  // }

  // modo de envio
  const [typeSend, setTypeSend] = useState(0);
  const [observacao, setObservacao] = useState('');

  var modo_envio;
  var observacao_envio;

  if (typeSend === 1) {
    modo_envio = 1;
    observacao_envio = '';
  } else if (typeSend === 2) {
    modo_envio = 2;
    observacao_envio = observacao;
  }

  var total = pages * copy;

  const FormPost = () => {
    const data = {
      curso: curso,
      // detalheGraduacao,

      centro_custos: centro_custos,

      titulo_pedido: title,
      num_paginas: pages,
      num_copias: copy,

      acabamento: acabamento,
      tipos_capa: capa,

      // outros detalhes

      tamanho_pagina: formato,
      tipos_copia: cor,

      // suporte

      modo_envio: modo_envio,
      observacoes: observacao_envio,
    };
    axios.post('http://localhost:3002/pedido', data, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    FormPost();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="containerForm">
          <div className="dateCourse">
            <div className="title-repro">
              <h1>Solicitação de reprografia</h1>
            </div>
            <div className="course">
              <span>Curso:</span>
              <div className="radioName">
                <label htmlFor="cai" className="radio-label">
                  CT-DS
                </label>
                <input
                  className="classRadio"
                  type="radio"
                  name="course"
                  id="curso"
                  // value="1"
                  // checked={ctds === 1}
                  // onClick={disableText()}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              <div className="radioName">
                <label htmlFor="ct">CT-MP</label>
                <input
                  className="classRadio"
                  type="radio"
                  name="course"
                  id="curso"
                  // value="2"
                  // checked={ctmp === 1}
                  // onClick={disableText()}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              <div className="radioName">
                <label htmlFor="fc">CST-MP</label>
                <input
                  className="classRadio"
                  type="radio"
                  name="course"
                  id="curso"
                  // value="3"
                  // checked={cstmp === 1}
                  // onClick={disableText()}
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                />
              </div>
              <label className="input-pos" htmlFor="pos">
                Pós Graduação
              </label>
              <input
                className="classRadio"
                type="radio"
                name="course"
                id="graduacao"
                // value="4"
                // checked={graduacao === 1}
                // onClick={enableText()}
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
              />
              <input
                type="text"
                disabled={true}
                name="posGraduacao"
                id="posGraduacao"
                onChange={(e) => {
                  setPosGraduacao(e.target.value);
                }}
              />

              <label htmlFor="cost">Centro de custos:</label>
              <select
                className="select"
                id="cc"
                name="cc"
                onChange={(e) => {
                  setCc(e.target.value);
                }}
              >
                <option value="AIP" name="AIP" id="AIP">
                  Aprendizagem Industrial Presencial
                </option>
                <option value="GTP" name="GTP" id="GTP">
                  Graduação Tecnológica Presencial
                </option>
                <option value="PGP" name="PGP" id="PGP">
                  Pós-Graduação Presencial
                </option>
                <option value="EP" name="EP" id="EP">
                  Extensão Presencial
                </option>
                <option value="IPP" name="IPP" id="IPP">
                  Iniciação Profissional Presencial
                </option>
                <option value="QPP" name="QPP" id="QPP">
                  Qualificação Profissional Presencial
                </option>
                <option value="AEPP" name="AEPP" id="AEPP">
                  Aperfeiç./Especializ. Profis. Presencial
                </option>
              </select>
            </div>
          </div>

          <div className="containerWrapper">
            <section className="card-wrapper">
              <div className="card">
                <h3 className="cardTitle">Item</h3>
                <label htmlFor="title">Titulo</label>
                <input
                  className="input-minor"
                  type="text"
                  name="title"
                  id=""
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label htmlFor="page-request">Páginas</label>
                <input
                  className="short"
                  type="number"
                  name="pages"
                  id=""
                  onChange={(e) => {
                    setPages(e.target.value);
                  }}
                />
                <label htmlFor="copy">Cópias</label>
                <input
                  className="short"
                  type="number"
                  name="copy"
                  id=""
                  onChange={(e) => {
                    setCopy(e.target.value);
                  }}
                />
                <label htmlFor="total">Total de Paginas</label>
                <span className="total-pages" name="total">
                  {total}
                </span>
              </div>

              <div className="card">
                <h3 className="cardTitle">Encadernação</h3>
                <div className="radioName">
                  <label className="labelName" htmlFor="attachment">
                    Capa em Papel 150g - 2 Grampos a Cavalo
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="attachment"
                    id="gcCapaPapel"
                    value="1"
                    // checked={gcCapaPapel === 1}
                    onChange={(e) => {
                      setAttachment(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="attachment">
                    Capa em Papel 150g - 2 Grampo Laterais
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="attachment"
                    id="glCapaPapel"
                    value="1"
                    // checked={glCapaPapel === 1}
                    onChange={(e) => {
                      setAttachment(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="spiral-binding">
                    Capa em Papel 150g - Espiral de Plástico
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="attachment"
                    id="epCapa150g"
                    value="1"
                    // checked={epCapa150g === 1}
                    onChange={(e) => {
                      setAttachment(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="front-cover">
                    Capa em PVC - Espiral de Plástico
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="attachment"
                    id="epCapaPVC"
                    value="1"
                    // checked={epCapaPVC === 1}
                    onChange={(e) => {
                      setAttachment(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* <div className="card">
            <h3 className="cardTitle">Outros detalhes</h3>
            <div className="radioName">
              <label className="labelName" htmlFor="staple">
                Grampear
                </label>
                <input className="check classRadio" 
                type="radio" 
              name="staple" 
              id="grampear"
              value="grampear"
              checked={grampear === 1}
              onChange={(e) => {
                setGrampear(e.target.value);
              }}
              />
              </div>
              <div className="radioName">
              <label className="labelName" htmlFor="staple">
                Frente e verso
                </label>
                <input
                className="check classRadio"
                type="radio"
                name="staple"
                id="frenteVerso"
                value="frenteVerso"
                checked={frenteVerso === 1}
                onChange={(e) => {
                  setFrenteVerso(e.target.value);
                }}
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
                id="frente"
                value="frente"
                checked={frente === 1}
                onChange={(e) => {
                  setFrente(e.target.value);
                }}
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
                id="cortar"
                value="cortar"
                checked={cortar === 1}
                onChange={(e) => {
                  setCortar(e.target.value);
                }}
              />
              </div>
          </div> */}
            </section>

            <div className="wrapper">
              <div className="card medium">
                <h3 className="cardTitle">Formato e Cor</h3>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    A3 Preto e Branco
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="a3pb"
                    value="1"
                    // checked={a3pb === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    A4 Preto e Branco
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="a4pb"
                    value="1"
                    // checked={a4pb === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    A4 Colorida
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="a4c"
                    value="1"
                    // checked={a4c === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    A5 Preto e Branco
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="a5pb"
                    value="1"
                    // checked={a5pb === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    Reduzida Preto e Branco
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="redpb"
                    value="1"
                    // checked={redpb === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    Ampliada Preto e Branco
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typePaper"
                    id="amppb"
                    value="1"
                    // checked={amppb === 1}
                    onChange={(e) => {
                      setTypePaper(e.target.value);
                    }}
                  />
                </div>
              </div>

              {/* <div className="card">
            <h3 className="cardTitle">Suporte</h3>
            <div className="radioName">
              <label className="labelName" htmlFor="type-support">
                Zipdrive
              </label>
              <input
                className="check classRadio"
                type="radio"
                name="type-support"
                id="zipDrive"
                value="zipDrive"
                checked={zipDrive === 1}
                // onChange={(e) => {
                //   setZipDrive(e.target.value);
                // }}
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
                id="papel"
                value="papel"
                checked={papel === 1}
                // onChange={(e) => {
                //   setPapel(e.target.value);
                // }}
              />
            </div>
            <div className="radioName">
              <label className="labelName" htmlFor="type-support">
                CD
              </label>
              <input className="check classRadio"
                type="radio"
                name="type-support"
                id="cd"
                value="cd"
                checked={cd === 1}
                // onChange={(e) => {
                //   setCd(e.target.value);
                // }}
              />
            </div>
            <div className="radioName">
              <label className="labelName" htmlFor="type-support">
                Email
              </label>
              <input className="check classRadio"
                type="radio"
                name="type-support"
                id="email"
                value="email"
                checked={email === 1}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
            </div>
            <div className="radioName">
              <label className="labelName" htmlFor="others">
                Outro
              </label>
              <input className="check classRadio"
                type="radio"
                name="type-support"
                id="outros"
                value="outros"
                checked={outros === 1}
                // onChange={(e) => {
                //   setOutros(e.target.value);
                // }}
              />
            </div>
            <input className="text-other"
              type="text"
              name="others"
              id="outrosObservacao"
              // onChange={(e) => {
              //   setOutrosObservacao(e.target.value);
              // }}
            />
          </div> */}

              <div className="card">
                <h3 className="cardTitle">Modo de envio</h3>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    Envio digital
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typeSend"
                    id="digital"
                    value="1"
                    // checked={digital === 1}
                    onChange={(e) => {
                      setTypeSend(e.target.value);
                    }}
                  />
                </div>
                <div className="radioName">
                  <label className="labelName" htmlFor="type-paper">
                    Envio presencial
                  </label>
                  <input
                    className="check classRadio"
                    type="radio"
                    name="typeSend"
                    id="presencial"
                    value="2"
                    // checked={presencial === 1}
                    onChange={(e) => {
                      setTypeSend(e.target.value);
                    }}
                  />
                  <textarea
                    className="observation"
                    disabled={true}
                    id="observacoes"
                    name="observacoes"
                    onChange={(e) => {
                      setObservacao(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="contentButton">
              <button className="functionButton">Adicionar Item</button>
              <button className="functionButton">
                Anexar
                <FaFileImport />
              </button>
              <button className="functionButton" type="submit">
                Solicitar <FaPrint />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;