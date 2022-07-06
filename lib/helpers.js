const validateLatLng = (latlng) => {
  const { lat, long } = latlng;

  if (!(parseFloat(lat) && parseFloat(long))) {
    return false;
  }

  return (lat >= -90 && lat <= 90) && (long >= -180 && long <= 180);
};

module.exports = {
  validateLatLng
}
