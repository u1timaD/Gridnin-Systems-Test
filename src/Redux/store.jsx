import { configureStore } from "@reduxjs/toolkit";
import sliceDataReducer from "./sliceData";

export default configureStore({
  reducer: {
    flight: sliceDataReducer,
  },
});
