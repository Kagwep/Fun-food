import { configureStore } from '@reduxjs/toolkit';
import { wishesReducer } from './WishReducer';

const storewish = configureStore({
    reducer: {
      wishes: wishesReducer
    }
  });
  
  export default storewish;