// // temperory marker location database object

// let locations = {
//   pin1: {
//     lat: 43.66787265466534,
//     long: -79.38885296889084
//   },
//   pin2: {
//     lat: 43.66446558824718,
//     long: -79.39230765399577
//   },
//   pin3: {
//     lat: 43.66219151608988,
//     long: -79.38661064209391
//   },
//   pin4: {
//     lat: 43.66282019311965,
//     long: -79.39571942382528
//   },
//   pin5: {
//     lat: 43.66614974316886,
//     long: -79.39622367911178
//   }
// }


// // helper function to generate pin display on map from database
// const generatePinOnMap = function (database) {
//   for (let eachPin in database) {
//     let lat = database[eachPin].lat
//     let long = database[eachPin].long
//     marker = new L.marker([lat, long], { icon: pinIcon }).addTo(map);
//     marker.on('click', onMapClick);
//     // marker.on('click', flyTo(L.latLng(lat, long)));
//   }
//   return
// }

// generatePinOnMap(locations)


//gets mapid from url
const queryString = window.location.href
let id = queryString[queryString.length - 1]

$.ajax({
  type: 'GET',
  url: 'get/' + id,
  success: (response) => {
    console.log(response)

    let mapInfo = response[0];
    let pinsInfo = response[1];

    let initialMapCentre = [mapInfo.latitude, mapInfo.longitude]
    let map = L.map('map').setView(initialMapCentre, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const pinIcon = L.icon({
      iconUrl: '/image/pinIcon.png',
      iconSize: [60, 60]
    })

    let pinPopUp = L.popup();



    //function to show popup
    const onMapClick = function (pin) {
      pinPopUp
        .setLatLng(pin.latlng)
        .setContent("You clicked the map at " + pin.latlng.toString())
        .openOn(map);
    }


    let locations = {};

    for (let location of pinsInfo) {
      locations[location.name] = {
        lat: location.latitude,
        long: location.longitude
      }
    }

    console.log(locations)


    // helper function to generate pin display on map from database
    const generatePinOnMap = function (database) {
      for (let eachPin in database) {
        let lat = database[eachPin].lat
        let long = database[eachPin].long
        marker = new L.marker([lat, long], { icon: pinIcon }).addTo(map);
        marker.on('click', onMapClick);
        // marker.on('click', flyTo(L.latLng(lat, long)));
      }
      return
    }

    generatePinOnMap(locations)



    for (let pin of pinsInfo) {

      let pinId = pin.id;
      let pinName = pin.name;
      let pinDescription = pin.description;
      let pinImage = pin.image;

      let pinItem = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${pinId}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${pinId}" aria-expanded="false" aria-controls="collapse${pinId}">
            ${pinName}
          </button>
        </h2>
        <div id="collapse${pinId}" class="accordion-collapse collapse" aria-labelledby="heading${pinId}"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
         ${pinDescription}
          <img src='${pinImage}'>
          </div>
        </div>
      </div>
      `
      $('.accordion').append(pinItem)

    };




  }
})
