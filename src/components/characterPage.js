import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUserCharacters} from '../actions/userActions';
import characterDetail from './characterDetail';
import {Card, Grid, Image, Button, Table, Icon, Loader, Dimmer, Segment } from 'semantic-ui-react';
import { Route, Redirect} from 'react-router';
import '../pacman.scss';


class CharacterPage extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        showDetails: false
      };
    }

    componentDidMount(){
      if (typeof(this.props.userID) === "number") {
        this.props.getUserCharacters(this.props.userID)
        }
    }

    componentWillReceiveProps(nextProps){
      if (typeof(this.props.userID) === "string" && typeof(nextProps.userID) === "number" ){
        this.props.getUserCharacters(nextProps.userID)
      }
    }

    goToDetailPage = (e) => {
      this.props.history.push(`/characters/${e.target.id}`)
    }




  createBasicCharacterCards = () => {
    let totalKills;
    let i = 0
    let characters = this.props.currentUserCharacters.characters.characters.map(character => {
      i = 0;
      totalKills = 0;
      character.weapons.forEach(card => {
        i++
        (card[`card${i}`]["data"].kills !== null) ? totalKills += card[`card${i}`]["data"].kills : totalKills +=0
      })
      return (
        <Grid.Column>
        <Card>
          <Image src={character.info[0].avatar != null ? character.info[0].avatar : character.class_card[0].info.image} />
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
        </Grid.Column>
      )
    })
    return characters
  }






  renderCharacters = () => {
      let charactersJSX = this.createBasicCharacterCards()
      return (
        <Grid centered={true} className="">
          <Grid.Row columns={3}>
              {charactersJSX[0]}
              {charactersJSX[1]}
              {charactersJSX[2]}
          </Grid.Row>
          <Grid.Row columns={4}>
              {charactersJSX[3]}
              {charactersJSX[4]}
              {charactersJSX[5]}
              {charactersJSX[6]}
          </Grid.Row>
        </Grid>
      )
  };

  shouldRender = () => {
    if (this.props.currentUserCharacters.characters && this.state.showDetails === false) {
      return this.renderCharacters()
    } else {
      return (
        <div>
        <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
        </Dimmer>
        </div>
      )
    }
  }


  render(){
    return(
      <div>
        {this.shouldRender()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userID: state.user.userID,
    currentUser: state.user.currentUser,
    currentUserCharacters: state.user.currentUserCharacters
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserCharacters: getUserCharacters
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
