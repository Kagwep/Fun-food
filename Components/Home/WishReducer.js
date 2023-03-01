const initialState = {
    wishes: []
  };

// Action type
export const ADD_WISH = 'ADD_WISH';

// Action creator
export const addWish = (wish) => {
  return { type: ADD_WISH, wish };
};

export const wishesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_WISH:
        return { ...state, wishes: [...state.wishes, action.wish] };
      default:
        return state;
    }
  };