import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Table, Icon, Form, Menu } from 'semantic-ui-react';
import { getSingleUserByID, getUserCharacters } from '../actions/userActions';
import {createCharacter} from '../actions/characterActions';
import WeaponCardDetail from './weaponCardDetails';
import VehicleCardDetail from './vehicleCardDetails';
import ClassCardDetails from './classCardDetails';





class CreateCharacter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.userID,
      name: "",
      avatar: "",
      mainWeaponID: "",
      sidearmID: "",
      meleeID: "",
      vehicleID: "",
      classID: "",
      showForm: true,
      showMainWeapon: false,
      showSidearm: false,
      showMelee: false,
      showVehicle: false,
      showClass: false
    }
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
    let weapons_arr = this.props.singleUser.weapons.filter(weapon => {
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
      [e.currentTarget.dataset.name]: e.currentTarget.id
    })
  }

  renderMainWeapons = () => {
    let mainWeapons = this.weaponsFilter("cardType.category != 'SIDEARM' && cardType.category != 'GADGET' && cardType.category != 'GRENADE' && cardType.category != 'MELEE' && weapon.character_id === null")
    console.log(mainWeapons.length)
      return mainWeapons.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} id={weapon.id} weaponCard={weapon} name={"mainWeaponID"} key={index} />
      })
  }

  // componentDidMount(){
  //   this.renderMainWeapons()
  // }

  renderSidearms = () => {
    let sidearms_arr = this.weaponsFilter("cardType.category === 'SIDEARM' || cardType.category === 'GRENADE'")
    console.log(sidearms_arr.length)
      return sidearms_arr.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} name={"sidearmID"} id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderMeleeWeapons = () => {
    let melee_arr = this.weaponsFilter("cardType.category === 'MELEE'")
    console.log(melee_arr.length)
      return melee_arr.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} name={"meleeID"} id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderVehicles = () => {
    let orderedByKills = this.props.singleUser.vehicles.sort((a,b) => {
      return b.kills - a.kills
    })
    let filteredVehicles = orderedByKills.filter(vehicle => {
      return vehicle.character_id === null
    })
    return filteredVehicles.map((vehicle, index) => {
      return <VehicleCardDetail id={vehicle.id} onClick={this.addCard} name={"vehicleID"} vehicle={vehicle} key={index} />
    })
  }

  renderClasses = () => {
    let orderedByKills = this.props.singleUser.classes.sort((a,b) => {
      return b.score - a.score
    })
    let filteredClasses = orderedByKills.filter(classCard => {
      return classCard.character_id === null
    })
    return filteredClasses.map((classCard, index) => {
      return <ClassCardDetails onClick={this.addCard} name={"classID"} id={classCard.id} card={classCard} key={index} />
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
    // debugger
    for (var key in this.state) {
      if (this.state[key] === true){
        this.setState({
          [key]: false,
          [e.currentTarget.dataset.set] : true
        })
      }
    }
  }

  createFullCharacter = () => {
    this.props.createCharacter(this.state)
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
        <Menu.Item name="Create Character" onClick={this.createFullCharacter}/>

      </Menu>
    )
  }


  render(){
    console.log("in the char state", this.state, this.props)
    return (
      <div>
        {this.headerButtons()}
        {this.whatToRender()}
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
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
   getSingleUserByID : getSingleUserByID,
   getUserCharacters: getUserCharacters,
   createCharacter : createCharacter

 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter);








// function loop(object) {
//     for (var element in object ) {
//         debugger
//         console.log(object[element])
//   	   if (object[element] === true) {
//   		     object[element] = false}
//   		       hash.showClass = true
//            }
// }