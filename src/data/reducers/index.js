import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from "./chat/chat.reducer";

const rootReducer = combineReducers({
  // add any number of reducers here
  chat: chatReducer,
});

const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;