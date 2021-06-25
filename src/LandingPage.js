import React from "react";
import TransactionModal from "./TransactionModal";
import metamasklogo from "./pictures/metamask-1.svg";

const LandingPage = ({
  isWalletConnected,
  setWalletConnected,
  handleSubmit,
  ethEnabled,
  isWalletExists,
}) => {
  const handleConnectWallet = async () => {
    await ethEnabled();
  };

  return (
    <div className="landing-page-container">
      <h1 className="connect-wallet-text">Hi there! </h1>{" "}
      {!isWalletExists ? (
        <div>
          You don't have a wallet yet installed, you can install your MetaMask
          wallet <a href="https://metamask.io/">here</a>.
          <div className="logo-container">
            <img style={{ height: "80px" }} src={metamasklogo} alt="MetaMask" />
          </div>
        </div>
      ) : (
        <button onClick={handleConnectWallet}>Connect with your wallet</button>
      )}
      <TransactionModal
        isTransactionModalOpen={isWalletConnected}
        handleSubmit={handleSubmit}
        setTansactionModal={setWalletConnected}
      />
    </div>
  );
};

export default LandingPage;
