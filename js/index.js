const mymap = L.map('map').setView([0,0], 1)

const myIcon = L.icon({
    iconUrl: './iss.png',
    iconSize: [50, 50],
    iconAnchor: [25, 16],
    popupAnchor: [-3 ,-76]
});

const marker = L.marker([0, 0], { icon: myIcon}).addTo(mymap)

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })

tiles.addTo(mymap)
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

async function getISSCurrentLocation() {
    const response = await fetch(api_url)
    const data = await response.json()

    const { latitude, longitude } = data

    marker.setLatLng([latitude, longitude])

    document.getElementById('lat').textContent = latitude
    document.getElementById('lon').textContent = longitude
}

async function updateLocationEverySecond() {
    let time = await setInterval(getISSCurrentLocation, 2000)
}
    
updateLocationEverySecond()
