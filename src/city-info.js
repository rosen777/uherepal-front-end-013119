import React, { PureComponent } from 'react';

import { Button } from 'semantic-ui-react'
import API from './API';

import { Icon } from 'semantic-ui-react'

import Moment from 'react-moment';
import 'moment-timezone';

export default class CityInfo extends PureComponent {


    handleSubmit = event => {

        let newUserEventObject = {
            "event_id": this.props.info.id
        }
        event.target.disabled = true
        event.target.innerText = 'JOINED'
        API.joinEvent(newUserEventObject).then(() => {
            this.props.fetchEvents()
        })

    }


    render() {
        
        const { info } = this.props;
        const displayName = `${info.title}, 
        \n 
        ${info.date}`;
        const capacity = `${info.capacity}`
        const remainingSpots = `${capacity} spots left`

        return (
            <div>
                <div>
                    <div id='title'>
                        <b> {info.title}</b>
                    </div>
                    <div id='date'>
                        <Icon name='calendar alternate' />
                        <Moment format="DD/MM/YYYY">{info.date}</Moment> 
                    </div>
                    <div id='time'>
                        <Icon name='clock' />
                        <Moment format="HH:mm">{info.date}</Moment>
                    </div>
                    <div id='capacity'>
                        <Icon name='users' />
                        {remainingSpots}
                    </div>
                    
                    {/* <a target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}>
                        Wikipedia
                    </a> */}

                </div>
                <img width={240} src={info.image} />
                <div>
                    {
                    this.props.info.users.map(user => user.username).includes(this.props.username) ?
                    <Button color='green' onClick={this.handleSubmit}
                        disabled={true}> JOINED!</Button> : 
                    <Button inverted color='blue' onClick={this.handleSubmit}>
                        JOIN
                    </Button> 
                    }
                </div>
            </div>
        );
    }
}
