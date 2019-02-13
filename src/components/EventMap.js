import React, { Component } from 'react'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl'

import moment from 'moment'

import CityPin from '../city-pin'
import CityInfo from '../city-info'
import MarkerPin from '../marker-pin'

import Spinner from './Spinner'
import Images from './Images'


// import EVENTS from '../data/events.json'

// import './Map.css'

import './EventMap.css'

// Importing the form from semantic UI
import { Button, Form } from 'semantic-ui-react'

import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

import API from '../API'

const TOKEN = process.env.REACT_APP_MAPBOX_API_KEY
let uploadedImageURL = ''



const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
    datesRange: '',
};


const pickerStyle = {
    width: 800,
    margin: '1% 1% 1% 1%', 
};

const pickerGroup = {
    borderTop: '1px solid grey',
    marginTop: '0.5%'
};

const dateTimeStyle = {
    color: 'grey',
    marginTop: '0.5%'
}


const EVENTSURL = 'http://localhost:3001/api/v1/events'

const API_URL = `https://api.cloudinary.com/v1_1/dld2hjhpb/image/upload`

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
        dateTime: '',
        datesRange: '',
        uploadingInfo: false,
        filteredEventsRange: [],
        viewport: {
            latitude: 37.773,
            longitude: -122.481,
            zoom: 15,
            bearing: 0,
            pitch: 0,
        },
        mapEvents: {},
        marker: {
            latitude: 37.773,
            longitude: -122.481,
        },
        popupInfo: null
    }

    fetchEvents = () => {
        return fetch(EVENTSURL)
            .then(resp => resp.json())
            .then(result => this.setState({
                events: result
            } )
        )
    }

    componentDidMount() {
        
            this.fetchEvents()
            this._locateUser()
        
    }

    
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }


    setDate = () => {
        this.setState({
            datesRange: this.state.events.date
        })
    }

    filteredEventsRange = () => {
        const range = this.state.datesRange.split(' - ')
        const minDate = moment(range[0], 'DD-MM-YYYY')
        const maxDate = moment(range[1], 'DD-MM-YYYY')
        const eventDate = moment(this.state.events.date)
        let filteredEvents = []

        if (!this.state.datesRange) {
            filteredEvents = this.state.events.filter(event => {
                return moment(event.date).isAfter(moment())
            }
                )
        } else {
             filteredEvents = this.state.events.filter(event => {
                return moment(event.date).isBetween(minDate, maxDate)
            }
            
            )

        }

        return filteredEvents

    }
     

    handleSubmit = (event) => {

            let newEventObject = {
                "title": event.target.title.value,
                "capacity": event.target.capacity.value,
                "image": event.target.image.value,
                "date": this.state.dateTime,
                "latitude": this.state.eventLat,
                "longitude": this.state.eventLong,
                "host": this.props.username
            }
            this.setState({
                events: [...this.state.events, newEventObject
                ],
                eventSwitch: false
            })
            API.createEvent(newEventObject)
                .then(event => {
                    this.fetchEvents()
                    this.joinEvent(event.id)
                })
            
    }

    joinEvent = (id) => {
        let newUserEventObject = {
            "event_id": id
        }

        API.joinEvent(newUserEventObject).then(this.fetchEvents)

    }

    _logDragEvent = (name, event) => {
        this.setState({
            eventLong: event.lngLat[0],
            eventLat: event.lngLat[1],
            
        })   
    }

    _onMarkerDragStart = (event) => {
        this._logDragEvent('onDragStart', event)
    }

    _onMarkerDrag = (event) => {
        this._logDragEvent('onDrag', event)
    }

    _onMarkerDragEnd = (event) => {
        this._logDragEvent('onDragEnd', event)
        this.setState({
                eventLong: event.lngLat[0],
                eventLat: event.lngLat[1]
        })
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
            })
        })
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
                <CityPin size={20} 
                onClick={
                    () => this.setState({ popupInfo: city })
                } 
                />
            </Marker>
        );
    }

    renderNewMarker = (city, index) => {
        if(this.state.eventSwitch === true) {
            return (<Marker
                key={`marker-${index}`}
                longitude={(this.state.eventLong)}
                latitude={(this.state.eventLat)}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd} >
                <MarkerPin size={20} />
            </Marker>)
        }
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
                <CityInfo info={popupInfo} username={this.props.username} fetchEvents={this.fetchEvents} />
            </Popup>
        );
    }

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat,
            }
        })
    }

    _onMarkerDragStart = (event) => {
        this._logDragEvent('onDragStart', event);
    };

    _onMarkerDrag = (event) => {
        this._logDragEvent('onDrag', event);
    };

    _onMarkerDragEnd = (event) => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
            }
        });
    };

    uploadWidget() {
        //---- maybe not this ne: eslint-disable-next-line no-undef
        // cloudinariy api is loaded directly in index.html
        let uploadImage
        window.cloudinary.openUploadWidget({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset: 'uherepal', tags:['event'] },
            function (error, result) {
                console.log(result[0]['url']);
                uploadedImageURL = result[0]['url']
                console.log(uploadedImageURL)
            })
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
                        <DateTimeInput
                            label="date / time"
                            name="dateTime"
                            placeholder="Select Date and Time"
                            value={this.state.dateTime}
                            iconPosition="left"
                            onChange={this.handleChange}
                        />
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
                        height="80vh"
                        mapStyle="mapbox://styles/rtoshev/cjrjnz97a2svr2snmi3h9pe5s"
                        onViewportChange={this._updateViewport}
                        mapboxApiAccessToken={TOKEN}
                        onClick={this._onClick}
                        onMouseOver={this._renderPopup}
                        >
                        
                        {this.filteredEventsRange().map(this._renderCityMarker)}

                        {this.renderNewMarker()}

                        {this._renderPopup()}

                        <div className="nav" style={navStyle}>
                            <NavigationControl onViewportChange={this._updateViewport} />
                        </div>

                    </MapGL>
                    <div className='date-range-input' style={pickerGroup}>
                    <h1 style={dateTimeStyle}>Select event start and end date:</h1>
                    <DatesRangeInput
                        name="datesRange"
                        placeholder="Select Start Date - End Date"
                        minDate={moment()}
                        value={this.state.datesRange}
                        iconPosition="left"
                        onChange={this.handleChange}
                        style={pickerStyle}
                    />
                        <button onClick={this.uploadWidget} className="upload-button">
                            Add Event Image
                          </button>
                       
                </div>
                </div>
            </div>


        );
    }

}
