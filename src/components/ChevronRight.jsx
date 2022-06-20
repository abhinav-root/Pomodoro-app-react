import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

const ChevronRight = ({ onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>
      <ChevronRightIcon width={"1.5rem"} color="#ffa500" />
    </button>
  );
};

export default ChevronRight;
