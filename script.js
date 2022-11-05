var map = L.map('map').setView([48.8078325, 24.54095], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([48.8078325, 24.54095]).addTo(map);

marker.bindPopup("You are here: 48.8078325, 24.54095" ).openPopup();

var popup = L.popup();

function onMapClick(e) {
    //var marker = L.marker(e.latlng).addTo(map);
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked here: " + e.latlng.lat + ", " + e.latlng.lng)
        .openOn(map);
}

map.on('click', onMapClick);


document.addEventListener('DOMContentLoaded', getMyLocation)

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation)
    } else {
        alert("Oops, no geolocation support")
    }
}

// function displayLocation(position){
//     let latitude = position.coords.latitude
//     let longitude = position.coords.longitude
//     let div = document.getElementById("location")
//     div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
// }

function displayLocation(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`
    // console.log("Coords: ", position.coords)
    ourCoords = {latitude:48.94050840306471, longitude:24.737827584088528}
    let km=computeDistance(position.coords, ourCoords)
    let distance = document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`
}


function displayError(error){
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    }
    const errorMessage = errorTypes[error.code]
    if(error.code==0||error.code == 2){
        errorMessage = errorMessage + " " + error.message
    }
    let div = document.getElementById("location")
    div.innerHTML = errorMessage
}

function computeDistance(startCoords, destCoords){
    let startLatRads = degreesToRadians(startCoords.latitude)
    let startLongRads = degreesToRadians(startCoords.longitude)
    let destLatRads = degreesToRadians(destCoords.latitude)
    let destLongRads = degreesToRadians(destCoords.longitude)
    let Radius = 6371

    let distance = Math.acos(Math.sin(startLatRads)*Math.sin(destLatRads)+Math.cos(startLatRads)*Math.cos(destLatRads)*Math.cos(startLongRads - destLongRads))*Radius;
    return distance
}

function degreesToRadians(degrees){
    let radians = (degrees*Math.PI)/180
    return radians
}

