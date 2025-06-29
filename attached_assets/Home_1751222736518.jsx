import React from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import FingerprintButton from "../components/FingerprintButton";

const Home = () => {
  const handlePress = () => {
    console.log("Fingerprint button engaged.");
  };

  return (
    <div className="home-container">
      <BackgroundVideo />
      <div className="content">
        <h1>VeriFyz Protocol</h1>
        <p>Proof of Presence — Privacy First.</p>
        <FingerprintButton onClick={handlePress} />
      </div>
    </div>
  );
};

export default Home;
