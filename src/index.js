import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAfKPdg777kIzgrXW-XDHQrKLunbbDJRm0",
    authDomain: "wedeliver012.firebaseapp.com",
    projectId: "wedeliver012",
    storageBucket: "wedeliver012.appspot.com",
    messagingSenderId: "566155520783",
    appId: "1:566155520783:web:17f5fd94e5c2c9c1152c7a",
    measurementId: "G-1M1LFHYJ23"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyAT_zifVH-k-taQfmVZH_okWtaJ8WQBkuA"
});

let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: 33.6, lng: -117.8 },
        zoom: 11,
        mapId: "driversmap",
    });

    const querySnapshot = await getDocs(collection(db, "locations"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let data = doc.data();
        const pinBackground = new PinElement({
            background: "#FF00FF",
        });
        new AdvancedMarkerElement({
            map: map,
            position: { lat: data.location.latitude, lng: data.location.longitude },
            title: doc.id,
            content: pinBackground.element,
        });
    });
}

initMap();

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    console.log("Latitude: ", position.coords.latitude);
    console.log("Longitude: ", position.coords.longitude);
    // You can also access other properties like:
    // - position.coords.accuracy (accuracy of the position in meters)
    // - position.coords.altitude (altitude in meters)
    // - position.coords.altitudeAccuracy (accuracy of the altitude in meters)
    // - position.coords.heading (direction the device is facing in degrees)
    // - position.timestamp (time the position was determined)
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  
  // Call the getLocation function to get user's location
  getLocation();
  