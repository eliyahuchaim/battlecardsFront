import {add_user} from '../actions/userActions'

export default function usersReducer(state = {loading: false, userID: "", currentUser: {}, topUsers: [], singleUser: {}, currentUserCharacters: [], weaponCardTypes: [], classCardTypes: [], vehicleCardTypes: [], frontEndUser: {}, bf1usernames: [], secondUsersCharacters: []}, action) {
  // console.log('getting user state')
  //console.log("this is state", state, "this is action", action)
  let newState;
  switch (action.type) {
    case 'CREATE_USER':
      newState = Object.assign({}, state, {currentUser: action.payload})
      // console.log("created user action", newState)
      return newState
    case 'SEED_TOP_USERS':
      newState = Object.assign({}, state, {topUsers: action.payload})
      // console.log(newState)
      return newState
    case 'SINGLE_USER':
      newState = Object.assign({}, state, {singleUser: action.payload, loading: false, frontEndUser: {}})
      // console.log("Single User", newState)
      return newState
    case 'LOADING_USER':
      newState = Object.assign({}, state, {loading: true})
      // console.log("in reducer", newState)
      return newState
    case 'LOADING_CHARACTERS':
      newState = Object.assign({}, state, {loading: true})
      return newState
    case 'GOT_CHARACTERS':
      newState = Object.assign({}, state, {currentUserCharacters: action.payload , loading: false})
      // console.log(newState)
      return newState
    case 'LOGGED_IN':
      newState = Object.assign({}, state, {userID: action.user_id} )
      localStorage.setItem("the_key_to_happiness", action.jwt)
      return newState;
    case 'USER_ID':
      newState = Object.assign({}, state, {userID: action.payload.user_id})
        // console.log("user id action", action.payload, newState)
      return newState;
    case 'CURRENT_USER':
      newState = Object.assign({}, state, {currentUser: action.payload, loading: false})
      // console.log("fetching current user data:", newState.currentUser)
      return newState;
    case 'LOGOUT':
      localStorage["the_key_to_happiness"] = "null"
      newState = Object.assign({}, state, {userID: "", currentUser: {}, currentUserCharacters: []})
      return newState;
    case 'BF1_USERNAMES':
      newState = Object.assign({}, state, {bf1usernames: action.payload})
      return newState;
    case 'FRONT_END_USER':
      newState = Object.assign({}, state, {frontEndUser: action.payload, singleUser: {}, loading: false})
      return newState
    case 'GOT_SECOND_USER_CHARACTERS':
      newState = Object.assign({}, state, {secondUsersCharacters: action.payload})
      return newState;
    default:
      return state;
  }
}
