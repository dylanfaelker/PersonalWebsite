import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./slice/globalSlice"
import coordReducer from "./slice/coordSlice"

const store = configureStore({
  reducer: {
    global: globalReducer,
    coord: coordReducer,
  },
})

export default store