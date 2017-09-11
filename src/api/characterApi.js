const URL = 'http://localhost:3000/api/v1/characters'


export default class CharacterApi {

  static createCharacter(characterInfo){

    const payload = { character: {
      name: characterInfo.name,
      user_id: characterInfo.user_id,
      avatar: characterInfo.avatar,
      weapon_card1: characterInfo.mainWeaponID,
      weapon_card2: characterInfo.sidearmID,
      weapon_card3: characterInfo.meleeID,
      vehicle_card: characterInfo.vehicleID,
      class_card: characterInfo.classID
      }
    }

    return fetch(URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.the_key_to_happiness}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
  }

  static updateCharacter(characterInfo){
    let id = characterInfo.characterID;
    const payload = { character: {
      name: characterInfo.name,
      user_id: characterInfo.user_id,
      avatar: characterInfo.avatar,
      weapon_card1: characterInfo.mainWeaponID,
      weapon_card2: characterInfo.sidearmID,
      weapon_card3: characterInfo.meleeID,
      vehicle_card: characterInfo.vehicleID,
      class_card: characterInfo.classID
      }
    }

    return fetch(URL + `/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.the_key_to_happiness}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
  }

  static deleteCharacter(id){
    fetch(URL + `/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.the_key_to_happiness}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }



}
