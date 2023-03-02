const initialState = {
    orders: []
  };

// Action type
export const ADD_ORDER = 'ADD_ORDER';


export const REMOVE_ORDER = 'REMOVE_ORDER';

// Action creator
export const addOrder = (order) => {
  return { type: ADD_ORDER, order };
};

export const removeOrder = (id) => {
  return { type: REMOVE_ORDER, id };
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ORDER:
        return { ...state, orders: [...state.orders, action.order] };
      case REMOVE_ORDER:
        return { ...state, orders: state.orders.filter(order => order.id !== action.id) };
      default:
        return state;
    }
  };