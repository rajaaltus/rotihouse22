import { createContext, useReducer } from "react";
import { CartItem, CartState } from "../helpers/types";
import { CartReducer, sumItems } from "./CartReducer";

let storage: CartItem[] = [];

if (typeof window !== "undefined") {
  storage = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "")
    : [];
}

export const initialState: CartState = {
  cartItems: storage,
  checkout: false,
  ...sumItems(storage),
  increase: () => {},
  decrease: () => {},
  addProduct: () => {},
  removeProduct: () => {},
};
export const CartContext = createContext<CartState>(initialState);

const CartContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload: CartItem) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload: CartItem) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const contextValues = {
    ...state,
    increase,
    decrease,
    addProduct,
    removeProduct,
  };
  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
