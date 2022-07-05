const validateLatLng = (latlng) => {
  const { lat, long } = latlng;
  return (lat >= -90 && lat <= 90) && (long >= -180 && long <= 180);
};

module.exports = {
  validateLatLng
}
