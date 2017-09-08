const URL = 'http://localhost:3000/api/v1/cardTypes';


export default class CardTypesApi{

    static seedCardTypes(){
      return fetch(URL)
      .then(resp => resp.json())
    };




};
