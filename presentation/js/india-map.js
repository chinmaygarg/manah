// India GeoJSON loader - includes full territory with PoK and Aksai Chin
// This must be loaded before charts.js
var INDIA_GEO;

(function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'js/india-geo.json', false);
  xhr.send();
  if (xhr.status === 200) {
    INDIA_GEO = JSON.parse(xhr.responseText);
  }
})();
