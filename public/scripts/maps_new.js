// Create map and initialize location to London
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


const popup = L.popup(); // Initialize popup

const formatLatLng = (str) => {
  /**
   * Converts str to a user-friendly format. Does not mutate str.
   * @param  {String} str  String containing a set of geo-coordinates in the format LatLng(50, 50)
   * @return {String} String containing latitude and longitude values from str, labelled and comma-seperated. i.e. Latitude: 50, Longitude: 50
   */

  const extractedLat = str.slice(7, 16);
  const extractedLng = str.slice(19, 27);
  return `Latitude: ${extractedLat}, Longitude: ${extractedLng}`;
};

const onMapClick = function(e) {
  // Show latitude and longitude in popup
  popup
  .setLatLng(e.latlng)
  .setContent(formatLatLng(e.latlng.toString()))
  .openOn(map);
}

// Bind click event handler to map
map.on('click', onMapClick);
