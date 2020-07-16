import React from "react";

import propTypes from "prop-types";
import Button from "elements/Button";

export default function Breadcrumb({ data, className }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className={className}>
        {data.map((item, index) => {
          return (
            <li
              key={`breadcrumb-${index}`}
              className={`breadcrumb-item${
                index === data.length - 1 ? " active" : ""
              }`}
            >
              {index === data.length - 1 ? (
                item.pageTitle
              ) : (
                <Button type="link" href={item.pageHref}>
                  {item.pageTitle}
                </Button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: propTypes.array,
  className: propTypes.string,
};
