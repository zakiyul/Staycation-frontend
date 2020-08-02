import React, { Component } from "react";

import propTypes from "prop-types";

import Button from "elements/Button";
import InputNumber from "elements/Form/InputNumber";
import InputDate from "elements/Form/InputDate";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
    };
  }

  updateDate = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(data.date.endDate);
      const countDuration = new Date(endDate - startDate).getDate();
      this.setState({
        data: {
          ...this.state.data,
          duration: countDuration,
        },
      });
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + +data.duration - 1)
      );
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          date: {
            ...this.state.data.date,
            endDate: endDate,
          },
        },
      });
    }
  }
  render() {
    const { data } = this.state;
    const { itemDetails, startBooking } = this.props;
    return (
      <div className="card bordered" style={{ padding: "60px  80px" }}>
        <h4 className="mb-3">Start Booking</h4>
        <h5 className="h2 text-teal mb-4">
          ${itemDetails.price}
          <span className="text-gray-500 font-weight-light">
            per {itemDetails.unit}
          </span>
        </h5>

        <label htmlFor="duration">How long will you stay? </label>
        <InputNumber
          max={30}
          sufix={" night"}
          isPlural
          onChange={this.updateDate}
          name="duration"
          value={data.duration}
        />

        <label htmlFor="date">Pick a date</label>
        <InputDate onChange={this.updateDate} name="date" value={data.date} />
        <h6
          className="text-gray-500 font-weigth-light"
          style={{ marginBottom: 40 }}
        >
          You wil pay{" "}
          <span className="text-gray-900">
            ${itemDetails.price * data.duration} USD{" "}
          </span>
          per{" "}
          <span className="text-gray-900">
            {data.duration} {data.duration > 1 ? `nights` : "night"}
          </span>
        </h6>
        <Button
          className="btn"
          type="link"
          hasShadow
          isPrimary
          isBlock
          // onClick={startBooking}
          href="/startBooking"
        >
          Continue to Book
        </Button>
      </div>
    );
  }
}

BookingForm.propTypes = {
  itemDetails: propTypes.object,
  startBooking: propTypes.func,
};
