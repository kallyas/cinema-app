import React from "react";
import "./style.css";

const Select = ({
  name,
  label,
  options,
  error,
  iconClass,
  valueKey = "genre",
  labelKey = "genre",
  ...rest
}) => {
  if (!options) return <></>;

  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`input-icon ${iconClass}`} />
      <select id={name} name={name} {...rest}>
        <option disabled value="">Select</option>
        {options.map((element) => (
          <option key={element._id} value={element[valueKey]}>
            {element[labelKey]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
