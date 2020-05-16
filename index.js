const rootElement = document.getElementById("app");

class Hello extends React.Component {
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
    return React.createElement(
      "h1",
      { className: "orange" },
      "Hello From Pluralsight and React Component " + this.state.time
    );
  }
}

ReactDOM.render(
  React.createElement(Hello, {}, null),
  document.getElementById("app")
);
