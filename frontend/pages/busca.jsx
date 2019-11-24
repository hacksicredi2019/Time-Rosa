import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { Formik } from "formik";
import { SchoolCard } from "../components/SchoolCard";
import { Collapsible } from "../components/Collapsible";
import { DescriptionRow } from "../components/DescriptionRow";
import Layout from "../components/MyLayout";
import Tag from "../icons/tag.svg";
import Explore from "../icons/explore.svg";
import Food from "../icons/food.svg";
import Accessibility from "../icons/accessibility.svg";
import api from "../services/api";

const Search = ({ schools = [], initialValues }) => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/styles.css" rel="stylesheet" />
      </Head>
      <main>
        <section className="mt-4">
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              const query = {
                ...initialValues,
                ...values
              };

              Router.push({ pathname: "/busca", query }, "", {
                shallow: false
              });
            }}
          >
            {({
              values,
              handleChange,

              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <Collapsible className="mt-2" label="Filtros">
                  <DescriptionRow
                    className="flex-col"
                    icon={<Explore />}
                    label="Tipo de escola"
                  >
                    <div className="flex px-2">
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
                      <label className="ml-4">
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
                  </DescriptionRow>
                  <DescriptionRow
                    icon={<Accessibility />}
                    label="Acessibilidade"
                  >
                    <input
                      type="checkbox"
                      name="dependencia_pne"
                      className="ml-auto mr-2 focus:shadow-outline form-checkbox my-auto border-brand-400 text-brand-600"
                      value={values["dependencia_pne"]}
                      onChange={handleChange}
                    />
                  </DescriptionRow>
                  <DescriptionRow
                    icon={<Food />}
                    label={<label htmlFor="lunch">Refeitório</label>}
                  >
                    <input
                      type="checkbox"
                      id="refeitorio"
                      name="refeitorio"
                      className="ml-auto mr-2 focus:shadow-outline form-checkbox my-auto border-brand-400 text-brand-600"
                      value={values.lunch}
                      onChange={handleChange}
                    />
                  </DescriptionRow>
                  <div className="m-2">
                    <button
                      type="submit"
                      className="block w-full bg-highlight-600 text-brand-600 text-sm font-semibold py-3 px-4 text-center rounded-lg shadow focus:shadow-outline"
                    >
                      Pesquisar
                    </button>
                  </div>
                </Collapsible>
              </form>
            )}
          </Formik>
          {schools.map(school => (
            <SchoolCard
              key={school._id}
              school={school}
              className="sm:max-w-sm"
            />
          ))}
        </section>
      </main>
    </Layout>
  );
};

Search.getInitialProps = async ({ query }) => {
  const { serie, lat, lng, ...params } = query;

  const response = await api.get(lat ? `/schools/${lat}/${lng}` : "/schools", {
    headers: {
      serie: serie || ""
    },
    params
  });

  return { schools: response.data || [], initialValues: query };
};

export default Search;
