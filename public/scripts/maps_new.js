// Create map and initialize location to London
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


const popup = L.popup(); // Initialize popup

const formatLatLng = (str) => {
  `Helper function to format latlng event property
  >>>
  `
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
