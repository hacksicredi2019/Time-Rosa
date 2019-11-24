import React from "react";
import classNames from "classnames";

export const DescriptionRow = ({
  hasBorder = true,
  icon,
  label,
  className,
  children
}) => {
  return (
    <>
      <div
        className={classNames(
          `flex flex-1 py-2 mx-2 border-red-200`,
          className,
          { "border-b": hasBorder }
        )}
      >
        <div className="flex text-brand-600 items-center py-2 text-sm font-semibold">
          <div className="ml-2">{icon}</div>
          <span className="ml-4 mr-8 flex flex-1">{label}</span>
        </div>
        {children}
      </div>
    </>
  );
};
