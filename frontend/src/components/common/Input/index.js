import React from "react";
import "./style.css";

const Input = ({ name, label, error, iconClass, type = "text", ...rest }) => (
  <div className="input-container">
    {label && <label htmlFor={name}>{label}</label>}
    {iconClass && <div className={`input-icon ${iconClass}`} />}
    {type === "textarea" ? (
      <textarea id={name} name={name} {...rest} />
    ) : (
      <input id={name} name={name} type={type} {...rest} />
    )}
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default Input;
