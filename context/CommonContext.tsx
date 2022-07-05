import { createContext, useReducer } from "react";
import { CartItem, CommonState } from "../helpers/types";
import { CommonReducer } from "./CommonReducer";

export const initialState: CommonState = {
  filterKey: 0,
  filteredProducts: [],
  allProducts: [],
  totalProducts: 0,
  initFilter: () => {},
  setFilter: () => {},
  typeFilter: () => {},
  clearFilter: () => {},
};
export const CommonContext = createContext<CommonState>(initialState);

const CommonContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CommonReducer, initialState);

  const initFilter = (payload: CartItem[]) => {
    dispatch({ type: "INIT_FILTER", payload });
  };
  const setFilter = (payload: number) => {
    dispatch({ type: "SET_FILTER", payload });
  };
  const typeFilter = (payload: string) => {
    dispatch({ type: "TYPE_FILTER", payload });
  };
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  const contextValues = {
    ...state,
    initFilter,
    setFilter,
    typeFilter,
    clearFilter,
  };
  return (
    <CommonContext.Provider value={contextValues}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;
