import React, {Component} from 'react'

import API from '../API'

import { Card, Image, Icon} from 'semantic-ui-react'

import Moment from 'react-moment';
import 'moment-timezone';



import './Joined.css'

class Joined extends Component {
    state = {
        events: []
    }

    getEvents() {
        API.getEvents()
        .then(
                events => this.setState({
                events    
            })
        )
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
        const dateToFormat = events.date

       
        let guests =[ ]
        return (
            <span style={this.style} className='user-list'>
                <h3 className='history-heading'>{`${userNameCap}'s History of Events`}</h3>
                {events.length === 0 && <p>Sorry, you don't have any events.</p>}
                {
                    <Card.Group>
                    {
                    events.map(event =>
                        
                            <Card color='grey' raised='true' className='event-card'>
                            <Image src={`${event.image}`} />
                            <Card.Content>
                            <Card.Header>
                                {event.title}
                            </Card.Header>
                                <Card.Content extra>
                                <a>
                                <Card.Description>
                                {`${event.users.map(user =>  (user.username))}`}
                                </Card.Description>
                                <Card.Description className='event-card-capacity'>
                                <Icon name='users' color='grey'/>
                                    {event.users.length}    
                                    {` ${event.users.map(user => (user.username)).join(', ')}`}
                        
                                </Card.Description>
                                </a>
                                <a>
                                <Card.Description className='event-card-date'>
                                    <Icon name='calendar alternate' color='grey' />
                                    <Moment format="DD/MM/YYYY">
                                        {dateToFormat}
                                    </Moment>
                                </Card.Description>
                                <Card.Description className='event-card-time'>
                                    <Icon name='clock' color='grey' />
                                    <Moment format="HH:mm">
                                        {dateToFormat}
                                    </Moment>
                                </Card.Description>
                                </a>
                                </Card.Content>
                                </Card.Content>
                            </Card>
                    )
                 }
                    </Card.Group>
                    
                }
             
             
            </span>
        )
    }
}

export default Joined
