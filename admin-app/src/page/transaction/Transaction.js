import React from "react";
import ListTransaction from "../../compoments/transaction/ListTransaction";

function Transaction() {
  return (
    <div>
      <ListTransaction fetchUrl={"/transaction/all"} />
    </div>
  );
}

export default Transaction;
