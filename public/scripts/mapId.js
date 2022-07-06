//gets mapid from url
const queryString = window.location.href;
let id = queryString.substring(queryString.lastIndexOf("/") + 1, queryString.length);

$.ajax({
  type: 'GET',
  url: 'get/' + id,
  success: (response) => {
    console.log(response)

    let mapInfo = response[0];
    let pinsInfo = response[1];

    //map placement

    function mapMaker(mapInfo) {

      let mapPlacement = `
      <div>
      <span id="mapName">
        <button>
          <i class="fa-solid fa-star"></i>
        </button>
        <p>
          ${mapInfo.name}
        </p>
      </span>
      <div id="map"></div>
    </div>`

      $('article').append(mapPlacement)
    };

    mapMaker(mapInfo);

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

    //let pinPopUp = L.popup();




    //pins of interest name in accordion top with add button?
    let navName = `
    <div class='pinContainer'>
      <h2>Pins of Interest</h2>
      <form action="/pin/add" method="POST">
        <input type="number" name="map_id" value="${id}" hidden>
        <button class='btn btn-block btn-primary'>
        Add new pin
      </form>
      </button>
    </div>
    `;

    $('.accordion').prepend(navName);

    // $('.fa-plus').click(function () {
    //   $.ajax({
    //     type: 'GET',
    //     url: '/pin/add',
    //     success: ((response) => {
    //       location.replace (response)
    //     })

    //   })
    // });

    //pin nav on left
    for (let pin of pinsInfo) {

      let pinId = pin.id;
      let pinName = pin.name;
      let pinDescription = pin.description;
      let pinImage = pin.image;
      let pinAddress = pin.address;

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
         <h6>${pinDescription}</h6>
          <img src='${pinImage}'>
          <h6>Address: ${pinAddress}</h6>
          </div>
        </div>
      </div>
      `;

      $('.accordion').append(pinItem);

      //making pins and placing
      let marker = L.marker([pin.latitude, pin.longitude], { icon: pinIcon }).addTo(map);

      marker.bindPopup(`${pin.name}<img src='${pinImage}'>`);

      marker.on('click', function (e) {
        map.setView(e.latlng, 18);
      });


    };



  }
})

