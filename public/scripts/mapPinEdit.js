
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




// temperory marker location object
let locations = {
    lat:43.66787265466534,
    long:-79.38885296889084
  }



//function to show popup
const onMapClick = function(pin) {
  pinPopUp
  .setLatLng(pin.latlng)
  .setContent(`Your Latitude is : ${pin.latlng.lat} Your Longtitude is : ${pin.latlng.lng}`)
  .openOn(map)
}
map.on('click', onMapClick);


// helper function to generate pin display on map from database
const generatePinOnMap = function(location) {
  let lat = location.lat
  let long = location.long
  marker = new L.marker([lat, long], {icon: pinIcon}).addTo(map);
  marker.on('click', onMapClick);
  return
}
generatePinOnMap(locations)







