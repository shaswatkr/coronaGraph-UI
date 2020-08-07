import React, { Component } from "react";
import { Map, HeatMap, GoogleApiWrapper } from "google-maps-react";

const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)"
];

class MapContainer extends Component {

    render() {
        var coords = JSON.parse(localStorage.getItem("coords"));

        console.log(coords);

        return (
            <div className="map-container">
                <Map google={this.props.google} className={"map"} zoom={13} initialCenter={{ lat: 28.644800, lng: 77.216721 }} onReady={this.handleMapReady} onClick={this.onMapClicked} >
                    <HeatMap gradient={gradient} positions={coords} opacity={1} radius={20} />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyByKgiH6sDDCZIx-LY2UtPhyqIXVbluQ2E",
    libraries: ["visualization"]
})(MapContainer);

