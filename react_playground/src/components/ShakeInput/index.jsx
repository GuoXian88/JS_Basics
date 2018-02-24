import React from "react";

const ShakeInput = () =>  <div className="form-item form-error">
    <i className="ico"></i>
    <input type="text" className="form-input" placeholder="Destination" defaultValue="Hey there!" />
    <div className="form-error-msg">This is an error message!!</div>
</div>

export default ShakeInput;