import React, { Component } from 'react'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl'

import CityPin from '../city-pin'
import CityInfo from '../city-info'

// import EVENTS from '../data/events.json'

import './Map.css'

// Importing the form from semantic UI
import { Form } from 'semantic-ui-react'

import API from '../API'

const TOKEN = process.env.REACT_APP_MAPBOX_API_KEY

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
};

const EVENTSURL = 'http://localhost:3001/api/v1/events'

const windowAlert = window.alert;


export default class EventMap extends Component {
    
    state = {
        title: '',
        capacity: 0,
        image: '',
        date: '',
        eventLat: 0,
        eventLong: 0,
        events: [],
        eventSwitch: false,
        viewport: {
            latitude: 37.773,
            longitude: -122.481,
            zoom: 15,
            bearing: 0,
            pitch: 0,
        },
        popupInfo: null
    }

    fetchEvents = () => {
        fetch(EVENTSURL)
            .then(resp => resp.json())
            .then(result => this.setState({
                events: result
            })
        )
    }

    componentDidMount() {
        
            this.fetchEvents()
            this._locateUser()
        
    }

     

        handleSubmit = (event) => {

            let newEventObject = {
                "title": event.target.title.value,
                "capacity": event.target.capacity.value,
                "image": event.target.image.value,
                "date": event.target.date.value,
                "latitude": this.state.eventLat,
                "longitude": this.state.eventLong
            }
            this.setState({
                events: [...this.state.events, newEventObject
                ]
            })
            API.createEvent(newEventObject).then(this.fetchEvents)
            
    }

    _updateViewport = (viewport) => {
        this.setState({ viewport })
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

    _onClick = (params) => {

        if (this.props.username) {
            this.setState({
                eventLat: params.lngLat[1],
                eventLong: params.lngLat[0],
                eventSwitch: true
            })
        } else {
            windowAlert('Please, sign up to make or join an event!')
        }
    }

    _renderCityMarker = (city, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={Number(city.longitude)}
                latitude={Number(city.latitude)} 
                >
                <CityPin size={20} onClick={() => this.setState({ popupInfo: city }, console.log(city))} />
            </Marker>
        );
    }

    _renderPopup() {
        const { popupInfo } = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
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
            <div className='event-map-container'>

                <div className='event-form' style={{ display: this.state.eventSwitch ? 'block' : 'none' }}>
          
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input fluid label="title" placeholder="title" name="title" />
                        <Form.Input fluid label="capacity" placeholder="capacity" name="capacity" />
                        <Form.Input fluid label="image" placeholder="Enter an image URL" name="image" />
                        <Form.Input fluid label="date" placeholder="date" name="date" />
                        <Form.Input fluid label="latitude" placeholder={`${this.state.eventLat}`} name="latitude" />
                        <Form.Input fluid label="longitude" placeholder={`${this.state.eventLong}`} name="longitude" />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                    <br/>
                </Form>

                </div>

            <div className='map-container'>

                    <MapGL
                        {...this.state.viewport}
                        width="100vw"
                        height="100vh"
                        mapStyle="mapbox://styles/rtoshev/cjrjnz97a2svr2snmi3h9pe5s"
                        onViewportChange={this._updateViewport}
                        mapboxApiAccessToken={TOKEN}
                        onClick={this._onClick}
                        >
                        
                        {this.state.events.map(this._renderCityMarker)}

                        {this._renderPopup()}

                        <div className="nav" style={navStyle}>
                            <NavigationControl onViewportChange={this._updateViewport} />
                        </div>

                    </MapGL>
                </div>
            </div>
        );
    }

}
