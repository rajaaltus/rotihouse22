import { CartItemType, CartState } from "../helpers/types";

const Storage = (cartItems: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
  }
};
export const sumItems = (cartItems: CartItemType[]) => {
  Storage(cartItems);
  let itemCount = cartItems?.reduce(
    (total: number, product: any) => total + product.qty,
    0
  );
  let total = cartItems
    ?.reduce(
      (total: number, product: CartItemType) => total + product.price * product.qty,
      0
    )
    .toFixed(2);
  return { itemCount, total };
};

type CartActions =
  | { type: "ADD_ITEM"; payload: CartItemType }
  | { type: "INCREASE"; payload: CartItemType }
  | { type: "DECREASE"; payload: CartItemType }
  | { type: "REMOVE_ITEM"; payload: CartItemType };

export const CartReducer = (state: CartState, action: CartActions) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item: any) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          qty: 1,
        });
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item: any) => item.id === action.payload.id)
      ].qty++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item: any) => item.id === action.payload.id)
      ].qty--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item: any) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item: any) => item.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};
