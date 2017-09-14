import React from 'react';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';

const weaponCardsImages = {
  fieldKit: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/8/121/Maxim0815-0879ffaa.png",
  gadget: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/88/55/GadgetSmallAmmoPack-5837fde5.png",
  grenade: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/90/87/GadgetTrooperATGrenade-a6575030.png",
  melee: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/81/52/GadgetBarbedWireBat-af34ba46.png",
  selfLoadingRifle: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/57/125/RemingtonM8_Special-398391d9.png",
  shotgun: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/107/78/BrowingA5-95b260b4.png",
  sidearm: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/26/21/Hammerless-e61505d4.png",
  smg: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/30/81/Hellriegel1915-e2513c1e.png",
  tankerPilot: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/21/1/M1911ExtendedMag-eb019f60.png",
  lmg: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/60/20/Barm1918-3c14511c.png",
  rifle: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/15/89/MauserGewehr98-f159616f.png",
  standardIssueRifle: "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/tunguska/56/82/SpringfieldM1903-c8ae5988.png"
}



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

  typeOfImage = (category) => {
    switch (category) {
      case "SELF-LOADING RIFLE":
        return weaponCardsImages.selfLoadingRifle
      case "FIELD KIT":
        return weaponCardsImages.fieldKit
      case "SMG":
          return weaponCardsImages.smg
      case "LMG":
          return weaponCardsImages.lmg
      case "RIFLE":
        return weaponCardsImages.rifle
      case "STANDARD ISSUE RIFLES":
        return weaponCardsImages.standardIssueRifle
      case "SHOTGUN":
        return weaponCardsImages.shotgun
      case "SIDEARM":
        return weaponCardsImages.sidearm
      case "GRENADE":
        return weaponCardsImages.grenade
      case "MELEE":
        return weaponCardsImages.melee
      case "GADGET":
        return weaponCardsImages.gadget
        case "TANKER/PILOT":
          return weaponCardsImages.tankerPilot
      default:
          return weaponCardsImages.selfLoadingRifle
    }
  }


  renderCard = () => {
    let cardType = this.findCardType()
    let weapon = this.props.weaponCard
    // debugger
    return (
      <Card onClick={this.props.onClick} data-name={this.props.name} id={this.props.id} data-type={this.props.typeID} data-type-name={this.props.typeName}>
        <Image className="weapon-card" src={this.typeOfImage(cardType.category)} />
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
