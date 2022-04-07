import { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";

let storage = [];
export const CartContext = createContext();

if(typeof window !=='undefined') {
  storage = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
}

const initialState = {
  cartItems: storage,
  checkout: false,
  ...sumItems(storage)
}

const CartContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const increase = (payload) => {
    dispatch({type: 'INCREASE', payload})
  }

  const decrease = (payload) => {
    dispatch({type: 'DECREASE',payload})
  }

  const addProduct = (payload) => {
    dispatch({type: 'ADD_ITEM',payload})
  }

  const removeProduct= (payload) => {
    dispatch({type: "REMOVE_ITEM", payload})
  }

  const clearCart = () => {
    dispatch({type: "CLEAR_CART"})
  }

  const contextValues = {
    increase,
    decrease,
    addProduct,
    removeProduct,
    clearCart,
    ...state
  }
  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;

