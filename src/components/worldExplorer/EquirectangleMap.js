import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Box } from "@mui/material"
import { distanceEast, transposeLongitudeToMapBounds } from "."
import { useSelector } from 'react-redux'

const EquirectangleMap = ({ height, width }) => {
    const svgRef = useRef()

    const coordList = useSelector((state) => state.coord.coordList)
  
    useEffect(() => {
  
      // Define projection
      let center
      if (!coordList) {
        center = 0
      } else if (!coordList[0].hasCircumnav) {
        center = -transposeLongitudeToMapBounds(coordList[0].boundaryCoords.west + distanceEast(coordList[0].boundaryCoords.west, coordList[0].boundaryCoords.east) / 2)
      } else {
        center = -coordList[0].homeCoord.long
      }
      const projection = d3.geoEquirectangular().scale(height / Math.PI).translate([width / 2, height / 2]).rotate([center, 0]);
  
      const pathGenerator = d3.geoPath().projection(projection);
  
      // Clear previous drawings
      const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
      svg.selectAll("*").remove();
  
      // Load GeoJSON data
      d3.json("/mapData.json")
        .then((geoData) => {

          // Draw map countries checked
          svg.selectAll(".checked-countries")
            .data(geoData.features.filter((feature) => coordList[0].countries.includes(feature.id)))
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("fill", "#7DCFB6")
            .attr("stroke", "#434648")

          // Draw map countries unchecked
          svg.selectAll(".unchecked-countries")
            .data(geoData.features.filter((feature) => !coordList[0].countries.includes(feature.id)))
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("fill", "#434648")
            .attr("stroke", "#7DCFB6")

          if (coordList) {
            // Drawing boundary
            let rectCoords //(Longitude, Latitude)
            if (coordList[0].hasCircumnav) {
              rectCoords = {
                topLeft: [coordList[0].homeCoord.long-179.9, coordList[0].boundaryCoords.north],
                bottomRight: [coordList[0].homeCoord.long+179.9, coordList[0].boundaryCoords.south],
              }
            } else {
              rectCoords = {
                topLeft: [coordList[0].boundaryCoords.west, coordList[0].boundaryCoords.north],
                bottomRight: [coordList[0].boundaryCoords.east, coordList[0].boundaryCoords.south],
              }
            }
            const topLeftScreen = projection(rectCoords.topLeft) // Convert lat/lon to x/y screen coordinates
            const bottomRightScreen = projection(rectCoords.bottomRight)

            const defs = svg.append("defs");
            const mask = defs.append("mask").attr("id", "cutout-mask");

            // Covers the map in a filter
            mask.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", height)
              .attr("fill", "white");

            // This is the fully transparent part, revealing the underlying map
            mask.append("rect")
              .attr("x", topLeftScreen[0])
              .attr("y", topLeftScreen[1])
              .attr("width", bottomRightScreen[0] - topLeftScreen[0])
              .attr("height", bottomRightScreen[1] - topLeftScreen[1])
              .attr("fill", "black");

            // Applies the filter
            svg.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", width)
              .attr("height", height)
              .attr("fill", "rgba(253, 144, 114, 0.5)")
              .attr("mask", "url(#cutout-mask)");

            // Drawing home pin
            const circleCoords = [coordList[0].homeCoord.long, coordList[0].homeCoord.lat] // (Longitude, Latitude)
            const circleScreen = projection(circleCoords) //convert long/lat to x/y
            if (circleScreen) {
              svg.append("circle")
                .attr("cx", circleScreen[0]) // X coordinate
                .attr("cy", circleScreen[1]) // Y coordinate
                .attr("r", 3) // radius
                .attr("fill", "red")
                .attr("stroke", "black")
                .attr("stroke-width", 1);
            }
          }

        })
        .catch((error) => console.error("Error loading GeoJSON:", error))
    }, [height, width, coordList])
  
    return (
        <Box sx={{ border:5, borderColor:'#530C0C', height:height, width:width }}>
                <svg ref={svgRef}></svg>
        </Box>
    )
  };

export default EquirectangleMap;