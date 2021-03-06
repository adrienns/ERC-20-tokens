import { useState } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import Web3 from "web3";
import { MIN_ABI_TRANSFER, MIN_ABI_CHECK_BALANCE } from "./constants";

const App = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);

  // check if there is a wallet already
  const doesWalletExists = () => {
    if (window.ethereum) {
      return true;
    } else {
      return false;
    }
  };

  const ethEnabled = async () => {
    if (doesWalletExists()) {
      try {
        // connect to MetaMask account. pop-up UI that
        // asks the user’s permission to connect the dApp to MetaMask
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // create a window.web3 object with our own version of web3
        window.web3 = new Web3(window.ethereum);
        setWalletConnected(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getBalance = async (tokenAddressInput, fromAddress) => {
    let contractBalance = new window.web3.eth.Contract(
      MIN_ABI_CHECK_BALANCE,
      tokenAddressInput
    );
    const balance = await contractBalance.methods.balanceOf(fromAddress).call();
    return balance;
  };

  const handleSubmit = async (
    decimalsInput,
    amountInput,
    toAddressInput,
    tokenAddressInput
  ) => {
    //get wallet address
    const accounts = await window.web3.eth.getAccounts();
    let fromAddress = accounts[0];
    //convert the value into a BN.js instance
    const decimals = window.web3.utils.toBN(parseInt(decimalsInput));
    const amount = window.web3.utils.toBN(parseInt(amountInput));

    // value = amount * 10 ^ decimals
    const value = amount.mul(window.web3.utils.toBN(10).pow(decimals));

    const balance = await getBalance(tokenAddressInput, fromAddress);
    const balanceBN = window.web3.utils.toBN(balance);

    // compare amount with balance
    if (amount.gt(balanceBN)) {
      alert("You don't have enough fund in your wallet to send");
    } else {
      const contractTransfer = new window.web3.eth.Contract(
        MIN_ABI_TRANSFER,
        tokenAddressInput
      );

      contractTransfer.methods
        .transfer(toAddressInput, value)
        .send({ from: fromAddress });
    }
  };

  return (
    <div className="app">
      <LandingPage
        doesWalletExists={doesWalletExists}
        handleSubmit={handleSubmit}
        isWalletConnected={isWalletConnected}
        setWalletConnected={setWalletConnected}
        ethEnabled={ethEnabled}
      />
    </div>
  );
};

export default App;
