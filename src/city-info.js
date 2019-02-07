import React, { PureComponent } from 'react';

import { Button } from 'semantic-ui-react'
import API from './API';

export default class CityInfo extends PureComponent {



    handleSubmit = () => {
        console.log(this.props)
        let newUserEventObject = {
            "event_id": this.props.info.id
        }

        API.joinEvent(newUserEventObject)

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
                    {info.date} 
                    </div>
                    <div id='capcity'>
                        {remainingSpots}
                    </div>
                    
                    {/* <a target="_new"
                        href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}>
                        Wikipedia
                    </a> */}

                </div>
                <img width={240} src={info.image} />
                <div>
                    <Button inverted color='blue' onClick={this.handleSubmit}>
                        JOIN
                    </Button>
                </div>
            </div>
        );
    }
}
