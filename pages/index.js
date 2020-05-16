import React from "react";
import DigitalClock from "../src/DigitalClock";

export default class Index extends React.Component {
  static async getInitialProps() {
    return {
      time: new Date().toISOString(),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
    };
  }

  tick() {
    this.setState(() => ({ time: new Date().toLocaleString() }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <DigitalClock time={this.state.time} />;
  }
}
