class API {

static init() {
    this.baseURL = 'http://localhost:3001/api/v1'
    this.signinURL = this.baseURL + '/users'
}

static signin(user) {
    return fetch('http://localhost:3001/api/v1/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(resp => resp.json())
}

static validate() {
    return this.get('http://localhost:3001/api/v1/validate')
}

static getEvents () {
    return this.get('http://localhost:3001/api/v1/joined')
}

// static getInventory() {
//     return this.get('http://localhost:3001/invent encoory')
// }

static get(url) {
    const token = localStorage.getItem('token')
    return fetch(url, {
        headers: { 'Authorization': token },
    }).then(resp => resp.json())
}

static createUser(user) {
    return fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(resp => resp.json() )
}

static updateUser(user, id) {
    const token = localStorage.getItem('token')
    return fetch(`http://localhost:3001/api/v1/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
         'Authorization': token
     },
        body: JSON.stringify(user)
    }).then(resp => resp.json()).then(()=> console.log(user))
}

    static updatePassword(password, id) {
        const token = localStorage.getItem('token')
        return fetch(`http://localhost:3001/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(password)
        }).then(resp => resp.json()).then(() => console.log(password))
    }

    static createEvent(newEventObject) {
        return fetch ('http://localhost:3001/api/v1/events', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newEventObject)
        }).then(resp => resp.json())
    }

    static joinEvent(newUserEventObject) {

        return fetch
            ('http://localhost:3001/api/v1/joinevent', {
             method: 'POST', 
             headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }, 
             body: JSON.stringify(
                 newUserEventObject
                )
            }
        )
    }

    static cancelEvent(deletedUserEventObject) {
        return fetch
        ('http://localhost:3001/api/v1/cancelevent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }, 
                body: JSON.stringify(
                deletedUserEventObject
                )
             }
        )
    }

    static deleteEvent(deletedEventObject) {
        return fetch(`http://localhost:3001/api/v1/deleteevent`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(
            deletedEventObject
               ) 
           }
        )
    }
    
    

}



API.init()

export default API