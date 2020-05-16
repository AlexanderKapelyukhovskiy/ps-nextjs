const rootElement = document.getElementById("app");

// const myElement = document.createElement("h1");
// myElement.className = "orange";
// myElement.innerText = "Hello From Pluralsight";

// const myReactElement = React.createElement(
//   "h1",
//   { className: "orange" },
//   "Hello From Pluralsight and React"
// );

const Hello = function (props) {
  return React.createElement(
    "h1",
    { className: "orange" },
    "Hello From Pluralsight and React Component " + props.time
  );
};

//rootElement.appendChild(myElement);
ReactDOM.render(
  React.createElement(Hello, { time: new Date().toLocaleDateString() }, null),
  document.getElementById("app")
);
