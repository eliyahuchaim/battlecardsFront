import CardTypesApi from '../api/cardTypesApi';


export function seedAllCardTypes(){
  return dispatch => {
    return CardTypesApi.seedCardTypes()
      .then(resp => {
        dispatch({
          type: 'SEEDED_CARD_TYPES',
          payload: resp
        })
      })
  }
}
