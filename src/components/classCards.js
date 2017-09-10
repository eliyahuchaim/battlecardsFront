import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Card, Grid, Image, Button, Icon } from 'semantic-ui-react';
import ClassCardDetails from './classCardDetails';
import { getSingleUserByID, getCurrentUserDate } from '../actions/userActions';


class ClassCards extends React.Component{
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


  renderAllClassCards = () => {
    return this.props.currentUser.classes.map((card, index) => {
      return <ClassCardDetails card={card} key={index} />
    })
  }

  shouldRender = () => {
    if (this.props.currentUser.classes){
      return this.renderAllClassCards()
    } else {
      return null
    }
  }



  render(){
    return(
      <Card.Group>
      {this.shouldRender()}
      </Card.Group>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    singleUser: state.user.singleUser,
    classCardTypes: state.cardTypes.classCardTypes,
    userID: state.user.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCurrentUserDate: getCurrentUserDate
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassCards);
