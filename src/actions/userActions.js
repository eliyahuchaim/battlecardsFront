import UserApi from '../api/usersApi'

export function createUser(user){
  return dispatch => {
      return UserApi.createUser(user).then(response => {
        dispatch({
          type: 'CREATE_USER',
          payload: response
      })
    })
  }
}

export function seedUsers(){
  return dispatch => {
    return UserApi.seedTopUsers()
    .then(resp => {
      dispatch({
        type: 'SEED_TOP_USERS',
        payload: resp
      })
    })
  }
};

export function getSingleUserByID(id){
  return dispatch => {
    dispatch({type: 'LOADING_USER'});
    return UserApi.getSingleUser(id)
    .then(resp => {
      dispatch({
        type: 'SINGLE_USER',
        payload: resp
      })
    })
  }
}

export function getUserCharacters(id){
  return dispatch => {
    dispatch({type: 'LOADING_CHARACTERS'});
    return UserApi.getCharacters(id)
    .then(resp => {
      dispatch({
        type: 'GOT_CHARACTERS',
        payload: resp
      })
    })
  }
}

export function login(user_info){
  return dispatch => {
    return UserApi.login(user_info)
    .then(resp => {
      dispatch({
        type: 'LOGGED_IN',
        jwt: resp["the_key_to_happiness"],
        user_id: resp.user_id
      })
    })
  }
}