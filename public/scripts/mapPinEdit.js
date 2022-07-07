

$(document).ready(function() {

  let initialMapCentre = [43.663937824894184, -79.39198578896757]
  let map = L.map('map').setView(initialMapCentre, 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  const pinIcon = L.icon({
    iconUrl: '/image/pinIcon.png',
    iconSize: [60, 60]
  })

  let pinPopUp = L.popup({
    maxWidth: 250,
    className: "popUp"
  })

  //function to show popup
  const onMapClick = function(pin) {
    pinPopUp
    .setLatLng(pin.latlng)
    .setContent(`Your Latitude is : ${pin.latlng.lat} Your Longtitude is : ${pin.latlng.lng}`)
    .openOn(map)

    $('form input[name=latitude]').val(pin.latlng.lat);
    $('form input[name=longitude]').val(pin.latlng.lng);
  }
  map.on('click', onMapClick);






})





