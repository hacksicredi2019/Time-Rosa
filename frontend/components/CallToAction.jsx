import React from "react";
import classNames from "classnames";

export const CallToAction = ({ className, children, ...linkProps }) => (
  <a
    className={classNames(
      "block bg-brand-600 text-white text-sm font-semibold py-2 px-6 text-center rounded-full shadow focus:shadow-outline",
      className
    )}
    {...linkProps}
  >
    {children}
  </a>
);
