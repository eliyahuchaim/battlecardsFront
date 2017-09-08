import React from 'react';
import {connect} from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';

class ClassCardDetails extends React.Component{
  constructor(props){
    super(props)
  }



  findClassCardType = () => {
    return this.props.classCardTypes.find(card => {
      return card.id === this.props.card.class_type_id
    })
  }


  classCard = () => {
    let cardType = this.findClassCardType()
    let card = this.props.card
    let time_played = Math.round(card.time_played / 60)
    // debugger
    return (
      <Card onClick={this.props.onClick} data-name={this.props.name} id={this.props.id}>
        <Image src={cardType.image} />
          <Card.Content>
            <Card.Header>{cardType.name}</Card.Header>
            <Card.Description>
              Description: {cardType.description !== "" ? cardType.description : "N/A"}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Icon name='trophy'/>
            Score: {card.score}
            <br/>
            <Icon name='bullseye'/>
            Kills: {card.kills}
            <br/>
            <Icon name='trophy'/>
            Minutes Played: {time_played}
          </Card.Content>
      </Card>
    )
  }


  render(){
    return(
    this.classCard()
    )
  }
}



const mapStateToProps = (state) => {
  return {
    classCardTypes: state.cardTypes.classCardTypes
  }
}


export default connect(mapStateToProps, null)(ClassCardDetails)
