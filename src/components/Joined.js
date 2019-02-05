import React, {Component} from 'react'

import API from '../API'

class Joined extends Component {
    state = {
        events: []
    }

    getEvents() {
        API.getEvents()
        .then(events => this.setState({
            events    
        }))
    }

    style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    componentDidMount() {
        const { username, history } = this.props
        if (!username) {
            history.push('/signin')
        } else {
            this.getEvents()
        }
    }

    render() {
        const { events } = this.state

        console.log(this.state)

        return (
            <div style={this.style} className='user-list'>
                <h3>Here are your events:</h3>
                {events.length === 0 && <p>Sorry, you don't have any events.</p>}
                {
                    events.map(event =>
                        <div>
                        <h1>{event.id}
                        </h1>
                        <h1>
                    {event.title}
                        </h1> 
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Joined
