import { createSlice } from "@reduxjs/toolkit"

const coordSlice = createSlice({
    name: "coord",
    initialState: {
        coordList: [
            {
                id: 0,
                homeCoord: {
                    lat: 43.65,
                    long: -79.39,
                },
                boundaryCoords: {
                    north: 64.33,
                    south: 18.00,
                    west: -156.69,
                    east: 16.40,
                },
                hasCircumnav: false,
            }
        ]
    },
    reducers: {
        setCoordList: (state, action) => {
            state.coordList = action.payload
            return {
                coordList: action.payload
            }
        },
        addOrUpdateCoord: (state, action) => {
            return {
                ...state,
                coordList: [...state.coordList.filter(coords => coords.id !== action.payload.id), action.payload]
            }
        },
        deleteCoord: (state, action) => {
            return {
                ...state,
                coordList: state.coordList.filter(coords => coords.id !== action.payload)
            }
        },
    },
})

export const { 
    setCoordList,
    addOrUpdateCoord,
    deleteCoord
} = coordSlice.actions
export default coordSlice.reducer