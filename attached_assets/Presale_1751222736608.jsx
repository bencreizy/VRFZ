import React, { useState } from "react";

const Presale = () => {
  const [wallet, setWallet] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wallet submitted:", wallet);
    alert("Wallet submitted successfully!");
    setWallet("");
  };

  return (
    <div className="page presale">
      <h2>Token Presale</h2>
      <p>Please enter your wallet address to participate:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="0x..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      <small>
        By participating you agree to the terms of the presale. Tokens will be
        distributed post-deployment.
      </small>
    </div>
  );
};

export default Presale;
