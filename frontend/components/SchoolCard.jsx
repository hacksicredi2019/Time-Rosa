import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { DescriptionRow } from "../components/DescriptionRow";
import Pin from "../icons/pin.svg";
import Phone from "../icons/phone.svg";
import Thumbsup from "../icons/thumbsup.svg";

export const SchoolCard = ({ className, children, school, ...linkProps }) => {
  return (
    <a
      href={`/escolas/${school._id}`}
      className={classNames(
        "rounded-xl mt-4 bg-white block p-2 shadow-lg focus:shadow-outline"
      )}
      {...linkProps}
    >
      <article className="rounded overflow-hidden">
        <img
          className="img-card rounded-xl"
          src="/img/school.jpg"
          alt={`Foto da escola ${school.name}`}
        ></img>
        <div className="mt-4">
          <h1 className="font-bold text-xl mx-2 text-brand-600">
            {school.name}
          </h1>

          <DescriptionRow
            hasBorder={false}
            icon={<Pin />}
            label={
              <span className="font-normal text-gray-800">
                {school.district}, {school.city}, {school.state}
              </span>
            }
          ></DescriptionRow>
          <DescriptionRow
            icon={<Phone />}
            label={
              <span className="font-normal text-gray-800">
                {school.telefone ? school.telefone : "não informado"}
              </span>
            }
          ></DescriptionRow>

          <DescriptionRow
            hasBorder={false}
            icon={<Thumbsup />}
            label={
              <label className="flex-1" htmlFor="recomendações">
                {school.likes.lenght ? school.likes : "0"} Recomendações
              </label>
            }
          ></DescriptionRow>
        </div>
      </article>
    </a>
  );
};
