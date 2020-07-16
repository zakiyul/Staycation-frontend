import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import Header from "parts/Header";
import PageDetailTitle from "parts/PageDetailTitle";
import FeaturedImage from "parts/FeaturedImage";
import PageDetailDescription from "parts/PageDetailDescription";
import BookingForm from "parts/BookingForm";
import Categories from "parts/Categories";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";

import ItemDetails from "json/itemDetails.json";

export default class DetailsPage extends Component {
  componentDidMount() {
    document.title = "Details Page";
    window.scrollTo(0, 0);
  }

  render() {
    const breadcrumb = [
      { pageTitle: "Home", pageHref: "" },
      { pageTitle: "House Detail", pageHref: "" },
    ];
    return (
      <>
        <Header {...this.props}></Header>
        <PageDetailTitle
          breadcrumb={breadcrumb}
          data={ItemDetails}
        ></PageDetailTitle>
        <FeaturedImage data={ItemDetails.imageUrls} />
        <Fade bottom>
          <section className="container">
            <div className="row">
              <div className="col-7 pr-5">
                <PageDetailDescription data={ItemDetails} />
              </div>
              <div className="col-5">
                <BookingForm itemDetails={ItemDetails} />
              </div>
            </div>
          </section>
        </Fade>
        <Categories data={ItemDetails.categories}></Categories>
        <Fade bottom>
          <Testimony data={ItemDetails.testimonial}></Testimony>
        </Fade>
        <Footer />
      </>
    );
  }
}
