import React from "react";

const ItemCounter = (props) => {
  return (
    <div
      style={{ textAlign: "left", fontWeight: "bold" }}
    >{`Total count: ${props.itemsCount}`}</div>
  );
};

export default ItemCounter;
