import React, { useState } from "react";
import TransactionModal from "./TransactionModal";
import SelectWalletModal from "./SelectWalletModal";

const LandingPage = ({ isWalletConnected, handleSubmit, ethEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedWalletModalOpen, setSelectedWalletModal] = useState(false);

  const handleConnectWallet = async () => {
    await ethEnabled();
    setIsOpen(true);
  };

  const handleSelectWallet = () => {
    setSelectedWalletModal(true);
  };

  const closeSelectedWalletModal = () => {
    setSelectedWalletModal(false);
  };
  return (
    <div className="landing-page-container">
      <h1 className="connect-wallet-text">
        Connect to your wallet or select a wallet if you don't have any yet
      </h1>{" "}
      <button onClick={handleConnectWallet}>Connect with your Wallet</button>
      <button onClick={handleSelectWallet}>Choose your wallet</button>
      <TransactionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
      />
      {isSelectedWalletModalOpen ? (
        <SelectWalletModal
          closeSelectedWalletModal={closeSelectedWalletModal}
        />
      ) : null}
    </div>
  );
};

export default LandingPage;
