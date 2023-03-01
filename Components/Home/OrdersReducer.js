const initialState = {
    orders: []
  };

// Action type
export const ADD_ORDER = 'ADD_ORDER';

// Action creator
export const addOrder = (order) => {
  return { type: ADD_ORDER, order };
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ORDER:
        return { ...state, orders: [...state.orders, action.order] };
      default:
        return state;
    }
  };