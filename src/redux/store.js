import { configureStore } from "@reduxjs/toolkit"
import globalReducer from "./slice/globalSlice"
import coordReducer from "./slice/coordSlice"
import portfolioReducer from "./slice/portfolioSlice"

const store = configureStore({
  reducer: {
    global: globalReducer,
    coord: coordReducer,
    portfolio: portfolioReducer,
  },
})

export default store