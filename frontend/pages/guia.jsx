import React, { useState } from "react";
import Spinner from "react-spinkit";
import Head from "next/head";
import Router from "next/router";
import { Formik } from "formik";
import Layout from "../components/MyLayout";
import ArrowRight from "../icons/arrowRight.svg";
import { motion } from "framer-motion";
import api from "../services/api";
// import series from "../_data/series.json";

const Questions = ({ questions }) => {
  const [slide, setSlide] = useState(0);
  const [coords, setCoords] = useState({ loading: false });

  const onGetLocation = async () => {
    setCoords({ loading: true });
    const location = navigator.geolocation.getCurrentPosition(pos => {
      const newCoords = {
        loading: false,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setCoords(newCoords);
    });
  };

  const onNextSlide = () => {
    setSlide(slide => (slide >= questions.length - 1 ? slide : slide + 1));
  };

  const isLastSlide = slide === questions.length - 1;

  return (
    <Layout>
      <Head>
        <title>Escolha sua escola</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/styles.css" rel="stylesheet" />
      </Head>

      <main className="h-full w-full p-2 flex flex-col">
        <h1 className="font-semibold text-brand-600 text-base py-4 text-center">
          Responda as perguntas para descobrir a melhor escola para seu filho
        </h1>
        <Formik
          initialValues={{}}
          onSubmit={values => {
            const query = {
              ...values,
              lat: coords.lat,
              lng: coords.lng
            };

            Router.push({ pathname: "/busca", query });
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {questions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => {
                  if (index > slide) return null;
                  return (
                    <motion.div
                      key={question._id}
                      className="mt-4 w-full bg-white p-4 rounded-xl opacity-0 h-0"
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-sm">
                        <p className="font-semibold">{question.description}</p>
                        {(function() {
                          switch (question.order) {
                            case 1:
                              return (
                                <>
                                  <p className="text-sm text-gray-600">
                                    Para encontrarmos escolas perto da sua casa,
                                    por favor nos forneça a sua localização.
                                  </p>
                                  <div className="flex w-full">
                                    <button
                                      type="button"
                                      className="mt-4 flex items-center text-sm text-center bg-brand-600 text-white rounded-xl py-3 px-4 focus:shadow-outline"
                                      onClick={onGetLocation}
                                      disabled={coords.loading || coords.lat}
                                    >
                                      {coords.lat
                                        ? "Encontramos sua localização!"
                                        : "Habilitar localização"}
                                    </button>
                                    <div className="ml-2 flex items-center justify-center items-center">
                                      {coords.loading && (
                                        <Spinner
                                          name="pulse"
                                          size={16}
                                          color="red"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              );
                            // case 3:
                            //   return (
                            //     <select
                            //       name="serie"
                            //       value={values.serie}
                            //       onChange={handleChange}
                            //       className="w-full focus:shadow-outline form-select my-auto border-brand-400 text-brand-600 mt-4"
                            //     >
                            //       {series.map(s => (
                            //         <option value={s.value}>{s.name}</option>
                            //       ))}
                            //     </select>
                            //   );
                            case 5:
                              return (
                                <div className="flex flex-col py-2">
                                  <label>
                                    <input
                                      type="radio"
                                      name="type"
                                      value="publica"
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      checked={values.type === "publica"}
                                      onChange={handleChange}
                                    />
                                    <span>Pública</span>
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="type"
                                      value="privada"
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      checked={values.type === "privada"}
                                      onChange={handleChange}
                                    />
                                    <span>Privada</span>
                                  </label>
                                </div>
                              );
                            case 6:
                              return (
                                <div className="flex flex-col">
                                  <label>
                                    <input
                                      type="radio"
                                      name="dependencia_pne"
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      value="true"
                                      checked={
                                        values["dependencia_pne"] === "true"
                                      }
                                      onChange={handleChange}
                                    />
                                    <span>Sim</span>
                                  </label>

                                  <label>
                                    <input
                                      type="radio"
                                      name="dependencia_pne"
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      value="false"
                                      checked={
                                        values["dependencia_pne"] === "false"
                                      }
                                      onChange={handleChange}
                                    />
                                    <span>Não</span>
                                  </label>
                                </div>
                              );
                            case 7: {
                              return (
                                <div className="flex flex-col">
                                  <label>
                                    <input
                                      type="radio"
                                      name="alimentacao"
                                      value="true"
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      checked={values.alimentacao === "true"}
                                      onChange={handleChange}
                                    />
                                    <span>Sim</span>
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="alimentacao"
                                      value="false"
                                      checked={values.alimentacao === "false"}
                                      className="ml-auto mr-2 focus:shadow-outline form-radio my-auto border-brand-400 text-brand-600"
                                      onChange={handleChange}
                                    />
                                    <span>Não</span>
                                  </label>
                                </div>
                              );
                            }
                            default:
                              return null;
                          }
                        })()}
                      </div>
                    </motion.div>
                  );
                })}
              <button
                className="w-full bg-highlight-600 text-brand-600 flex py-3 px-4 rounded-full items-center mt-4 focus:shadow-outline"
                type={isLastSlide && values.alimentacao ? "submit" : "button"}
                disabled={isLastSlide && !values.alimentacao}
                onClick={onNextSlide}
              >
                <span className="flex-1 text-sm font-semibold">
                  {isLastSlide ? "Encontrar escolas" : "Próxima pergunta"}
                </span>
                <ArrowRight className="ml-4 text-sm" />
              </button>
            </form>
          )}
        </Formik>
      </main>
    </Layout>
  );
};

Questions.getInitialProps = async ctx => {
  const response = await api.get("/questions");
  return { questions: response.data };
};

export default Questions;
