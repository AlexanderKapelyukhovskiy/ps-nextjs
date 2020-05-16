const rootElement = document.getElementById("app");

// const myElement = document.createElement("h1");
// myElement.className = "orange";
// myElement.innerText = "Hello From Pluralsight";

// const myReactElement = React.createElement(
//   "h1",
//   { className: "orange" },
//   "Hello From Pluralsight and React"
// );

class Hello extends React.Component {
  render() {
    return React.createElement(
      "h1",
      { className: "orange" },
      "Hello From Pluralsight and React Component " + this.props.time
    );
  }
}

//rootElement.appendChild(myElement);
ReactDOM.render(
  React.createElement(Hello, { time: new Date().toLocaleDateString() }, null),
  document.getElementById("app")
);
