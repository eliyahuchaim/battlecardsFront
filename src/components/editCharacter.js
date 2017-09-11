import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Table, Icon, Form, Menu } from 'semantic-ui-react';
import { getSingleUserByID, getUserCharacters, getCurrentUserDate } from '../actions/userActions';
import {updateCharacter, deleteCharacter} from '../actions/characterActions';
import WeaponCardDetail from './weaponCardDetails';
import VehicleCardDetail from './vehicleCardDetails';
import ClassCardDetails from './classCardDetails';

class EditCharacter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      characterID: this.props.match.params.id,
      user_id: this.props.userID,
      name: "",
      avatar: "",
      mainWeaponID: "",
      sidearmID: "",
      meleeID: "",
      vehicleID: "",
      classID: "",
      mainWeaponTypeID: "",
      sidearmTypeID: "",
      meleeWeaponTypeID: "",
      vehicleTypeID: "",
      classTypeID: "",
      showForm: true,
      showMainWeapon: false,
      showSidearm: false,
      showMelee: false,
      showVehicle: false,
      showClass: false
    }
  }

  componentDidMount(){
    if (typeof(this.props.userID) === "number") {
      this.props.getUserCharacters(this.props.userID)
      .then(resp => {this.props.getCurrentUserDate(this.props.userID)})
      .then(resp => {this.updateStateWithCharacter()})
      }
  }

  componentWillReceiveProps(nextProps){
    if (typeof(this.props.userID) === "string" && typeof(nextProps.userID) === "number" ){
      this.props.getUserCharacters(nextProps.userID)
      .then(resp => {this.props.getCurrentUserDate(this.props.userID)})
      .then(resp => {this.updateStateWithCharacter()})
    }
  }

  updateStateWithCharacter = () => {
    let id = this.props.match.params.id
    let foundCharacter = this.props.currentUserCharacters.characters.characters.find(character => {
      return character.info[0].id == id
    })
      this.setState({
        name: foundCharacter.info[0].name,
        avatar: foundCharacter.info[0].avatar,
        mainWeaponID: foundCharacter.weapons[0]["card1"].data.id,
        sidearmID: foundCharacter.weapons[1]["card2"].data.id,
        meleeID: foundCharacter.weapons[2]["card3"].data.id,
        vehicleID: foundCharacter.vehicle_card[0].data.id,
        classID: foundCharacter.class_card[0].data.id,
        mainWeaponTypeID: foundCharacter.weapons[0]["card1"].info.id,
        sidearmTypeID: foundCharacter.weapons[1]["card2"].info.id,
        meleeWeaponTypeID: foundCharacter.weapons[2]["card3"].info.id,
        vehicleTypeID: foundCharacter.vehicle_card[0].info.id,
        classTypeID: foundCharacter.class_card[0].info.id
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  firstForm = (event) => {
    event.preventDefault();
    this.setState({
      showForm: false,
      showMainWeapon: true
    })
  }

  characterForm = () => {
    return (
      <Form onSubmit={this.firstForm}>
        <Form.Group unstackable widths={2}>
          <Form.Input name="name" label='Character Name' placeholder='Character Name' onChange={this.handleChange} />
          <Form.Input name="avatar" label='Avatar Image URL' placeholder='Avatar image will be defaulted to class image if left blank' onChange={this.handleChange}/>
          <Button type="submit">Next</Button>
        </Form.Group>
      </Form>
    )
  }

  weaponsFilter = (condition) => {
    let weapons_arr = this.props.currentUser.weapons.filter(weapon => {
      let cardType = this.props.weaponCardTypes.find(card => {
        return card.id === weapon.weapon_card_type_id
      })
      return eval(condition)
    })
    return weapons_arr.sort((a,b) =>{
      return b.kills - a.kills
    })
  }

  addCard = (e) => {
    this.setState({
      [e.currentTarget.dataset.name]: e.currentTarget.id,
      [e.currentTarget.dataset.typeName]: e.currentTarget.dataset.type
    })
  }

  renderMainWeapons = () => {
    let mainWeapons = this.weaponsFilter("cardType.category != 'SIDEARM' && cardType.category != 'GADGET' && cardType.category != 'GRENADE' && cardType.category != 'MELEE' && weapon.character_id === null")
    // console.log(mainWeapons.length)
      return mainWeapons.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} id={weapon.id} weaponCard={weapon} name={"mainWeaponID"} typeID={weapon.weapon_card_type_id} typeName={"mainWeaponTypeID"} key={index} />
      })
  }

  renderSidearms = () => {
    let sidearms_arr = this.weaponsFilter("cardType.category === 'SIDEARM' || cardType.category === 'GRENADE'")
    // console.log(sidearms_arr.length)
      return sidearms_arr.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} typeID={weapon.weapon_card_type_id} name={"sidearmID"} typeName={"sidearmTypeID"} id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderMeleeWeapons = () => {
    let melee_arr = this.weaponsFilter("cardType.category === 'MELEE'")
    // console.log(melee_arr.length)
      return melee_arr.map((weapon,index ) => {
        return <WeaponCardDetail typeID={weapon.weapon_card_type_id} typeName={"meleeWeaponTypeID"} onClick={this.addCard} name={"meleeID"} id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderVehicles = () => {
    let orderedByKills = this.props.currentUser.vehicles.sort((a,b) => {
      return b.kills - a.kills
    })
    let filteredVehicles = orderedByKills.filter(vehicle => {
      return vehicle.character_id === null
    })
    return filteredVehicles.map((vehicle, index) => {
      return <VehicleCardDetail typeID={vehicle.vehicle_card_type_id} typeName={"vehicleTypeID"} id={vehicle.id} onClick={this.addCard} name={"vehicleID"} vehicle={vehicle} key={index} />
    })
  }

  renderClasses = () => {
    let orderedByKills = this.props.currentUser.classes.sort((a,b) => {
      return b.score - a.score
    })
    let filteredClasses = orderedByKills.filter(classCard => {
      return classCard.character_id === null
    })
    return filteredClasses.map((classCard, index) => {
      return <ClassCardDetails onClick={this.addCard} name={"classID"} id={classCard.id}
      typeID={classCard.class_type_id} typeName={"classTypeID"} card={classCard} key={index} />
    })
  }





  whatToRender = () => {
    if (this.state.showForm){
      return (<div> {this.characterForm()} </div>)
      } else if (this.state.showMainWeapon) {
        return (<div> <h2> Pick Your Main Weapon </h2> <Card.Group> {this.renderMainWeapons()} </Card.Group> </div>)
      } else if (this.state.showSidearm) {
        return (<div> <h2> Pick Your Sidearm Weapon </h2> <Card.Group> {this.renderSidearms()} </Card.Group> </div>)
      } else if (this.state.showMelee) {
        return ( <div> <h2> Pick Your Melee Weapon </h2> <Card.Group> {this.renderMeleeWeapons()} </Card.Group> </div>)
      } else if (this.state.showVehicle) {
        return (<div> <h2> Pick Your Vehicle Card </h2> <Card.Group> {this.renderVehicles()} </Card.Group> </div>)
      } else if (this.state.showClass) {
        return (<div> <h2> Pick Your Class Card </h2><Card.Group> {this.renderClasses()} </Card.Group> </div>)
      }
  }


  changeRenderState = (e) => {
    for (var key in this.state) {
      if (this.state[key] === true){
        this.setState({
          [key]: false,
          [e.currentTarget.dataset.set] : true
        })
      }
    }
  }

  deleteCharacterAction = () => {
    this.props.deleteCharacter(this.state.user_id, this.state.characterID)
    this.props.history.push('/characters')
  }

  updateCharacterAction = () => {
    this.props.updateCharacter(this.state).then(resp => {this.props.history.push('/characters')})
  }

  characterCard = () => {
    let vehicleName;
    let classCard;
    let foundVehicle;
    let mainWeaponName;
    let secondaryWeaponName;
    let meleeWeaponName;
    let classCardName;
    let mainFoundWeapon;
    let foundSecondaryWeapon;
    let foundMeleeWeapon;


    if (this.state.vehicleTypeID !== "") {
      foundVehicle = this.props.vehicleCardTypes.find(vehicle => {
        return vehicle.id == this.state.vehicleTypeID
      })
      vehicleName = foundVehicle.name
    }

    if (this.state.mainWeaponTypeID !== ""){
      mainFoundWeapon = this.props.weaponCardTypes.find(weapon => {
        return weapon.id == this.state.mainWeaponTypeID
      })
      mainWeaponName = mainFoundWeapon.name
    }

    if (this.state.sidearmTypeID !== ""){
      foundSecondaryWeapon = this.props.weaponCardTypes.find(weapon => {
        return weapon.id == this.state.sidearmTypeID
      })
      secondaryWeaponName = foundSecondaryWeapon.name
    }

    if (this.state.meleeWeaponTypeID !== ""){
      foundMeleeWeapon = this.props.weaponCardTypes.find(weapon => {
        return weapon.id == this.state.meleeWeaponTypeID
      })
      meleeWeaponName = foundMeleeWeapon.name
    }

    if (this.state.classTypeID !== ""){
      classCard = this.props.classCardTypes.find(classC => {
        return classC.id == this.state.classTypeID
      })
      classCardName = classCard.name
    }

    return (
      <Card>
        <Image src={ this.state.avatar !== null ? this.state.avatar : 'https://data2.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-1/bf1_pdp_keyart_3840x2160_en_ww_standardedition_v1.jpg.jpg' }/>
        <Card.Content>
          <Card.Header>
          {this.state.name}
          </Card.Header>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <Icon name="trophy" />
            Score: {""}
            <br/>
            Kills: {""}
            <br/>
            Vehicle: {vehicleName}
            <br/>
            Class: {classCardName}
            <br/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        Main Weapon: {mainWeaponName}
        <br/>
        Secondary Weapon: {secondaryWeaponName}
        <br/>
        Melee Weapon: {meleeWeaponName}
        </Card.Content>
        <Button onClick={this.deleteCharacterAction} color="red" >
          Delete Character
        </Button>
      </Card>
    )
  }


  headerButtons = () => {
    return (
      <Menu>
        <Menu.Item name="Name Your Character" data-set="showForm" onClick={this.changeRenderState}/>
        <Menu.Item name="Add Main Weapon" data-set="showMainWeapon" onClick={this.changeRenderState}/>
        <Menu.Item name="Add Sidearm Weapon" data-set="showSidearm" onClick={this.changeRenderState}/>
        <Menu.Item name="Add Melee Weapon" data-set="showMelee" onClick={this.changeRenderState}/>
        <Menu.Item name="Add Vehicle Card" data-set="showVehicle" onClick={this.changeRenderState}/>
        <Menu.Item name="Add Class Card" data-set="showClass" onClick={this.changeRenderState}/>
        <Menu.Item color="blue" name="Update Character" onClick={this.updateCharacterAction}/>
      </Menu>
    )
  }

  shouldRender = () => {
    if (this.props.currentUserCharacters.characters) {
      return this.whatToRender()
    } else {
      return null
    }
  };


  render(){
    console.log("checking state", this.state, this.props);
    return (
      <div>
        {this.headerButtons()}
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
            <h2> Your Character </h2>
              {this.characterCard()}
            </Grid.Column>
            <Grid.Column width={8}>
              {this.shouldRender()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    currentUserCharacters: state.user.currentUserCharacters,
    userID: state.user.userID,
    singleUser: state.user.singleUser,
    loading: state.user.loading,
    weaponCardTypes: state.cardTypes.weaponCardTypes,
    vehicleCardTypes: state.cardTypes.vehicleCardTypes,
    classCardTypes: state.cardTypes.classCardTypes

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   getUserCharacters: getUserCharacters,
   getCurrentUserDate: getCurrentUserDate,
   updateCharacter: updateCharacter,
   deleteCharacter: deleteCharacter
 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacter);
