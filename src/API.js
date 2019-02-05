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
//     return this.get('http://localhost:3001/inventory')
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

}


API.init()

export default API