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
      topTen: false
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
        <Button onClick={this.changeFilter}>
        {this.typeOfButton()}
        </Button>
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
