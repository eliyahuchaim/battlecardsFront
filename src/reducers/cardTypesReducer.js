import CardTypes from '../actions/cardTypesActions';


export default function cardTypesReducer(state = {loading: false, userID: 3, currentUser: {}, topUsers: [], singleUser: {}, currentUserCharacters: [], weaponCardTypes: [], classCardTypes: [], vehicleCardTypes: []}, action) {

  let newState;
    switch (action.type) {
      case 'SEEDED_CARD_TYPES':
        newState = Object.assign({}, state, {weaponCardTypes: action.payload.weaponCardTypes, classCardTypes: action.payload.classCardTypes, vehicleCardTypes: action.payload.vehicleCardTypes})
        console.log(newState)
        return newState;
      default:
        return state;

    }
}
