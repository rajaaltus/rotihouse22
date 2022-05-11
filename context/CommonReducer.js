

export const CommonReducer = (state, action) => {
  switch(action.type) {
    case 'INIT_FILTER': {
      return {
        ...state,
        filteredProducts: action.payload,
        allProducts: action.payload,
        totalProducts: action.payload.length
      }
    }
    case 'SET_FILTER':
      state.filterKey = 0
      return {
        ...state,
        filterKey: action.payload,
        filteredProducts: state.allProducts.filter((item)=>item.category.id===action.payload)
      }
    default:
      return state
  }
}