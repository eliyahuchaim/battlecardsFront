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
