require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/CSVLayer"
], function(Map, MapView, CSVLayer) {
  
  // Data source
var url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";


  // Popup template
const template = {
   title: "Crime committed at {ILEADSStreet}"
};

  // Heatmap renderer with custom colors
  const renderer = {
    type: "heatmap",
    colorStops: [
      { ratio: 0, color: "rgba(0, 0, 255, 0)" },      // transparent blue
      { ratio: 0.2, color: "rgba(0, 255, 255, 0.6)" }, // cyan
      { ratio: 0.4, color: "rgba(0, 255, 0, 0.7)" },   // green
      { ratio: 0.6, color: "rgba(255, 255, 0, 0.8)" }, // yellow
      { ratio: 0.8, color: "rgba(255, 140, 0, 0.9)" }, // orange
      { ratio: 1, color: "rgba(255, 0, 0, 1)" }        // red
    ],
    maxPixelIntensity: 100,
    minPixelIntensity: 0
  };

  // CSV Layer
  const layer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
		latitudeField:"Lat",
        longitudeField:"Lon",
		popupTemplate: template,
		renderer: renderer
});

  // Map
  const map = new Map({
    basemap: "dark-gray-vector",
    layers: [layer]
  });

  // View centered on St. Louis
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.1994, 38.6270], // St. Louis, MO
    zoom: 11
  });

});
