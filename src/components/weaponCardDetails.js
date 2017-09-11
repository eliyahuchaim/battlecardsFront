import React from 'react';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';



class WeaponCardDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      image: "https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2016/11/battlefield-1-mp-18-trench.png?itok=CFANQizc"
    }
  }

  findCardType = () => {
    return this.props.weaponCardTypes.find(card => {
      return card.id === this.props.weaponCard.weapon_card_type_id
    })
  }


  shouldRender = (attribute) => {
    return (attribute !== null || attribute !== -1 || attribute != "" ) ? attribute : "N/A"
  }


  renderCard = () => {
    let cardType = this.findCardType()
    let weapon = this.props.weaponCard
    // debugger
    return (
      <Card onClick={this.props.onClick} data-name={this.props.name} id={this.props.id} data-type={this.props.typeID} data-type-name={this.props.typeName}>
        <Image src={this.state.image} />
          <Card.Content>
            <Card.Header>{cardType.name}</Card.Header>
            <Card.Description>
              Range: {this.shouldRender(cardType.range)}
              <br/>
              Category: {cardType.category}
              <br/>
              Ammo Type: {cardType.ammo_type}
              <br/>
              Rounds: {cardType.number_of_magezines}
              <br/>
              Rate of Fire: {cardType.rate_of_fire}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name='bullseye'/>
            Accuracy: {weapon.accuracy}
            <br/>
            <Icon name='trophy'/>
            Kills: {weapon.kills}
            <br/>
            <Icon name='trophy'/>
            Shots: {weapon.shots}
            <br/>
            <Icon name='trophy'/>
            Hits: {weapon.hits}
            <br/>
            <Icon name='trophy'/>
            Headshots: {weapon.headshots}
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
    weaponCardTypes: state.cardTypes.weaponCardTypes
  }
};


export default connect(mapStateToProps,null)(WeaponCardDetail)
