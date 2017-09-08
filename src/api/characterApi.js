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
    debugger
    return fetch(URL, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
  }




}
