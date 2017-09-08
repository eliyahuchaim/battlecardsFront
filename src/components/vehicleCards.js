import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import VehicleCardDetail from './vehicleCardDetails';


class VehicleCards extends React.Component{
  constructor(props){
    super(props)
  }


  orderByKills = () => {
    let vehicles_jsx = this.renderAllVehicles();
      return vehicles_jsx.sort((a,b) => {
        return b.kills - a.kills
    })
  }

  renderAllVehicles = () => {
    return this.props.singleUser.vehicles.map((vehicle,index) => {
      return <VehicleCardDetail vehicle={vehicle} key={index} />
    })
  }

  render(){
    // debugger
    return(
      <Card.Group>
        {this.orderByKills()}
      </Card.Group>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    vehicleCardTypes: state.cardTypes.vehicleCardTypes
  }
}

export default connect(mapStateToProps, null)(VehicleCards)
