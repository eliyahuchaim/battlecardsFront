import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSingleUserByID, getUserCharacters, getSecondUsersCharacters } from '../actions/userActions';
import {Card, Grid, Image, Button, Table, Icon, Label, List } from 'semantic-ui-react';

class CompareCharacters extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getSecondUsersCharacters(this.props.singleUser.user.id)
  };


  renderCharacters = (character) => {
    return(
      <Card>
        <Image src={character.class_card[0].info.image} />
        <Card.Content>
          <Card.Header>
          {character.info[0].name}
          </Card.Header>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <Icon name="trophy" />
            Score: {character["class_card"][0]["data"].score}
            <br/>
            Kills: {totalKills}
            <br/>
            Vehicle: {character.vehicle_card[0].info.name}
            <br/>
            Class: {character.class_card[0].info.name}
            <br/>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.goToDetailPage} id={character.info[0].id} >
          View This Character
          </Button>
        </Card.Content>
      </Card>
    )
  }


  shouldRender = () => {
    if (this.props.secondUsersCharacters.characters) {
      
    } else {
      return null
    }
  }



  render(){
    debugger
    return(
      null
    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    userID: state.user.userID,
    singleUser: state.user.singleUser,
    loading: state.user.loading,
    frontEndUser: state.user.frontEndUser,
    secondUsersCharacters: state.user.secondUsersCharacters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   getSingleUserByID : getSingleUserByID,
   getUserCharacters: getUserCharacters,
   getSecondUsersCharacters: getSecondUsersCharacters
 }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(CompareCharacters);
