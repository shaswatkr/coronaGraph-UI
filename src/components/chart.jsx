// import React, { Component } from 'react';

// class Chart extends Component {
//     state = {}

//     static map;
//     static heatmap;

//     initMap = () => {
//         let map = new google.maps.Map(document.getElementById("map"), {
//             zoom: 14,
//             center: {
//                 lat: 28.644800,
//                 lng: 77.216721
//             },
//             mapTypeId: "satellite"
//         });
//         var ArrMarkers = [];
//         var Latitude;
//         var Longitude;
//         heatmap = new google.maps.visualization.HeatmapLayer({
//             data: ArrMarkers,
//             map: map
//         });
//         var ServerData = [{ Latitude: 28.634800, Longitude: 77.216721 }, { Latitude: 28.636800, Longitude: 77.218721 }]
//         for (var i = 0; i < ServerData.length; i++) {

//             Latitude = ServerData[i].Latitude;
//             Longitude = ServerData[i].Longitude;

//             var marker = { location: new google.maps.LatLng(Latitude, Longitude) };
//             ArrMarkers.push(marker);

//         }
//     }

//     toggleHeatmap = () => {
//         heatmap.setMap(heatmap.getMap() ? null : map);
//     }

//     changeGradient = () => {
//         const gradient = [
//             "rgba(0, 255, 255, 0)",
//             "rgba(0, 255, 255, 1)",
//             "rgba(0, 191, 255, 1)",
//             "rgba(0, 127, 255, 1)",
//             "rgba(0, 63, 255, 1)",
//             "rgba(0, 0, 255, 1)",
//             "rgba(0, 0, 223, 1)",
//             "rgba(0, 0, 191, 1)",
//             "rgba(0, 0, 159, 1)",
//             "rgba(0, 0, 127, 1)",
//             "rgba(63, 0, 91, 1)",
//             "rgba(127, 0, 63, 1)",
//             "rgba(191, 0, 31, 1)",
//             "rgba(255, 0, 0, 1)"
//         ];
//         heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
//     }

//     changeRadius = () => {
//         heatmap.set("radius", heatmap.get("radius") ? null : 20);
//     }

//     changeOpacity = () => {
//         heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
//     }

//     render() {
//         return (
//             <>
//                 <div id="floating-panel">
//                     <button onclick="toggleHeatmap()">Toggle Heatmap</button>
//                     <button onclick="changeGradient()">Change gradient</button>
//                     <button onclick="changeRadius()">Change radius</button>
//                     <button onclick="changeOpacity()">Change opacity</button>
//                 </div>
//                 <div id="map"></div>
//             </>
//         );
//     }
// }

// export default Chart;