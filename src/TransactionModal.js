import React from "react";
import UserInput from "./UserInput";

const TransactionModal = ({
  isTransactionModalOpen,
  handleSubmit,
  setTansactionModal,
}) => {
  return (
    <React.Fragment>
      {isTransactionModalOpen ? (
        <div className="main-container">
          <UserInput
            handleSubmit={handleSubmit}
            setTansactionModal={setTansactionModal}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionModal;
