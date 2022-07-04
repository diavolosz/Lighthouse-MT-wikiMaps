$(document).ready(function() {

  // Create map and initialize location to London
  let map = L.map('map').setView([51.505, -0.09], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
      noWrap: true
  }).addTo(map);


  const popup = L.popup(); // Initialize popup

  const extractLatLong = (str) => {
    const coordinates = str.slice(7, str.length - 1).split(', ');
    const lat = coordinates[0];
    const long = coordinates[1];
    return { lat, long };
  };

  const formatLatLng = (str) => {
    /**
     * Converts str to a user-friendly format. Does not mutate str.
     * @param  {String} str  String containing a set of geo-coordinates in the format LatLng(50, 50)
     * @return {String} String containing latitude and longitude values from str, labelled and comma-seperated. i.e. Latitude: 50, Longitude: 50
     */
    const { lat, long } = extractLatLong(str);
    return `Latitude: ${lat}, Longitude: ${long}`;
  };

  const onMapClick = function(e) {
    const coords = e.latlng;
    const { lat, long } = extractLatLong(coords.toString());

    // Show latitude and longitude in popup
    popup
    .setLatLng(coords)
    .setContent(formatLatLng(coords.toString()))
    .openOn(map);

    $('form input[name=lat]').val(lat);
    $('form input[name=long]').val(long);
  }

  // Bind click event handler to map
  map.on('click', onMapClick);

});
