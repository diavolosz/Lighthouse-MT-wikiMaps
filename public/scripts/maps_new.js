$(document).ready(function() {

  // Create map and initialize location to London
  let map = L.map('map').setView([51.505, -0.09], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
      noWrap: true
  }).addTo(map);


  let pinPopUp = L.popup({
    maxWidth: 250,
    className: "popUp"
  })

  const onMapClick = function(pin) {
    pinPopUp
    .setLatLng(pin.latlng)
    .setContent(`Your Latitude is : ${pin.latlng.lat} Your Longtitude is : ${pin.latlng.lng}`)
    .openOn(map)

    $('form input[name=lat]').val(pin.latlng.lat);
    $('form input[name=long]').val(pin.latlng.lng);
  }

  // Bind click event handler to map
  map.on('click', onMapClick);
});
