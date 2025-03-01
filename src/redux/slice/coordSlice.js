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
                countries: [],
            }
        ]
    },
    reducers: {

        // dispatch(setCoordList( [coord] ))
        setCoordList: (state, action) => {
            state.coordList = action.payload
            return {
                coordList: action.payload
            }
        },

        // dispatch(addOrUpdateCoord( coord ))
        addOrUpdateCoord: (state, action) => {
            return {
                ...state,
                coordList: [...state.coordList.filter(coords => coords.id !== action.payload.id), action.payload]
            }
        },

        // dispatch(deleteCoord( coord ))
        deleteCoord: (state, action) => {
            return {
                ...state,
                coordList: state.coordList.filter(coords => coords.id !== action.payload)
            }
        },

        // dispatch(setCountries({ id: num, countries: [] }))
        setCountries: (state, action) => {
            return {
                ...state,
                coordList: state.coordList.map(coords => 
                    coords.id === action.payload.id 
                        ? { ...coords, countries: action.payload.countries }
                        : coords
                )
            }
        },

        // dispatch(addCountries({ id: num, countries: [] }))
        addCountries: (state, action) => {
            const dedupNewCountries = action.payload.countries.filter(
                (newCountry) => !state.coordList[action.payload.id].countries.includes(newCountry)
            )
            return {
                ...state,
                coordList: state.coordList.map(coords => 
                    coords.id === action.payload.id 
                        ? { ...coords, countries: [...coords.countries, ...dedupNewCountries]}
                        : coords
                )
            }
        },

        // dispatch(deleteCountries({ id: num, countries: [] }))
        deleteCountries: (state, action) => {
            return {
                ...state,
                coordList: state.coordList.map(coords => 
                    coords.id === action.payload.id 
                        ? { ...coords, countries: coords.countries.filter((country) => !action.payload.countries.includes(country))}
                        : coords
                )
            }
        },
    },
})

export const { 
    setCoordList,
    addOrUpdateCoord,
    deleteCoord,
    setCountries,
    addCountries,
    deleteCountries,
} = coordSlice.actions
export default coordSlice.reducer