import {combineReducers} from 'redux';
import usersReducer from './usersReducers'
// import weaponsReducer from './weaponsReducer';
import cardTypesReducer from './cardTypesReducer'


export default combineReducers({
  user: usersReducer,
  cardTypes: cardTypesReducer

});




// const defaultState = {
//   loading: false,
//   userID: [],
//   currentUser: {},
//   topUsers: [],
//   singleUser: {}
// };
