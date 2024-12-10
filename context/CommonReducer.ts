import { CommonState } from "../helpers/types";

type CommonAction =
  | { type: "INIT_FILTER"; payload: any }
  | { type: "SET_FILTER"; payload: any }
  | { type: "TYPE_FILTER"; payload: any }
  | { type: "CLEAR_FILTER" };

export const CommonReducer = (state: CommonState, action: CommonAction) => {
  switch (action.type) {
    
    case "INIT_FILTER": {
      return {
        ...state,
        filteredProducts: action.payload,
        allProducts: action.payload,
        totalProducts: action.payload.length,
      };
    }
    case "SET_FILTER":
      state.filterKey = 0;
      return {
        ...state,
        filterKey: action.payload,
        filteredProducts: state.allProducts.filter(
          (item: any) => item?.category?.id === action.payload || (action.payload === 0 && !item.category)
        ),
      };
    case "TYPE_FILTER":
      if (state.filterKey !== 0) {
        state.filteredProducts = state.allProducts.filter(
          (item: any) => item?.category?.id === state.filterKey
        );
      }
      return {
        ...state,
        filteredProducts: state.filteredProducts.filter(
          (item: any) => item?.type === action.payload
        ),
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        filteredProducts: state.allProducts,
      };
    default:
      return state;
  }
};
