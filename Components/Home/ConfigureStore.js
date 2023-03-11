import { configureStore } from '@reduxjs/toolkit';
import { ordersReducer } from './OrdersReducer';
import { wishesReducer } from './WishReducer';
import { CheckoutsReducer } from './CheckersReducer';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    wishes:wishesReducer,
    checkouts:CheckoutsReducer
  }
});

export default store;


