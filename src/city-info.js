import React, { PureComponent } from 'react';

import { Button } from 'semantic-ui-react'
import API from './API';

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

        console.log(info)

        return (
            <div>
                <div>
                    <div id='title'>
                        <b> {info.title}</b>
                    </div>
                    <div id='date'>
                    {info.date} 
                    </div>
                    <div id='capacity'>
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
