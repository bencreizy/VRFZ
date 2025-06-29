import React from "react";
import "./FingerprintButton.css";
import icon from "../assets/fingerprint-icon.png";

const FingerprintButton = ({ onClick }) => {
  return (
    <button className="fingerprint-button" onClick={onClick}>
      <img src={icon} alt="Fingerprint Icon" />
    </button>
  );
};

export default FingerprintButton;
