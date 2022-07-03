// Client facing scripts here

let map = L.map('map').setView([43.656, -79.380], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker1 = L.marker([43.656, -79.380]).addTo(map);
let marker2 = L.marker([43.653, -79.380]).addTo(map);
let marker3 = L.marker([43.656, -79.381]).addTo(map);

let popup = L.popup();

marker1.on ('click', () => {
  marker1.bindPopup('marker1').openPopup()
})
