import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUserCharacters} from '../actions/userActions';
import {Card, Grid, Image, Button, Table, Icon } from 'semantic-ui-react';
import WeaponCardDetail from './weaponCardDetails';
import VehicleCardDetail from './vehicleCardDetails';
import ClassCardDetails from './classCardDetails';



class CharacterDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      characterID: this.props.match.params.id,
      totalKills: 0
    }
  }


  componentDidMount(){
    if (typeof(this.props.userID) === "number") {
      this.props.getUserCharacters(this.props.userID)
      }
  }

  componentWillReceiveProps(nextProps){
    if (typeof(this.props.userID) === "string" && typeof(nextProps.userID) === "number" ){
      this.props.getUserCharacters(nextProps.userID)
    }
  }


  findCharacter = () => {
      return this.props.currentUserCharacters.characters.characters.find(character => {
        return character.info[0].id == this.state.characterID
      })
    }


  createCharacterCard = () => {
    if (this.props.currentUserCharacters.characters) {
      let currentCharacter = this.findCharacter();
      let characterJSX = {weapons_jsx: this.getWeapons(currentCharacter), class_jsx: this.getClass(currentCharacter), vehicle_jsx: this.getVehicle(currentCharacter)};


      return characterJSX
    } else {
      return null
    }
  }

  getWeapons = (character) => {
    // debugger
    let i = 0;
    let kills;
    return character.weapons.map((weapon,index) => {
      i++
      kills += weapon[`card${i}`].data.kills
      return <WeaponCardDetail weaponCard={weapon[`card${i}`].data} key={index} />
    })
  }

  getClass = (character) => {
    // debugger
    return <ClassCardDetails card={character.class_card[0].data} />
  }

  getVehicle = (character) => {
    // debugger
    return <VehicleCardDetail vehicle={character.vehicle_card[0].data} />
  }

  shouldRender = () => {
    let jsx;
    if (this.createCharacterCard()) {
      jsx = this.createCharacterCard()
      return (
        <div>
          {jsx.weapons_jsx}
          {jsx.class_jsx}
          {jsx.vehicle_jsx}
        </div> )
    } else {
      return null
    }
  }


  render(){
    console.log("character detail", this.state)
    return (
      <div>
        {this.shouldRender()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.user.userID,
    currentUser: state.user.currentUser,
    currentUserCharacters: state.user.currentUserCharacters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserCharacters: getUserCharacters
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail)
