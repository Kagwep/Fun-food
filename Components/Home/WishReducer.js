const initialState = {
    wishes: []
  };

// Action type
export const ADD_WISH = 'ADD_WISH';

export const REMOVE_WISH = 'REMOVE_WISH';
// Action creator
export const addWish = (wish) => {
  return { type: ADD_WISH, wish };
};


export const removeWish = (id) => {
  return { type: REMOVE_WISH, id };
};

export const wishesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_WISH:
        return { ...state, wishes: [...state.wishes, action.wish] };
        case REMOVE_WISH:
          return { ...state, wishes: state.wishes.filter(wish => wish.id !== action.id) };
      default:
        return state;
    }
  };