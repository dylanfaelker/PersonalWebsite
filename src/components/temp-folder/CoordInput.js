import React, { useState, useEffect } from "react"
import { TextField } from "@mui/material"

const CoordInput = ({ label, coord, setCoord, error, disable }) => {
    const [tempCoord, setTempCoord] = useState(coord)

    useEffect(() => {
        setTempCoord(coord)
    }, [coord])

    return (
        <>
            <TextField
                label={label}
                value={tempCoord}
                onChange={(event) => {
                    setTempCoord(event.target.value)
                }}
                onBlur={() => setCoord(parseFloat(tempCoord))}
                error={error}
                disabled={disable}
                variant="standard"
                sx={{
                    "& label": { color: "#F6F4F4" }, // Label color
                    "& input": { color: "#F6F4F4" }, // Text color
                    "& .MuiInput-underline:before": { borderBottomColor: "#F6F4F4" }, // Default underline
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "#F6F4F4" }, // Hover underline
                    "& .MuiInput-underline:after": { borderBottomColor: "#F6F4F4" }, // Focused underline
                }}
            />
        </>
    )
}

export default CoordInput;