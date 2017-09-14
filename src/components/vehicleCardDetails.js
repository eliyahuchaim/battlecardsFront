import React from 'react';
import {connect} from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';


const vehicleImages = {
  airship: "https://images.nowloading.co/image/upload/c_fill,h_470,q_auto:good,w_620/ege6i1rerhkcq0imu8we.jpg",
  attackPlane: "https://static.gamespot.com/uploads/original/536/5360430/3143284-large.img-1.jpg",
  bomber: "https://assets.vg247.com/current//2017/06/battlefield_1_in_the_name_of_the_tsar-5.jpg",
  gun: "https://ip2.i.lithium.com/551468d57f917db8dc2219f1ccec9a1694ba2d79/68747470733a2f2f6d656469612d7777772d626174746c656669656c64776562636f72652e737061726b2e65612e636f6d2f636f6e74656e742f626174746c656669656c642d706f7274616c2f656e5f55532f67616d65732f626174746c656669656c642d312f746865792d7368616c6c2d6e6f742d706173732f5f6a63725f636f6e74656e742f7061722f73656374696f6e5f322f636f6c756d6e732f636f6c756d6e2f636f6e74656e742f656469746f7269616c5f332f696d6167652f6c617267652e696d672e6a7067",
  landship: "https://data2.origin.com/content/dam/originx/web/app/games/battlefield/battlefield-1/screenshots/battlefield-1-they-shall-not-pass/bf1-theyshallnotpass-xp1_screenshot_1920x1080_en_WW_11.jpg",
  lightTank: "http://www.phaidon.com/resource/renault-ft-17-wwi-tank.jpg",
  fighterPlane: "http://www.m9themes.com/wp-content/uploads/2017/01/battlefield-1-aircraft-wallpaper.jpg",
  sidecar: "https://images2.alphacoders.com/759/759332.jpg",
  scout: "http://content.pulse.ea.com/content/legacy/battlefield-portal/en_US/news/battlefield-1/the-road-ahead-jan-2017/_jcr_content/featuredImage/renditions/rendition1.img.jpg",
  boat: "http://vignette4.wikia.nocookie.net/battlefield/images/f/fb/Battlefield-1-2.jpg/revision/latest?cb=20161021235710",
  aa: "https://i.ytimg.com/vi/1T7CpdyqKKA/maxresdefault.jpg",
  cannon: "https://assets.vg247.com/current//2016/06/battlefield-1-concept-art-15.jpg",
  train: "http://vignette2.wikia.nocookie.net/lotrminecraftmod/images/f/f1/Bf1_Train.jpg/revision/latest?cb=20161113020111",
  dreadnought: "http://i.imgur.com/f1AELS4.jpg",
  horse: "https://wallpapersite.com/images/wallpapers/battlefield-1-1366x768-sinai-desert-1-gameplay-hd-2188.jpg",
}


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

  vehicleImage = (name) => {
    if (name.includes("Attack Plane")){
      return vehicleImages.attackPlane
    } else if (name.includes("Airship")) {
      return vehicleImages.airship
    } else if (name.includes("Bomber")) {
      return vehicleImages.bomber
    } else if (name.includes("Gun")) {
      return vehicleImages.gun
    } else if (name.includes("Train")) {
      return vehicleImages.train
    } else if (name.includes("Landship")) {
      return vehicleImages.landship
    } else if (name.includes("Light Tank")) {
      return vehicleImages.lightTank
    } else if (name.includes("Fighter")) {
      return vehicleImages.fighterPlane
    } else if (name.includes("Sidecar")) {
      return vehicleImages.sidecar
    } else if (name.includes("Scout")) {
      return vehicleImages.scout
    } else if (name.includes("Craft")) {
      return vehicleImages.boat
    } else if (name.includes("AA")) {
      return vehicleImages.aa
    } else if (name.includes("Cannon")) {
      return vehicleImages.cannon
    } else if (name.includes("Dreadnought")) {
      return vehicleImages.dreadnought
    } else if (name.includes("Horse")) {
      return vehicleImages.horse
    } else {
      return this.state.image
    }
  }


  renderCard = () => {
    let cardType = this.findCardType();
    let vehicle = this.props.vehicle;
    let time_played = Math.round(vehicle.time_played / 60)


    return (
      <Card onClick={this.props.onClick} data-name={this.props.name} id={this.props.id} data-type-name={this.props.typeName} data-type={this.props.typeID}>
        <Image src={this.vehicleImage(cardType.name)} />
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
