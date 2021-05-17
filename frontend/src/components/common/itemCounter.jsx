import React from "react";

const ItemCounter = (props) => {
  return (
    <div
      style={{ width: "100%", textAlign: "right" }}
    >{`Total count: ${props.itemsCount}`}</div>
  );
};

export default ItemCounter;
