import React, { useContext } from "react";
import { CommonContext } from "../context/CommonContext";

const useCommon = () => {
  const ctx = useContext(CommonContext);
  return {
    ...ctx,
  };
};

export default useCommon;
