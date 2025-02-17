const mod = (a, b) => ((a % b) + b) % b;

// Returns how many degrees you travel from long1 to long2 when heading in eastern direction
const distanceEast = (long1, long2) => {
    if (long2 < long1) {
        return mod(360 - long2 - long1, 360)
    } else {
        return mod(long2 - long1, 360)
    }
}

// Returns how many degrees you travel from long1 to long2 when heading in weatern direction
const distanceWest = (long1, long2) => {
    if (long1 < long2) {
        return mod(360 - long1 - long2, 360)
    } else {
        return mod(long1 - long2, 360)
    }
}

// Converts any degree to within the bounds [-180,180], assuming the globe wraps and 180+1=-179
const transposeLongitudeToMapBounds = (long) => {
    return mod(long + 180, 360) - 180
}

// Converts any degree to within the bounds [-180,180], assuming the globe wraps and 180+1=-179
const transposeLatitudeToMapBounds = (lat) => {
    if (lat > 90) {
        return 90
    } else if (lat < -90) {
        return -90
    } else {
        return lat
    }
}

export {distanceWest, distanceEast, transposeLongitudeToMapBounds, transposeLatitudeToMapBounds}