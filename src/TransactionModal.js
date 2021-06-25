import React from "react";
import UserInput from "./UserInput";

const TransactionModal = ({
  isTransactionModalOpen,
  handleSubmit,
  setTransactionModal,
}) => {
  return (
    <React.Fragment>
      {isTransactionModalOpen ? (
        <div className="main-container">
          <UserInput
            handleSubmit={handleSubmit}
            setTransactionModal={setTransactionModal}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionModal;
