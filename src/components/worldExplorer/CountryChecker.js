import { Checkbox, FormControlLabel, Tooltip, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCountries, deleteCountries } from "../../redux/slice/coordSlice"

const CountryChecker = ({ mapId, country }) => {

    const theme = useTheme()
    const dispatch = useDispatch()
    
    const checkedRedux = useSelector((state) => state.coord.coordList.find(coord => coord.id === mapId)?.countries.includes(country.id))

    const [checked, setChecked] = useState(checkedRedux)

    useEffect(() => {
        if (checkedRedux !== checked) {
            setChecked(checkedRedux)
        }
    }, [checkedRedux])

    const handleLocalStateChange = (event) => {
        console.log('click')
        setChecked(event.target.checked)
    }
    const handleGlobalStateChange = (event) => {
        console.log('Blur')
        if (checked) {
            dispatch(addCountries({ id: mapId, countries: [country.id] }))
        } else {
            dispatch(deleteCountries({ id: mapId, countries: [country.id] }))
        }
    }
    
    

    return (
        <>
            <Tooltip title={country.properties.name} placement='right' sx={{ width: 150 }} slotProps={{popper:{modifiers:[{name:'offset',options:{offset:[0,-122]}}]}}}>
                <FormControlLabel control={
                    <Checkbox
                        checked={checked}
                        onChange={handleLocalStateChange}
                        onMouseLeave={handleGlobalStateChange}
                        sx={{
                            color: theme.palette.df.white,
                            '&.Mui-checked': {
                                color: theme.palette.df.lightGreen, // Checked color (green)
                            },
                        }}
                    />
                } label={country.id} />
            </Tooltip>

        </>
    )
}

export default CountryChecker;