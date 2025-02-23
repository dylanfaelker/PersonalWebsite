import { createSlice } from "@reduxjs/toolkit"

const globalSlice = createSlice({
  name: "global",
  initialState: {
    title: ""
  },
  reducers: {
    setTitle: (state, action) => {
      return {
        title: action.payload
      }
    },
  },
})

export const { 
  setTitle 
} = globalSlice.actions
export default globalSlice.reducer