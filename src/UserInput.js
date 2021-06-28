import React, { useState } from "react";
import "./UserInput.css";

const UserInput = ({ handleSubmit, setTransactionModal }) => {
  const [tokenAddressInput, setTokenAddressInput] = useState("");
  const [toAddressInput, setToAddressInput] = useState("");

  // const [tokenAddressInput, setTokenAddressInput] = useState(
  //   "0x2A65D41dbC6E8925bD9253abfAdaFab98eA53E34"
  // );
  // const [toAddressInput, setToAddressInput] = useState(
  //   "0x8Df70546681657D6FFE227aB51662e5b6e831B7A"
  // );

  const [decimalsInput, setDecimalsInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

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
          required
          value={tokenAddressInput}
          className="input"
          type="text"
          onChange={(e) => setTokenAddressInput(e.target.value)}
        />
      </div>
      <div className="input-element">
        <label className="label">Recipients Address </label>
        <input
          required
          value={toAddressInput}
          className="input"
          type="text"
          onChange={(e) => setToAddressInput(e.target.value)}
        />
      </div>

      <div className="input-element">
        <label className="label">Decimals </label>
        <input
          required
          value={decimalsInput}
          className="input"
          type="text"
          onChange={(e) => setDecimalsInput(e.target.value)}
        />
      </div>

      <div className="input-element">
        <label className="label">Amount </label>
        <input
          required
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
