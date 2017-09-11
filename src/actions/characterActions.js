import CharacterApi from '../api/characterApi';
import {getUserCharacters} from './userActions';

export function createCharacter(characterInfo){
  let user_id = characterInfo.user_id
    return dispatch => {
      return CharacterApi.createCharacter(characterInfo)
        .then(response => {
          getUserCharacters(user_id)
        })
    }
}

export function updateCharacter(characterInfo){
  let userID = characterInfo.user_id
    return dispatch => {
      return CharacterApi.updateCharacter(characterInfo)
      .then(resp => {
        getUserCharacters(userID)
      })
    }
}

export function deleteCharacter(user_id, character_id){
  let userID = user_id
    return dispatch => {
      return CharacterApi.deleteCharacter(character_id)
    }
}
