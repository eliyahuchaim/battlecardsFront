const URL = 'http://localhost:3000/api/v1/users'


export default class UserApi {


  static createUser(userInfo){
    const data = {user: {
      name: userInfo.name,
      bf1_username: userInfo.bf1_username,
      platform: userInfo.platform,
      username: userInfo.username,
      password: userInfo.password
      }
    }
    return fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }

  static seedTopUsers(){
    return fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
  }


  static getSingleUser(id){
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(resp => resp.json())
  }

  static getCharacters(id){
    return fetch(`http://localhost:3000/api/v1/usersCharacters/${id}`)
    .then(resp => resp.json())
  }

  static login(user_info){
    return fetch('http://localhost:3000/api/v1/login',  {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user_info)
    })
    .then(resp => resp.json())
  }

  static currentUserData(id){
    return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(resp => resp.json())
  }

  static retrieveUserId(){
    return fetch('http://localhost:3000/api/v1/userid', {
      headers: {
        'Authorization': `Bearer ${localStorage.the_key_to_happiness}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'GET'
    })
    .then(resp => resp.json())
  }

}; //end of class
