import React, { useState } from "react";
import classNames from "classnames";
import Close from "../icons/close.svg";
import CaretDown from "../icons/carretDown.svg";
import { DescriptionRow } from "./DescriptionRow";

export const Collapsible = ({
  initialState = true,
  icon,
  label,
  className,
  children
}) => {
  const [isCollapsed, setCollapsed] = useState(initialState);

  const onToggle = () => setCollapsed(state => !state);

  return (
    <section
      className={classNames(
        "shadow flex bg-white rounded-xl text-brand-600 text-sm flex-col",
        className
      )}
    >
      <button
        className="flex flex-1 items-center relative focus-within:shadow-outline rounded-xl py-3"
        type="button"
        onClick={onToggle}
      >
        <h1 className="flex-1 text-center text-brand-600 font-semibold ml-10">
          {label}
        </h1>
        <div className="w-10 flex justify-center items-center text-sm rounded-r-xl breakout-button">
          <CaretDown
            style={{
              transform: `rotate(${isCollapsed ? 0 : 180}deg)`,
              transition: "transform 350ms ease"
            }}
          />
        </div>
      </button>
      <div className={classNames({ hidden: isCollapsed })}>{children}</div>
    </section>
  );
};
