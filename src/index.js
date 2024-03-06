import { validateIp, addTileLayer, getAddress, addOffset } from "./helpers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");
const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  //iconAnchor: [22, 94],
});
const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const { lat, lng, country, timezone } = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText =
    mapData.location.country + " " + mapData.location.region;
  timezoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;
  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
  if (matchMedia("(max-width:1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("102.22.22.1").then(setInfo);
});
