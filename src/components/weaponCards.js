import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import WeaponCardDetail from './weaponCardDetails';
import { getSingleUserByID, getCurrentUserDate } from '../actions/userActions';



class WeaponCards extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      topTen: true,
      mainWeapons: false,
      sidearms: false,
      melee: false,
      grenades: false
    }
  }


  componentDidMount(){
    if (typeof(this.props.userID) === "number") {
      this.props.getCurrentUserDate(this.props.userID)
      }
  }

  componentWillReceiveProps(nextProps){
    if (typeof(this.props.userID) === "string" && typeof(nextProps.userID) === "number" ){
      this.props.getCurrentUserDate(nextProps.userID)
    }
  }


  renderAllWeaponCards = () => {
    let weapons = this.orderByKills()

    let orderedByKills = weapons.map((weapon, index) => {
      return <WeaponCardDetail weaponCard={weapon} key={index} />
    })
    return orderedByKills
  }

  orderByKills = () => {
    return this.props.currentUser.weapons.sort((a,b) => {
      return b.kills - a.kills
    })
  }

  topTenWeapons = () => {
    let jsx = this.props.currentUser.weapons.sort((a,b) => {
      return b.kills - a.kills
    })

    let weapons_jsx = jsx.map((weapon, index) => {
      return <WeaponCardDetail weaponCard={weapon} key={index} />
    })
    return weapons_jsx.slice(0,10)
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

  renderMainWeapons = () => {
    let mainWeapons = this.weaponsFilter("cardType.category != 'SIDEARM' && cardType.category != 'GADGET' && cardType.category != 'GRENADE' && cardType.category != 'MELEE'")
      return mainWeapons.map((weapon,index ) => {
        return <WeaponCardDetail onClick={this.addCard} id={weapon.id} weaponCard={weapon} typeID={weapon.weapon_card_type_id} key={index} />
      })
  }

  renderSidearms = () => {
    let sidearms_arr = this.weaponsFilter("cardType.category === 'SIDEARM' || cardType.category === 'GRENADE'")
      return sidearms_arr.map((weapon,index ) => {
        return <WeaponCardDetail typeID={weapon.weapon_card_type_id} id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderMeleeWeapons = () => {
    let melee_arr = this.weaponsFilter("cardType.category === 'MELEE'")
      return melee_arr.map((weapon,index ) => {
        return <WeaponCardDetail typeID={weapon.weapon_card_type_id}   id={weapon.id} weaponCard={weapon} key={index} />
      })
  }

  renderGrenades = () => {
    let grenade_arr = this.weaponsFilter("cardType.category === 'GRENADE'")
      return grenade_arr.map((weapon, index) => {
        return <WeaponCardDetail typeID={weapon.weapon_card_type_id}   id={weapon.id} weaponCard={weapon} key={index} />
      })
  }


  changeFilter = (e) => {
    for (var key in this.state){
      if (this.state[key] === true) {
        this.setState({
          [key]: false,
          [e.target.id]: true
        })
      }
    }
  }

  typeOfRender = () => {
    if (this.state.topTen === true){
      return this.topTenWeapons()
    } else if (this.state.mainWeapons === true) {
      return this.renderMainWeapons()
    } else if (this.state.sidearms === true) {
      return this.renderSidearms()
    } else if (this.state.melee === true) {
      return this.renderMeleeWeapons()
    } else if (this.state.grenades === true) {
      return this.renderGrenades()
    }
  }

  shouldRender = () => {
    if (this.props.currentUser.weapons) {
      return this.typeOfRender()
    } else {
      return null
    }
  }


  render(){
    console.log("in weapons card", this.props)
    return(
      <div>
        <Button onClick={this.changeFilter} id="topTen">
          Top Ten Weapons
        </Button>
        <Button onClick={this.changeFilter} id="mainWeapons">
          Main Weapons
        </Button>
        <Button onClick={this.changeFilter} id="sidearms">
          Sidearms
        </Button>
        <Button onClick={this.changeFilter} id="melee">
          Melee
        </Button>
        <Button onClick={this.changeFilter} id="grenades">
          Grenades
        </Button>
        <br/>
        <Card.Group>
          {this.shouldRender()}
        </Card.Group>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    userID: state.user.userID,
    weaponCardTypes: state.cardTypes.weaponCardTypes
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUserDate: getCurrentUserDate
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WeaponCards)
