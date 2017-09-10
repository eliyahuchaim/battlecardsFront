import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import VehicleCardDetail from './vehicleCardDetails';
import { getSingleUserByID, getCurrentUserDate } from '../actions/userActions';


class VehicleCards extends React.Component{
  constructor(props){
    super(props)
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


  orderByKills = () => {
    let vehicles_jsx = this.renderAllVehicles();
      return vehicles_jsx.sort((a,b) => {
        return b.kills - a.kills
    })
  }

  renderAllVehicles = () => {
    return this.props.currentUser.vehicles.map((vehicle,index) => {
      return <VehicleCardDetail vehicle={vehicle} key={index} />
    })
  }

  shouldRender = () => {
    if (this.props.currentUser.vehicles) {
      return this.orderByKills()
    } else {
      return null
    }
  }

  render(){
    // debugger
    return(
      <Card.Group>
        {this.shouldRender()}
      </Card.Group>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    vehicleCardTypes: state.cardTypes.vehicleCardTypes,
    userID: state.user.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUserDate: getCurrentUserDate
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleCards)
