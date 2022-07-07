let beforeMapName = $('#title').text();
let subString = beforeMapName.substring(0, beforeMapName.indexOf('I'));
let pinName = (subString.substring(6)).trim();



$.ajax({
  type: 'GET',
  url: 'get/' + pinName,
  success: (pinInfo) => {

    let initialMapCentre = [pinInfo.latitude, pinInfo.longitude]
    let map = L.map('map').setView(initialMapCentre, 17);

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
    const onMapClick = function (pin) {
      pinPopUp
        .setLatLng(pin.latlng)
        .setContent(`Your Latitude is : ${pin.latlng.lat} Your Longtitude is : ${pin.latlng.lng}`)
        .openOn(map)

      $('form input[name=latitude]').val(pin.latlng.lat);
      $('form input[name=longitude]').val(pin.latlng.lng);
    }
    map.on('click', onMapClick);

    //generate pin marker
    let marker = L.marker([pinInfo.latitude, pinInfo.longitude], { icon: pinIcon, draggable: true }).addTo(map);
    marker.bindPopup(`${pinInfo.name}<img src='${pinInfo.image}'>`).openPopup();
    marker.on('click', function (e) {
      map.flyTo(e.latlng, 17);
    });

    //draggable marker to update coords
    marker.on('drag', function (event) {
      let position = marker.getLatLng();

      $('form input[name=latitude]').val(position.lat);
      $('form input[name=longitude]').val(position.lng);
    })

  }

})

