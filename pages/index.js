import React from "react";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
    };
  }

  tick() {
    this.setState(() => ({ time: new Date().toLocaleString() }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentDidUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1>Hello From Pluralsight and React Component {this.state.time}</h1>
    );
  }
}
