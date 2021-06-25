import { useState } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import Web3 from "web3";
import { MIN_ABI_TRANSFER, MIN_ABI_CHECK_BALANCE } from "./constants";

const App = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);

  console.log(isWalletConnected);

  // check if there is a wallet already
  const isWalletExists = () => {
    if (window.ethereum) {
      return true;
    } else {
      return false;
    }
  };

  const ethEnabled = async () => {
    if (isWalletExists()) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.web3 = new Web3(window.ethereum);
        setWalletConnected(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

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

    const value = amount.mul(window.web3.utils.toBN(10).pow(decimals));

    const balance = await getBalance(tokenAddressInput, fromAddress);
    const balanceBN = window.web3.utils.toBN(balance);

    // compare amount with balance
    if (amount.gt(balanceBN)) {
      alert("You don't have enough ETH  in your wallet to send");
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
        isWalletExists={isWalletExists}
        handleSubmit={handleSubmit}
        isWalletConnected={isWalletConnected}
        setWalletConnected={setWalletConnected}
        ethEnabled={ethEnabled}
      />
    </div>
  );
};

export default App;
