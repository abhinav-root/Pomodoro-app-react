import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";

export const ChevronLeft = ({ onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>
      <ChevronLeftIcon width={"1.5rem"} color="#ffa500" />
    </button>
  );
};
