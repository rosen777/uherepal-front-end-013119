import React, { PureComponent } from 'react';

export default class CityInfo extends PureComponent {

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
            </div>
        );
    }
}
