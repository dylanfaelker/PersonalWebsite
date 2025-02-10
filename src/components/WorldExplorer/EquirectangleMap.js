import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box } from "@mui/material";
import { distanceEast, transposeLongitudeToMapBounds } from ".";

const EquirectangleMap = ({ height, width, homeCoord, boundaryCoords, hasCircumnav }) => {
    const svgRef = useRef()
  
    useEffect(() => {
  
      // Define projection
      let center
      if (!hasCircumnav) {
        center = -transposeLongitudeToMapBounds(boundaryCoords.west + distanceEast(boundaryCoords.west, boundaryCoords.east) / 2)
      } else {
        center = -homeCoord[1]
      }
      const projection = d3.geoEquirectangular().scale(130).translate([width / 2, height / 2]).rotate([center, 0]);
  
      const pathGenerator = d3.geoPath().projection(projection);
  
      // Clear previous drawings
      const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
      svg.selectAll("*").remove();
  
      // Load GeoJSON data
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
        .then((geoData) => {

          // Draw map
          svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("fill", "#7DCFB6")
            .attr("stroke", "#434648");
  
          // Drawing boundary
          let rectCoords //(Longitude, Latitude)
          if (hasCircumnav) {
            rectCoords = {
              topLeft: [homeCoord[1]-179.9, boundaryCoords.north],
              bottomRight: [homeCoord[1]+179.9, boundaryCoords.south],
            }
          } else {
            rectCoords = {
              topLeft: [boundaryCoords.west, boundaryCoords.north],
              bottomRight: [boundaryCoords.east, boundaryCoords.south],
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
          const circleCoords = [homeCoord[1], homeCoord[0]] // (Longitude, Latitude)
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

        })
        .catch((error) => console.error("Error loading GeoJSON:", error))
    }, [height, width, homeCoord, boundaryCoords, hasCircumnav])
  
    return (
        <Box sx={{ border:5, borderColor:'#530C0C', height:height, width:width }}>
                <svg ref={svgRef}></svg>
        </Box>
    )
  };

export default EquirectangleMap;