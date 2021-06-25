import React, { useState } from "react";
import "./UserInput.css";

const UserInput = ({ handleSubmit, setTransactionModal }) => {
  const [tokenAddressInput, setTokenAddressInput] = useState("");
  const [toAddressInput, setToAddressInput] = useState("");

  const [decimalsInput, setDecimalsInput] = useState(18);
  const [amountInput, setAmountInput] = useState(100);

  const closeTansactionModal = () => {
    setTransactionModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(decimalsInput, amountInput, toAddressInput, tokenAddressInput);
  };

  return (
    <form className="modal-container" onSubmit={onSubmit}>
      <div onClick={closeTansactionModal}>
        <span className="close-btn">X</span>
      </div>
      <div className="app-name"> Send ERC20 Token Balance</div>
      <div className="input-element">
        <label className="label">Token Address </label>
        <input
          value={tokenAddressInput}
          className="input"
          type="text"
          onChange={(e) => setTokenAddressInput(e.target.value)}
        />
      </div>
      <div className="input-element">
        <label className="label">Recipients Address </label>
        <input
          value={toAddressInput}
          className="input"
          type="text"
          onChange={(e) => setToAddressInput(e.target.value)}
        />
      </div>

      <div className="input-element">
        <label className="label">Decimals </label>
        <input
          value={decimalsInput}
          className="input"
          type="text"
          onChange={(e) => setDecimalsInput(e.target.value)}
        />
      </div>

      <div className="input-element">
        <label className="label">Amount </label>
        <input
          className="input"
          type="text"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
        />
      </div>
      <div className="input-element">
        <button id="send-token-btn">send ERC-20 Token</button>
      </div>
    </form>
  );
};

export default UserInput;
