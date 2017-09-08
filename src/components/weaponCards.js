import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import WeaponCardDetail from './weaponCardDetails'



class WeaponCards extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      topTen: false
    }
  }


  renderAllWeaponCards = () => {
    let weapons = this.orderByKills()
    // let weaponsJSX =  this.props.singleUser.weapons

    let orderedByKills = weapons.map((weapon, index) => {
      return <WeaponCardDetail weaponCard={weapon} key={index} />
    })
    return orderedByKills
  }

  orderByKills = () => {
    return this.props.singleUser.weapons.sort((a,b) => {
      return b.kills - a.kills
    })
  }

  topTenWeapons = () => {
    let jsx = this.props.singleUser.weapons.sort((a,b) => {
      return b.kills - a.kills
    })

    let weapons_jsx = jsx.map((weapon, index) => {
      return <WeaponCardDetail weaponCard={weapon} key={index} />
    })
    return weapons_jsx.slice(0,10)
  }

  getMeeleWeapons = () => {

  }

  getGadgetWeapons = () => {

  }

  getFeildKitWeapons = () => {

  }

  getLMGWeapons = () => {

  }

  getRifleWeapons = () => {

  }

  getSelfLoadingRiflesWeapons = () => {

  }


  getGrenadeWeapons = () => {

  }

  getStandardIssueRifles = () => {

  }

  getShotguns = () => {

  }

  getSidearm = () => {

  }

  getSMG = () => {

  }

  getTANKERPILOT = () => {

  }

  changeFilter = () => {
    if (this.state.topTen === false) {
      this.setState({
        topTen: true
      })
    } else {
      this.setState({
        topTen: false
      })
    }
  }

  typeOfButton = () => {
    if (this.state.topTen === false) {
      return "top ten weapons"
    } else {
      return "all weapons"
    }
  }


  typeOfRender = () => {
    if (this.state.topTen === false){
      return this.renderAllWeaponCards()
    } else {
      return this.topTenWeapons()
    }
  }


  render(){
    console.log("in weapons card", this.props)
    return(
      <div>
        <Button onClick={this.changeFilter}>
        {this.typeOfButton()}
        </Button>
        <Card.Group>
          {this.typeOfRender()}
        </Card.Group>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    weaponCardTypes: state.cardTypes.weaponCardTypes
  }
};


// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//
//   }, dispatch);
// }

export default connect(mapStateToProps,null)(WeaponCards)
