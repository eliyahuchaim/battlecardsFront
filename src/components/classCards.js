import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import ClassCardDetails from './classCardDetails';


class ClassCards extends React.Component{
  constructor(props){
    super(props)
  }


  renderAllClassCards = () => {
    return this.props.singleUser.classes.map((card, index) => {
      return <ClassCardDetails card={card} key={index} />
    })
  }



  render(){
    return(
      <Card.Group>
      {this.renderAllClassCards()}
      </Card.Group>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    classCardTypes: state.cardTypes.classCardTypes
  }
}


export default connect(mapStateToProps, null)(ClassCards);
