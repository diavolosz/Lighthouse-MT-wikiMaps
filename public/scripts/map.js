
let map = L.map('map').setView([43.666707, -79.391248], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);




const myIcon = L.icon({
  iconUrl: '/image/pinIcon.png',
  iconSize: [60, 60]
})

let marker = L.marker([43.665, -79.386], {icon: myIcon}).addTo(map);


