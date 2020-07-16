import React from "react";

import Button from "../elements/Button";
import Breadcrumb from "elements/Breadcrumb";

export default function MostPicked(props) {
  const breadcrumb = [
    { pageTitle: "Home", pageHref: "" },
    { pageTitle: "House Details", pageHref: "" },
  ];
  return (
    <section className="container" ref={props.refMostPicked}>
      <h4 className="mb-3">Most Picked</h4>
      <Breadcrumb data={breadcrumb} />
      <div className="container-grid">
        {props.data.map((item, index) => {
          return (
            <div
              key={`mostPicked-${index}`}
              className={`item column-4 ${index === 0 ? "row-2" : "row-1"}`}
            >
              <div className="card border-0 card-featured">
                <div className="tag">
                  ${item.price}
                  <span className="font-weight-light">per {item.unit}</span>
                </div>
                <figure className="img-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-cover"
                  />
                </figure>
                <div className="meta-wrapper">
                  <Button
                    className="stretched-link d-block text-white"
                    type="link"
                    href={`/properties/${item._id}`}
                  >
                    <h5>{item.name}</h5>
                  </Button>
                  <span>
                    {item.city}, {item.country}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
