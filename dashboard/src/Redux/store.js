import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import adminFetchReducer from "./adminFetchReducer";
import productsReducer from "./productsReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","product","admin"], // Add the reducers you want to persist here
};

const rootReducer = combineReducers({
  user: userReducer,
  product:productsReducer,
  admin:adminFetchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
