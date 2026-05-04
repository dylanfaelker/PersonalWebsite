# World Explorer Map

World Explorer Map is a React app for visualizing how far someone has traveled around the globe. You set a home coordinate, mark the furthest point reached in each cardinal direction, and optionally record whether you have circumnavigated the earth. The app then highlights the reachable window on an equirectangular world map and lets you manually track visited countries.

## Features

- Interactive equirectangular world map rendered with D3
- Home coordinate input for latitude and longitude
- Furthest north, south, east, and west travel bounds
- Circumnavigation mode for trips that wrap fully around the globe
- Country checklist grouped by continent
- Bulk add and bulk remove controls per continent
- Responsive layout for desktop and mobile
- Redux-backed state for coordinates and visited countries

## Tech Stack

- React 18
- Redux Toolkit
- Material UI
- D3
- Create React App

## How It Works

The app keeps one map state object in Redux containing:

- A home coordinate
- Boundary coordinates for north, south, east, and west travel
- A circumnavigation flag
- A list of selected country ids

The map is rendered from GeoJSON data in `public/mapData.json`. Countries in the selected list are filled green, unselected countries remain dark, and a translucent overlay masks the world outside the user-defined travel bounds. A red pin marks the home coordinate.

Longitude handling is wrap-aware. East and west calculations use modular arithmetic so the map can correctly represent travel that crosses the international date line.

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

## Project Structure

```text
worldExplorer/
|-- components/
|   |-- CoordInput.js
|   |-- CoordInterface.js
|   |-- CountryChecker.js
|   |-- EquirectangleMap.js
|   `-- index.js
|-- domain/
|   `-- mapCalcs.js
|-- data/
|   `-- mapData.json
|-- index.js
|-- README.md
`-- WorldExplorerPage.js
```

If this feature is extracted into its own repository, keep a matching copy of `mapData.json` in the app's `public/` directory as well. The map component currently loads the file from `/mapData.json` at runtime.

## Standalone Repo Notes

This feature currently assumes a few shared app-level dependencies from the parent website:

- A Redux store with the `coord` slice mounted
- A `ThemeProvider` using the custom MUI palette keys referenced by the components
- A router-enabled React app shell
- The shared `usePageTitle` hook

If you split this into a dedicated repository, those pieces should be recreated locally or replaced with project-specific equivalents.

## Data

The GeoJSON map data is used only for rendering country shapes and continent groupings. There is a disclaimer that no political statement is being made regarding borders or country definitions.
