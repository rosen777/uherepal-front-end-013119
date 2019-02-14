import React, { Component } from 'react'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl'

import moment from 'moment'

import CityPin from '../city-pin'
import CityInfo from '../city-info'
import MarkerPin from '../marker-pin'


// import EVENTS from '../data/events.json'

// import './Map.css'

import './EventMap.css'

// Importing the form from semantic UI
import { Button, Form } from 'semantic-ui-react'

import { DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

import API from '../API'

const TOKEN = process.env.REACT_APP_MAPBOX_API_KEY



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

const pickerGroupStyle = {
    marginTop: '0.5%'
};

const dateTimeStyle = {
    marginBottom: '0.5%',
}

const dateRangeStyle = {
    display: 'inline-block',
}

const dateRangeInputStyle = {
    marginTop: '0.5%'
}


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
        imageSwitch: false,
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
                "image": this.state.image,
                "date": this.state.dateTime,
                "latitude": this.state.eventLat,
                "longitude": this.state.eventLong,
                "host": this.props.username
            }
            this.setState({
                events: [...this.state.events, newEventObject
                ],
                imageSwitch: false,
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

    uploadWidget = () => {
        //---- maybe not this ne: eslint-disable-next-line no-undef
        // cloudinariy api is loaded directly in index.html
        window.cloudinary.openUploadWidget({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset: 'uherepal', tags:['event'] },
          function (error, result) {
            if(result) {
              this.setState({
                  image: result[0]['url'],
                imageSwitch: true
              })
                } else {
                result = 'http://res.cloudinary.com/dld2hjhpb/image/upload/v1550094337/nqirfhtrj0xt6ctiqwzt.png'
                    this.setState({
                        image: result,
                        imageSwitch: true
                    })
                }
            }.bind(this)
            )
           
    }

    render() {

        return (
            
                <div className = 'event-map-container' >
                    {
                this.state.eventSwitch ?
                <div className = 'add-image-container'>
                 <Button onClick={this.uploadWidget} className='upload-btn' color='blue'>
                   Add an Event Image
                </Button> 
                </div> : null
            }

                <div className='event-form' style={{ display: this.state.eventSwitch && this.state.imageSwitch ? 'block' : 'none' }}>
          
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input fluid label="title" placeholder="title" name="title" />
                        <Form.Input fluid label="capacity" placeholder="capacity" name="capacity" />
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
              
                    <Form.Button color='blue'>Submit</Form.Button>
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
                    <div className='date-range-input' style={pickerGroupStyle} >
                    <div style={dateRangeStyle}>
                    <h1 style={dateTimeStyle}>Select event start and end date:</h1>
                     <span className='border-gradient-purple'></span>
                    </div>
                    <div style={dateRangeInputStyle}>
                    <DatesRangeInput
                        name="datesRange"
                        placeholder="Select Start Date - End Date"
                        minDate={moment()}
                        value={this.state.datesRange}
                        iconPosition="left"
                        onChange={this.handleChange}
                        style={pickerStyle}
                    />
                    </div>   
                </div>
                </div>
            </div>


        );
    }

}
