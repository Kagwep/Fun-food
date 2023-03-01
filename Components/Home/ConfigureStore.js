import { configureStore } from '@reduxjs/toolkit';
import { ordersReducer } from './OrdersReducer';
import { wishesReducer } from './WishReducer';

const store = configureStore({
  reducer: {
    orders: ordersReducer
  }
});

export default store;


