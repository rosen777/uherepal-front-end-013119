import React, {Component} from 'react'

import API from '../API'

import { Card, Image, Icon} from 'semantic-ui-react'

import './Joined.css'

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
        const { username } = this.props
        const userNameCap = this.props.username.toUpperCase()

        return (
            <div style={this.style} className='user-list'>
                <h3 className='history-heading'>{`${userNameCap}'s History of Events`}</h3>
                {events.length === 0 && <p>Sorry, you don't have any events.</p>}
                {
                    events.map(event =>
                        <div>
                            <Card color='grey' raised='true' className='event-card'>
                            <Image src={`${event.image}`} />
                            <Card.Content>
                            <Card.Header>
                                {event.title}
                            </Card.Header>
                                <Card.Content extra>
                                <a>
                                <Card.Description className='event-card-capacity'>
                                <Icon name='users' color='grey'/>
                                    {event.capacity}
                                </Card.Description>
                                </a>
                                <a>
                                <Card.Description className='event-card-date'>
                                    <Icon name='calendar alternate' color='grey' />
                                    {event.date}
                                </Card.Description>
                                </a>
                            </Card.Content>
                            </Card.Content>
                        </Card>
                        <br />
                        </div>
                    )
                }
                {console.log(this.state.events)}
            </div>
        )
    }
}

export default Joined
