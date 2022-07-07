//gets mapid from url
const queryString = window.location.href;
let id = queryString.substring(queryString.lastIndexOf("/") + 1, queryString.length);

$.ajax({
  type: 'GET',
  url: 'get/' + id,
  success: (response) => {

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

          <!-- Button trigger modal -->
          <button type="button" class="btn btn-danger pin_delete_btn" name='${pinName}' data-bs-toggle="modal" data-bs-target="#pinModal${pinId}">
            Delete ${pinName}
          </button>


          </div>
        </div>
      </div>




      <!-- Modal placed outside of the accordion item-->
      <div class="modal fade in" id="pinModal${pinId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete ${pinName}?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger">Delete</button>
            </div>
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

    // $('.pin_delete_btn').on('click', () => {
    //   //let found = $('.pin_delete_btn').closest ($('.accordion-button').text())
    //   console.log ($(this).closest($('.pin_delete_btn')))

    // })

  }
})

