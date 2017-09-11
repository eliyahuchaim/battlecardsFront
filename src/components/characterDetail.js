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

    goToEditPage = (e) => {
      let id = e.target.id
      this.props.history.push(`/editCharacter/${id}`)
    }

    createCharacterInfo = (character) => {
      var i = 0;
      var totalKills = 0;
      var score = 0;

      character.weapons.forEach(weapon => {
        i++
        totalKills += weapon[`card${i}`].data.kills
      })
      totalKills += character.vehicle_card[0].data.kills;
      totalKills += character.class_card[0].data.kills;
      score += character.class_card[0].data.score;
      // debugger
    return (
      <Card>
        <Image src={character.info[0].avatar !== null ? character.info[0].avatar : character.class_card[0].info.image} />
        <Card.Content>
          <Card.Header>
          {character.info[0].name}
          </Card.Header>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <Icon name="trophy" />
            Score: {score}
            <br/>
            Kills: {totalKills}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.goToEditPage} id={character.info[0].id} >
          Edit Character
          </Button>
        </Card.Content>
      </Card>
    )
  }


  createCharacterCard = () => {
    if (this.props.currentUserCharacters.characters) {
      let currentCharacter = this.findCharacter();
      // debugger
      let characterJSX = {characterInfo: this.createCharacterInfo(currentCharacter), weapons_jsx: this.getWeapons(currentCharacter), class_jsx: this.getClass(currentCharacter), vehicle_jsx: this.getVehicle(currentCharacter)};


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
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <h3> Your Character</h3>
              {jsx.characterInfo}
            </Grid.Column>
            <Grid.Column width={3}>
              <h3> Class Card</h3>
              {jsx.class_jsx}
            </Grid.Column>
            <Grid.Column width={3}>
              <h3> Weapon Cards </h3>
              {jsx.weapons_jsx}
            </Grid.Column>
            <Grid.Column width={3}>
              <h3> Vehicle Card</h3>
              {jsx.vehicle_jsx}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
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
