import metaMask from "./pictures/metamask-1.svg";
import walletconnect from "./pictures/walletconnect.png";

const SelectWalletModal = ({ closeSelectedWalletModal }) => {
  return (
    <div className="main-container">
      {" "}
      <div className="modal-container">
        <span onClick={closeSelectedWalletModal} className="close-btn">
          X
        </span>
        <h3>Choose a wallet to manage your tokens: </h3>

        <div>
          <img style={{ width: "130px " }} src={metaMask} /> <img />
          <img style={{ width: "90px " }} src={walletconnect} /> <img />
        </div>
      </div>
    </div>
  );
};

export default SelectWalletModal;
