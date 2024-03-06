import L from "leaflet";
export function addTileLayer(map) {
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}
