import { useState } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import Web3 from "web3";
import { MIN_ABI_TRANSFER, MIN_ABI_CHECK_BALANCE } from "./constants";
import SelectWalletModal from "./SelectWalletModal";

const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  <SelectWalletModal />;
};

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  // console.log(isWalletConnected);

  const getBalance = async (tokenAddressInput, fromAddress) => {
    let contract_balance = new window.web3.eth.Contract(
      MIN_ABI_CHECK_BALANCE,
      tokenAddressInput
    );
    const balance = await contract_balance.methods
      .balanceOf(fromAddress)
      .call();
    return balance;
  };

  const handleSubmit = async (
    decimalsInput,
    amountInput,
    toAddressInput,
    tokenAddressInput
  ) => {
    const accounts = await window.web3.eth.getAccounts();
    let fromAddress = accounts[0];
    const decimals = window.web3.utils.toBN(parseInt(decimalsInput));
    const amount = window.web3.utils.toBN(parseInt(amountInput));
    console.log(amount);

    const value = amount.mul(window.web3.utils.toBN(10).pow(decimals));
    console.log(value);

    const balance = await getBalance(tokenAddressInput, fromAddress);
    const balanceBN = window.web3.utils.toBN(balance);

    // compare amount with balance
    if (amount.gt(balanceBN)) {
      console.log("not enough fund");
    } else {
      const contract = new window.web3.eth.Contract(
        MIN_ABI_TRANSFER,
        tokenAddressInput
      );

      contract.methods
        .transfer(toAddressInput, value)
        .send({ from: fromAddress });
    }
  };

  return (
    <div className="app">
      <LandingPage
        handleSubmit={handleSubmit}
        isWalletConnected={isWalletConnected}
        ethEnabled={ethEnabled}
      />
    </div>
  );
};

export default App;
