import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { Formik } from "formik";
// import { SearchBar } from "../components/SearchBar";
import { CallToAction } from "../components/CallToAction";
import { SchoolCard } from "../components/SchoolCard";
import { Collapsible } from "../components/Collapsible";
import { DescriptionRow } from "../components/DescriptionRow";
import Layout from "../components/MyLayout";
import Tag from "../icons/tag.svg";
import Accessibility from "../icons/accessibility.svg";
import Explore from "../icons/explore.svg";
import Food from "../icons/food.svg";
import api from "../services/api";
import series from "../_data/series.json";

const Home = ({ initialSchools = [] }) => {
  const [schools, setSchools] = useState(initialSchools);

  const onSubmitForm = (values, { setSubmitting }) => {
    setSubmitting(true);
    async function fetchSchools() {
      const response = await api.get("/schools", { params: {} });
      setSchools(response.data || []);
    }

    fetchSchools();
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/styles.css" rel="stylesheet" />
      </Head>
      <main>
        <section>
          <img src="/img/illustration.svg" alt="" role="presentation" />
          <h1 className="text-brand-600 px-10 font-semibold text-center  my-4">
            Responda as perguntas e descubra a escola mais indicada
          </h1>
          <CallToAction href="/guia" className="mt-2">
            Descubra a escola certa
          </CallToAction>
        </section>

        <section className="mt-4">
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

Home.getInitialProps = async ctx => {
  const response = await api.get("/schools", {});

  return { initialSchools: response.data || [] };
};

export default Home;
