import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Header from "parts/Header";
import PageDetailTitle from "parts/PageDetailTitle";
import FeaturedImage from "parts/FeaturedImage";
import PageDetailDescription from "parts/PageDetailDescription";
import BookingForm from "parts/BookingForm";
import Activities from "parts/Activities";
import Testimony from "parts/Testimony";
import Footer from "parts/Footer";
import Loading from "pages/Loading";

import { checkoutBooking } from "store/actions/checkout";
import { fetchPage } from "store/actions/page";

class DetailsPage extends Component {
  componentDidMount() {
    document.title = "Staycation | Details Page";
    window.scrollTo(0, 0);
    if (!this.props.page[this.props.match.params.id])
      this.props.fetchPage(
        `${process.env.REACT_APP_HOST}/api/v1/member/detail-page/${this.props.match.params.id}`,
        this.props.match.params.id
      );
  }

  render() {
    const { page, match } = this.props;
    console.log(match.params.id);

    if (!page[match.params.id]) return <Loading />;

    const breadcrumb = [
      { pageTitle: "Home", pageHref: "" },
      { pageTitle: "House Detail", pageHref: "" },
    ];
    return (
      <>
        <Header {...this.props}></Header>
        <PageDetailTitle
          breadcrumb={breadcrumb}
          data={page[match.params.id]}
        ></PageDetailTitle>
        <FeaturedImage data={page[match.params.id].imageId} />
        <Fade bottom>
          <section className="container">
            <div className="row">
              <div className="col-7 pr-5">
                <PageDetailDescription data={page[match.params.id]} />
              </div>
              <div className="col-5">
                <BookingForm
                  itemDetails={page[match.params.id]}
                  startBooking={this.props.checkoutBooking}
                />
              </div>
            </div>
          </section>
        </Fade>
        <Activities data={page[match.params.id].activityId}></Activities>
        <Fade bottom>
          <Testimony data={page[match.params.id].testimonial}></Testimony>
        </Fade>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { checkoutBooking, fetchPage })(
  DetailsPage
);
