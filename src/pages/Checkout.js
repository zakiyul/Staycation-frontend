import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import Header from "parts/Header";
import Button from "elements/Button";
import Stepper from "elements/Stepper";

import Numbering from "elements/Stepper/Numbering";
import Meta from "elements/Stepper/Meta";
import MainContent from "elements/Stepper/MainContent";
import Controller from "elements/Stepper/Controller";

import BookingInformation from "parts/Checkout/BookingInformation";
import Payment from "parts/Checkout/Payment";
import Completed from "parts/Checkout/Completed";

import ItemDetails from "json/itemDetails.json";
import { submitBooking } from "store/actions/checkout";

class Checkout extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      proofPayment: "",
      bankName: "",
      bankHolder: "",
    },
  };

  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  componentDidMount() {
    document.title = "Staycation | Booking Page";
    window.scroll(0, 0);
  }

  _Submit = (nextStep) => {
    const { data } = this.state;
    const { checkout } = this.props;
    const payload = new FormData();
    payload.append("idItem", checkout._id);
    payload.append("duration", checkout.duration);
    payload.append("bookingStartDate", checkout.date.startDate);
    payload.append("bookingEndDate", checkout.date.endDate);
    payload.append("firstName", data.firstName);
    payload.append("lastName", data.lastName);
    payload.append("email", data.email);
    payload.append("phoneNumber", data.phone);
    payload.append("accountHolder", data.bankName);
    payload.append("bankFrom", data.bankName);
    payload.append("image", data.proofPayment[0]);
    // payload.append("bankId", checkout.bankId);

    this.props
      .submitBooking(payload)
      .then(() => nextStep())
      .catch((error) => console.log(error));
  };

  render() {
    const { data } = this.state;
    const { checkout, page } = this.props;

    if (checkout == null) {
      return (
        <div className="container">
          <div
            className="row align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}
          >
            <div className="col-3">
              Pilih kamar dulu
              <div>
                <Button
                  className="btn mt-5"
                  type="Button"
                  onClick={() => this.props.history.goBack()}
                  isLight
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const steps = {
      bookingInformation: {
        title: "Booking Information",
        description: "Please fill up the blank fields below",
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            ItemDetails={page[checkout._id]}
            onChange={this.onChange}
          />
        ),
      },
      payment: {
        title: "Payment",
        description: "Kindly follow the instruction below",
        content: (
          <Payment
            data={data}
            ItemDetails={page[checkout._id]}
            checkout={checkout}
            onChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yay! Completed",
        description: null,
        content: <Completed />,
      },
    };

    return (
      <>
        <Header isCentered />
        <Stepper steps={steps}>
          {(prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering
                data={steps}
                current={CurrentStep}
                style={{ marginBottom: 50 }}
              />

              <Meta data={steps} current={CurrentStep} />

              <MainContent data={steps} current={CurrentStep} />

              {CurrentStep === "bookingInformation" && (
                <Controller>
                  {data.firstName !== "" &&
                    data.lastName !== "" &&
                    data.email !== "" &&
                    data.phone !== "" && (
                      <Fade>
                        <Button
                          className="btn mb-3"
                          type="link"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={nextStep}
                        >
                          Continue to Book
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn"
                    isLight
                    type="link"
                    isBlock
                    href={`/properties/${ItemDetails._id}`}
                  >
                    Cancel
                  </Button>
                </Controller>
              )}
              {CurrentStep === "payment" && (
                <Controller>
                  {data.proofPayment !== "" &&
                    data.bankName !== "" &&
                    data.bankHolder !== "" && (
                      <Fade>
                        <Button
                          className="btn mb-3"
                          type="link"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={() => this._Submit(nextStep)}
                        >
                          Continue to Book
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn"
                    type="link"
                    isLight
                    isBlock
                    onClick={prevStep}
                  >
                    Cancel
                  </Button>
                </Controller>
              )}
              {CurrentStep === "completed" && (
                <Controller>
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isPrimary
                    hasShadow
                    href=""
                  >
                    Back to Home
                  </Button>
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  page: state.page,
});

export default connect(mapStateToProps, { submitBooking })(Checkout);
