import React, { useState } from 'react';
import { FaFileImport } from 'react-icons/fa';
import { FaPrint } from 'react-icons/fa';
import './styles.scss';
import axios from 'axios';

function Form() {
  //cursos
  const [ctds, setCtds] = useState(0);
  const [ctmp, setCtmp] = useState(0);
  const [cstmp, setCstmp] = useState(0);
  const [graduacao, setGraduacao] = useState(0);
  const [posObservacao, setPosObservacao] = useState('');

  var curso;

  if (ctds == 1) {
    curso = 1;
    posObservacao = "";
  } else if (ctmp == 1) {
    curso = 2;
    posObservacao = "";
  } else if (cstmp == 1) {
    curso = 3;
    posObservacao = "";
  } else if (graduacao == 1) {
    curso = 4;
    posObservacao = posObservacao
  }

  //centro de custos
  const [cc, setCc] = useState("");

  var centro_custos;

  if (cc == "AIP") {
    centro_custos = 1;
  } else if (cc == "GTP") {
    centro_custos = 2;
  } else if (cc == "PGP") {
    centro_custos = 3;
  } else if (cc == "EP") {
    centro_custos = 4;
  } else if (cc == "IPP") {
    centro_custos = 5;
  } else if (cc == "QPP") {
    centro_custos = 6;
  } else if (cc == "AEPP") {
    centro_custos = 7;
  }

  //card item
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [copy, setCopy] = useState('');

  //card encardenação
  const [gcCapaPapel, setGcCapaPapel] = useState(0);
  const [glCapaPapel, setGlCapaPapel] = useState(0);
  const [epCapa150g, setEpCapa150g] = useState(0);
  const [epCapaPVC, setEpCapaPVC] = useState(0);

  var acabamento;
  var capa;

  if (gcCapaPapel == 1) {
    acabamento = 1;
    capa = 1;
  } else if (glCapaPapel == 1) {
    acabamento = 2;
    capa = 1;
  } else if (epCapa150g == 1) {
    acabamento = 3;
    capa = 1;
  } else if (epCapaPVC == 1) {
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
  const [a3pb, setA3pb] = useState(0);
  const [a4pb, setA4pb] = useState(0);
  const [a4c, setA4c] = useState(0);
  const [a5pb, setA5pb] = useState(0);
  const [redpb, setRedpb] = useState(0);
  const [amppb, setAmppb] = useState(0);

  var formato;
  var cor;

  if (a3pb == 1) {
    formato = 1;
    cor = 1;
  } else if (a4pb == 1) {
    formato = 2;
    cor = 1;
  } else if (a4c == 1) {
    formato = 2;
    cor = 2;
  } else if (a5pb == 1) {
    formato = 3;
    cor = 1;
  } else if (redpb == 1) {
    formato = 4;
    cor = 1;
  } else if (amppb == 1) {
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
  const [digital, setDigital] = useState(0);
  const [presencial, setPresencial] = useState(0);
  const [observacao, setObservacao] = useState("");

  var modo_envio;

  if (digital == 1) {
    modo_envio = 1;
    observacao = ""
  } else if (presencial == 1) {
    modo_envio = 2;
    observacao = observacao
  } 

  var total = pages * copy;

  const FormPost = () => {
    const data = {
      curso: curso,

      // centro de custos

      titulo_pedido: title,
      num_paginas: pages,
      num_copias: copy,

      acabamento: acabamento,
      tipos_capa: capa,

      // outros detalhes

      tamanho_pagina: formato,
      tipos_copia: cor,

      // suporte

      modo_envio: modo_envio
    };
    axios.post('http://localhost:3002/pedido', data);
  };

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
                name="type-course"
                id="ctds"
                value="ctds"
                checked={ctds === 1}
                onChange={(e) => {
                  setCtds(e.target.value);
                }}
              />
            </div>
            <div className="radioName">
              <label htmlFor="ct">CT-MP</label>
              <input
                className="classRadio"
                type="radio"
                name="type-course"
                id="ctmp"
                value="ctmp"
                checked={ctmp === 2}
                onChange={(e) => {
                  setCtmp(e.target.value);
                }}
              />
            </div>
            <div className="radioName">
              <label htmlFor="fc">CST-MP</label>
              <input
                className="classRadio"
                type="radio"
                name="type-course"
                id="cstmp"
                value="cstmp"
                checked={cstmp === 3}
                onChange={(e) => {
                  setCstmp(e.target.value);
                }}
              />
            </div>
            <label className="input-pos" htmlFor="pos">
              Pós Graduação
            </label>
            <input
              type="radio"
              name="graduacao"
              id="graduacao"
              value="graduacao"
              checked={graduacao === 3}
              onChange={(e) => {
                setGraduacao(e.target.value);
              }}
            />
            <input type="text" name="graduacao" id="posObservacao" 
              onChange={(e) => { setPosObservacao(e.target.value); }} 
              />

            <label htmlFor="cost">Centro de custos:</label>
            <select className="select" id="cc" name="cc" onChange={(e) => { setCc(e.target.value); }} >
              <option value="AIP" name="AIP" id="AIP">Aprendizagem Industrial Presencial</option>
              <option value="GTP" name="GTP" id="GTP">Graduação Tecnológica Presencial</option>
              <option value="PGP" name="PGP" id="PGP">Pós-Graduação Presencial</option>
              <option value="EP" name="EP" id="EP">Extensão Presencial</option>
              <option value="IPP" name="IPP" id="IPP">Iniciação Profissional Presencial</option>
              <option value="QPP" name="QPP" id="QPP">Qualificação Profissional Presencial</option>
              <option value="AEPP" name="AEPP" id="AEPP">Aperfeiç./Especializ. Profis. Presencial</option>
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
              <label htmlFor="total">Total</label>
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
                  value="gcCapaPapel"
                  checked={gcCapaPapel === 1}
                  onChange={(e) => {
                    setGcCapaPapel(e.target.value);
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
                  value="glCapaPapel"
                  checked={glCapaPapel === 1}
                  onChange={(e) => {
                    setGlCapaPapel(e.target.value);
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
                  value="epCapa150g"
                  checked={epCapa150g === 1}
                  onChange={(e) => {
                    setEpCapa150g(e.target.value);
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
                  value="epCapaPVC"
                  checked={epCapaPVC === 1}
                  onChange={(e) => {
                    setEpCapaPVC(e.target.value);
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
                  name="type-paper"
                  id="a3pb"
                  value="a3pb"
                  checked={a3pb === 1}
                  onChange={(e) => {
                    setA3pb(e.target.value);
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
                  name="type-paper"
                  id="a4pb"
                  value="a4pb"
                  checked={a4pb === 1}
                  onChange={(e) => {
                    setA4pb(e.target.value);
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
                  name="type-paper"
                  id="a4c"
                  value="a4c"
                  checked={a4c === 1}
                  onChange={(e) => {
                    setA4c(e.target.value);
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
                  name="type-paper"
                  id="a5pb"
                  value="a5pb"
                  checked={a5pb === 1}
                  onChange={(e) => {
                    setA5pb(e.target.value);
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
                  name="type-paper"
                  id="redpb"
                  value="redpb"
                  checked={redpb === 1}
                  onChange={(e) => {
                    setRedpb(e.target.value);
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
                  name="type-paper"
                  id="amppb"
                  value="amppb"
                  checked={amppb === 1}
                  onChange={(e) => {
                    setAmppb(e.target.value);
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
                  name="type-paper"
                  id="digital"
                  value="digital"
                  checked={digital === 1}
                  onChange={(e) => {
                    setDigital(e.target.value);
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
                  name="type-paper"
                  id="presencial"
                  value="presencial"
                  checked={presencial === 1}
                  onChange={(e) => {
                    setPresencial(e.target.value);
                  }}
                />
                <textarea className="observation" id="observacoes" className="observacoes" 
                  onChange={(e) => {
                    setPosObservacao(e.target.value);
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
            <button className="functionButton">
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
