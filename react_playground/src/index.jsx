import React from "react";
import ReactDOM from "react-dom";
import Modal from "./components/Modal";
import "./style/index.scss";

const App = () => (
    <div>
        <h1>React Component</h1>
        <Modal />
    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
