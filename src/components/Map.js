import React, { Component } from 'react'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl'

import CityPin from '../city-pin'
import CityInfo from '../city-info'

import EVENTS from '../data/events.json'

const TOKEN = process.env.REACT_APP_MAPBOX_API_KEY

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};


export default class Map extends Component {

    componentDidMount() {
        this._locateUser()
    }

      state = {
            viewport: {
                latitude: 37.773,
                longitude: -122.481,
                zoom: 15,
                bearing: 0,
                pitch: 0
            },
            popupInfo: null
        }

    _updateViewport = (viewport) => {
        this.setState({ viewport });
    }

    _locateUser() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
        navigator.geolocation.getCurrentPosition(position => {
            this._updateViewport({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                 zoom: 15,
            });
        });
    }

    _renderCityMarker = (city, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={city.longitude}
                latitude={city.latitude} >
                <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} />
            </Marker>
        );
    }

    _renderPopup() {
        const { popupInfo } = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                anchor="top"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeOnClick={false}
                onClose={() => this.setState({ 
                    popupInfo: null 
                    })} >
                <CityInfo info={popupInfo} />
            </Popup>
        );
    }

    render() {

        return (
            <MapGL
                {...this.state.viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/rtoshev/cjrjnz97a2svr2snmi3h9pe5s"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={TOKEN} >

                {EVENTS.map(this._renderCityMarker)}

                {this._renderPopup()}

                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>

            </MapGL>
        );
    }

}
