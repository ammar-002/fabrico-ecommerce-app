import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from './filterSlice'
import productReducer from './ProductSlice'
import userReducer  from "./UserSlice";
import cartReducer from "./CartSlice"
import orderReducer from "./orderSlice"
import tempOrderReducer from "./tempSlice"
import {
    persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  products : productReducer,
  filter: filterReducer,
  user:userReducer,
  cart:cartReducer,
  order:orderReducer,
  tempOrder:tempOrderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
