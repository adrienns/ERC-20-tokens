import React from "react";
import UserInput from "./UserInput";

const TransactionModal = ({ setIsOpen, isOpen, handleSubmit }) => {
  return (
    <React.Fragment>
      {isOpen ? (
        <div className="main-container">
          <UserInput setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default TransactionModal;
