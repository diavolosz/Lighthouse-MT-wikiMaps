
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



// temperory marker location database object

let locations = {
  pin1: {
    lat:43.66628167959075,
    long:-79.39462508254417
  },
  pin2: {
    lat:43.66446558824718,
    long:-79.39230765399577
  },
  pin3: {
    lat:43.66219151608988,
    long:-79.38661064209391
  },
  pin4: {
    lat:43.66282019311965,
    long:-79.39571942382528
  },
  pin5: {
    lat:43.66614974316886,
    long:-79.39622367911178
  }
}



//function to show popup
let popup = L.popup();

function onMapClick(pin) {
  popup
  .setLatLng(pin.latlng)
  .setContent("You clicked the map at " + pin.latlng.toString())
  .openOn(map);
}


// helper function to generate pin display on map from database
const generatePinOnMap = function(database) {
  for (let eachPin in database) {
    let lat = database[eachPin].lat
    console.log(lat)
    let long = database[eachPin].long
    console.log(long)
    marker = new L.marker([lat, long], {icon: pinIcon})
      .addTo(map);
    marker.on('click', onMapClick);
    }
  return
}
generatePinOnMap(locations)




