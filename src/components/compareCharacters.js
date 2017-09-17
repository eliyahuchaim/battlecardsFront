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

  createBasicCharacterCards = (characters) => {
    let totalKills;
    let i = 0
    let characters_jsx = characters.map(character => {
      i = 0;
      totalKills = 0;
      character.weapons.forEach(card => {
        i++
        (card[`card${i}`]["data"].kills !== null) ? totalKills += card[`card${i}`]["data"].kills : totalKills +=0
      })
      return (
        <Card>
          <Image src={character.info[0].avatar} />
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
        </Card>
      )
    })
    return characters_jsx
  }

  renderSecondUserCharacters = () => {
    return this.createBasicCharacterCards(this.props.secondUsersCharacters.characters.characters)
  }

  renderCurrentUserCharacters = () => {
    return this.createBasicCharacterCards(this.props.currentUserCharacters.characters.characters)
  }


  shouldRender = () => {
    if (this.props.secondUsersCharacters.characters) {
        let currentCharacters = this.renderCurrentUserCharacters()
        let secondUsersCharacters = this.renderSecondUserCharacters()

        let currentUserList = currentCharacters.map(character => {
          return (
            <Grid.Column>
              {character}
            </Grid.Column>
          )
        })

        let secondUserList = secondUsersCharacters.map(character => {
          return (
            <Grid.Column>
              {character}
            </Grid.Column>
          )
        })

          return (
            <div textAlign='center'>
              <Grid divided='vertically'>
              <h3> Your Characters </h3>
                <Grid.Row columns={7}>
                  {currentUserList}
                </Grid.Row>
                <h3> {this.props.singleUser.user.bf1_username}s Characters </h3>
                <Grid.Row columns={7}>
                  {secondUserList}
                </Grid.Row>
              </Grid>
            </div>
          )
    } else {
      return (
        <div >
          Loading
        </div>
      )
    }
  }



  render(){
    return(
      this.shouldRender()
    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    userID: state.user.userID,
    singleUser: state.user.singleUser,
    loading: state.user.loading,
    secondUsersCharacters: state.user.secondUsersCharacters,
    currentUserCharacters: state.user.currentUserCharacters
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
