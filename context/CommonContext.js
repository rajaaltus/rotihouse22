import { createContext, useReducer } from "react";
import { CommonReducer } from './CommonReducer';


export const CommonContext = createContext()

const initialState = {
  filterKey: 0,
  filteredProducts: [],
  allProducts: [],
  totalProducts: 0,
}

export const CommonContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(CommonReducer, initialState)

  const initFilter = (payload) => {
    dispatch({type: 'INIT_FILTER', payload})
  }
  const setFilter = (payload) =>{
    dispatch({type:'SET_FILTER', payload})
  }
  const typeFilter = (payload) => {
    dispatch({type:'TYPE_FILTER', payload})
  }
  const clearFilter= () => {
    dispatch({type:'CLEAR_FILTER'})
  }
  const contextValues = {
    initFilter,
    setFilter,
    typeFilter,
    clearFilter,
    ...state
  }
  return (
    <CommonContext.Provider value={contextValues}>{children}</CommonContext.Provider>
  )
}