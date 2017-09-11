import React from 'react';
import {connect} from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';

class VehicleCardDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      image: "http://cdn4.dualshockers.com/wp-content/uploads/2017/01/battlefielf-1-7.jpg"
    }
  }


  findCardType = () => {
    // debugger
    return this.props.vehicleCardTypes.find(card => {
      return card.id === this.props.vehicle.vehicle_card_type_id
    })
  }


  renderCard = () => {
    let cardType = this.findCardType();
    let vehicle = this.props.vehicle;
    let time_played = Math.round(vehicle.time_played / 60)


    return (
      <Card onClick={this.props.onClick} data-name={this.props.name} id={this.props.id} data-type-name={this.props.typeName} data-type={this.props.typeID}>
        <Image src={this.state.image} />
          <Card.Content>
            <Card.Header>{cardType.name}</Card.Header>
            <Card.Description>
              Description: {cardType.description !== "" ? cardType.description : "N/A"}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name='bullseye'/>
            Kills: {vehicle.kills}
            <br/>
            <Icon name='trophy'/>
            Minutes Played: {time_played}
            <br/>
            <Icon name='trophy'/>
            Amount of Vehicles Destroyed: {vehicle.amount_of_vehicles_destroyed}
            <br/>
          </Card.Content>
      </Card>
    )
  }

  render(){
    return(
      this.renderCard()
    )
  }
}


const mapStateToProps = (state) => {
  return {
    vehicleCardTypes: state.cardTypes.vehicleCardTypes
  }
}


export default connect(mapStateToProps, null)(VehicleCardDetail)
