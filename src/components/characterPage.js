import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUserCharacters} from '../actions/userActions';
import characterDetail from './characterDetail';
import {Card, Grid, Image, Button, Table, Icon } from 'semantic-ui-react';
import { Route, Redirect} from 'react-router';


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
    })
    return characters
  }






  renderCharacters = () => {
    // if (this.props.currentUserCharacters.characters) {
      let charactersJSX = this.createBasicCharacterCards()
      return (
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              {charactersJSX[0]}
            </Grid.Column>
            <Grid.Column>
              {charactersJSX[1]}
            </Grid.Column>
            <Grid.Column>
              {charactersJSX[2]}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
          <Grid.Column>
            {charactersJSX[3]}
          </Grid.Column>
            <Grid.Column>
              <Image src='/assets/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column>
              <Image src='/assets/images/wireframe/image.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
  };

  shouldRender = () => {
    if (this.props.currentUserCharacters.characters && this.state.showDetails === false) {
      return this.renderCharacters()
    } else {
      return null
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
