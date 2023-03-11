const initialState = {
    checkouts: []
  };

// Action type
export const ADD_CHECKOUT = 'ADD_CHECKOUT';

export const REMOVE_CHECKOUT = 'REMOVE_CHECKOUT';
// Action creator
export const addCheckout = (checkout) => {
  return { type: ADD_CHECKOUT, checkout };
};


export const removeCheckout = (id) => {
  return { type: REMOVE_CHECKOUT, id };
};

export const CheckoutsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CHECKOUT:
        return { ...state, checkouts: [...state.checkouts, action.checkout] };
        case REMOVE_CHECKOUT:
          return { ...state, checkouts: state.checkouts.filter(checkout => checkout.id !== action.id) };
      default:
        return state;
    }
  };