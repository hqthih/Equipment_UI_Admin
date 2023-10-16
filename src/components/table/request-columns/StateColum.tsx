import React from "react";
import Chip from "@mui/material/Chip";

interface IStateColumnProps {
  state: string;
}

const StateColum = ({ state }: IStateColumnProps) => {
  if (state === "PENDING") {
    return <Chip label={state} color="warning" />;
  } else if (state === "CONFIRMED") {
    return <Chip label={state} color="success" />;
  }
  return <Chip label={state} color="error" />;
};

export default StateColum;
