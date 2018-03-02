import React from "react";
import ReactDOM from "react-dom";
import Modal from "./components/Modal";
import CityPicker from './components/CityPicker/index.jsx';
import ShakeInput from './components/ShakeInput/index.jsx';

import "./style/index.scss";

const App = () => {
    // debounce(testfn, 100)
    window.onerror = function() {
        console.log('caught by onerror')
    }
    try { throw new Error('ssssss') } catch(e) {}
    
    return (
    <div>
        <h1>React Component</h1>
        <Modal />
        <CityPicker />
        <ShakeInput />
    </div>
)};

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
