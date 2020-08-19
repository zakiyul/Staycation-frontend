import React from "react";
import ReactHtmlParser from "react-html-parser";

export default function PageDetailDescription({ data }) {
  return (
    <main>
      <h4>About the place</h4>
      {ReactHtmlParser(data.description)}
      <div className="row" style={{ marginTop: 30 }}>
        {data.featureId.map((feature, index) => {
          return (
            <div
              key={`feature-${index}`}
              style={{ marginBottom: 20 }}
              className="col-3"
            >
              <img
                src={`${process.env.REACT_APP_HOST}/${feature.imageUrl}`}
                style={{ width: 28 }}
                alt={feature.name}
                className="d-block mb-2"
              />
              <span>{feature.qty} </span>
              <span className="text-gray-500 font-weight-light">
                {feature.name}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
