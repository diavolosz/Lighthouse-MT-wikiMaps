let beforeMapName = $('#title').text()

let subString = beforeMapName.substring(0, beforeMapName.indexOf(':'));

let mapName = subString.substring(11)

$.ajax ({
  type: 'GET',
  url: 'add/get/' + mapName,
  success: (mapInfo) => {
    console.log (mapInfo)


    //making map and proper coords for map
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


  }

})
