import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSingleUserByID, getUserCharacters, getCurrentUserDate } from '../actions/userActions';
import {Card, Grid, Image, Button, Table, Icon, Label, List } from 'semantic-ui-react';
import CompareCharacters from './compareCharacters';

class ComparePage extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if (typeof(this.props.userID) === "number") {
      this.props.getCurrentUserDate(this.props.userID)
      this.props.getUserCharacters(this.props.userID)
      }
  }

  componentWillReceiveProps(nextProps){
    if (typeof(this.props.userID) === "string" && typeof(nextProps.userID) === "number" ){
      this.props.getCurrentUserDate(nextProps.userID)
      this.props.getUserCharacters(nextProps.userID)
    }
  }

  typeOfRender = () => {
    if (this.props.singleUser.weapons) {
      return this.renderSingleUser()
    } else {
      return this.renderFronEndUser()
    }
  }

  formatText = (criteria1, criteria2) => {
    if (criteria1 > criteria2){
      return (
        <List.Item>
          <Label color='green' horizontal> {criteria1 - criteria2} </Label>
        </List.Item>
      )
    } else {
      return (
        <List.Item>
          <Label color='red' horizontal> {criteria2 - criteria1} </Label>
        </List.Item>
      )
    }
  }


  renderFronEndUser = () => {
    let currentUser = this.props.currentUser.user
    let singleUser = this.props.frontEndUser
    // debugger
    if (this.props.currentUser.user) {
    return (
      <Grid>
        <Grid.Column width={3}>
          <Card>
            <Image src= 'http://content.pulse.ea.com/content/legacy/battlefield-portal/en_US/news/battlefield-1/battlefield-1-revolution-available-now/_jcr_content/featuredImage/renditions/rendition1.img.jpg' />
              <Card.Content>
                <Card.Header>
                {currentUser.bf1_username}
                </Card.Header>
                <Card.Description>
                  <Icon name="trophy" />
                  Score: {currentUser.award_score}
                  <br/>
                  Kills: {currentUser.kills}
                  <br/>
                  Deaths: {currentUser.deaths}
                  <br/>
                  K/D: {currentUser.kdr}
                  <br/>
                  Favorite Class: {currentUser.best_class}
                  <br/>
                </Card.Description>
              </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
        <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>You</Table.HeaderCell>
                <Table.HeaderCell>{singleUser.username}</Table.HeaderCell>
                <Table.HeaderCell>Difference</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
                <Table.Cell>{currentUser.award_score}</Table.Cell>
                <Table.Cell>{singleUser.score}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.award_score, singleUser.score)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Squad Score</Table.Cell>
                <Table.Cell>{currentUser.squad_score}</Table.Cell>
                <Table.Cell>{singleUser.squadScore}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.squad_score, singleUser.squadScore)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kills</Table.Cell>
                <Table.Cell>{currentUser.kills}</Table.Cell>
                <Table.Cell>{singleUser.kills}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.kills, singleUser.kills)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Deaths</Table.Cell>
                <Table.Cell>{currentUser.deaths}</Table.Cell>
                <Table.Cell>{singleUser.deaths}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.deaths, singleUser.deaths)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>K/D</Table.Cell>
                <Table.Cell>{currentUser.kdr}</Table.Cell>
                <Table.Cell>{singleUser.kdr}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.kdr, singleUser.kdr)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score Per Minute</Table.Cell>
                <Table.Cell>{currentUser.spm}</Table.Cell>
                <Table.Cell>{singleUser.spm}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.spm, singleUser.spm)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Flags Captured</Table.Cell>
                <Table.Cell>{currentUser.flags_captured}</Table.Cell>
                <Table.Cell>{singleUser.flagsCaptured}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.flags_captured, singleUser.flagsCaptured)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Flags Defended</Table.Cell>
                <Table.Cell>{currentUser.flags_defended}</Table.Cell>
                <Table.Cell>{singleUser.flagsDefended}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.flags_defended, singleUser.flagsDefended)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Headshots</Table.Cell>
                <Table.Cell>{currentUser.head_shots}</Table.Cell>
                <Table.Cell>{singleUser.headshots}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.head_shots, singleUser.headshots)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Dog Tags Taken</Table.Cell>
                <Table.Cell>{currentUser.dogtags_taken}</Table.Cell>
                <Table.Cell>{singleUser.dogTagsTaken}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.dogtags_taken, singleUser.dogTagsTaken)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Highest Kill Streak</Table.Cell>
                <Table.Cell>{currentUser.highest_kill_streak}</Table.Cell>
                <Table.Cell>{singleUser.highest_kill_streak}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.highest_kill_streak, singleUser.highest_kill_streak)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longest HeadShot - meters</Table.Cell>
                <Table.Cell>{currentUser.longest_headshot}</Table.Cell>
                <Table.Cell>{singleUser.longestHeadshot}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.longest_headshot, singleUser.longestHeadshot)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Savior Kills</Table.Cell>
                <Table.Cell>{currentUser.savior_kills}</Table.Cell>
                <Table.Cell>{singleUser.saviorKills}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.savior_kills, singleUser.saviorKills)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Games Played</Table.Cell>
                <Table.Cell>{currentUser.games_played}</Table.Cell>
                <Table.Cell>{singleUser.games_played}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.games_played, singleUser.games_played)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={3}>
          <Card>
            <Image src= 'https://avatarfiles.alphacoders.com/839/83908.jpg' />
              <Card.Content>
                <Card.Header>
                {this.props.frontEndUser.username}
                </Card.Header>
                <Card.Description>
                  <Icon name="trophy" />
                  Score: {this.props.frontEndUser.score}
                  <br/>
                  Kills: {this.props.frontEndUser.kills}
                  <br/>
                  Deaths: {this.props.frontEndUser.deaths}
                  <br/>
                  K/D: {this.props.frontEndUser.kdr}
                  <br/>
                  Favorite Class: {this.props.frontEndUser.bestClass}
                  <br/>
                </Card.Description>
              </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
    } else {
      return null
    }
  }

  buttonAction = () => {
    this.props.history.push('/comparecharacters')
  }


  renderSingleUser = () => {
    // debugger
    let currentUser = this.props.currentUser.user
    let singleUser = this.props.singleUser.user
    // debugger
    if (this.props.currentUser.user) {
    return (
      <Grid>
        <Grid.Column width={3}>
          <Card>
            <Image src= 'http://content.pulse.ea.com/content/legacy/battlefield-portal/en_US/news/battlefield-1/battlefield-1-revolution-available-now/_jcr_content/featuredImage/renditions/rendition1.img.jpg' />
              <Card.Content>
                <Card.Header>
                {currentUser.bf1_username}
                </Card.Header>
                <Card.Description>
                  <Icon name="trophy" />
                  Score: {currentUser.award_score}
                  <br/>
                  Kills: {currentUser.kills}
                  <br/>
                  Deaths: {currentUser.deaths}
                  <br/>
                  K/D: {currentUser.kdr}
                  <br/>
                  Favorite Class: {currentUser.best_class}
                  <br/>
                </Card.Description>
              </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
        <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>You</Table.HeaderCell>
                <Table.HeaderCell>{singleUser.bf1_username}</Table.HeaderCell>
                <Table.HeaderCell>Difference</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
                <Table.Cell>{currentUser.award_score}</Table.Cell>
                <Table.Cell>{singleUser.award_score}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.award_score, singleUser.award_score)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Squad Score</Table.Cell>
                <Table.Cell>{currentUser.squad_score}</Table.Cell>
                <Table.Cell>{singleUser.squad_score}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.squad_score, singleUser.squad_score)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kills</Table.Cell>
                <Table.Cell>{currentUser.kills}</Table.Cell>
                <Table.Cell>{singleUser.kills}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.kills, singleUser.kills)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Deaths</Table.Cell>
                <Table.Cell>{currentUser.deaths}</Table.Cell>
                <Table.Cell>{singleUser.deaths}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.deaths, singleUser.deaths)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>K/D</Table.Cell>
                <Table.Cell>{currentUser.kdr}</Table.Cell>
                <Table.Cell>{singleUser.kdr}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.kdr, singleUser.kdr)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score Per Minute</Table.Cell>
                <Table.Cell>{currentUser.spm}</Table.Cell>
                <Table.Cell>{singleUser.spm}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.spm, singleUser.spm)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Flags Captured</Table.Cell>
                <Table.Cell>{currentUser.flags_captured}</Table.Cell>
                <Table.Cell>{singleUser.flags_captured}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.flags_captured, singleUser.flags_captured)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Flags Defended</Table.Cell>
                <Table.Cell>{currentUser.flags_defended}</Table.Cell>
                <Table.Cell>{singleUser.flags_defended}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.flags_defended, singleUser.flags_defended)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Headshots</Table.Cell>
                <Table.Cell>{currentUser.head_shots}</Table.Cell>
                <Table.Cell>{singleUser.head_shots}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.head_shots, singleUser.head_shots)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Dog Tags Taken</Table.Cell>
                <Table.Cell>{currentUser.dogtags_taken}</Table.Cell>
                <Table.Cell>{singleUser.dogtags_taken}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.dogtags_taken, singleUser.dogtags_taken)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Highest Kill Streak</Table.Cell>
                <Table.Cell>{currentUser.highest_kill_streak}</Table.Cell>
                <Table.Cell>{singleUser.highest_kill_streak}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.highest_kill_streak, singleUser.highest_kill_streak)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longest HeadShot - meters</Table.Cell>
                <Table.Cell>{currentUser.longest_headshot}</Table.Cell>
                <Table.Cell>{singleUser.longest_headshot}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.longest_headshot, singleUser.longest_headshot)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Savior Kills</Table.Cell>
                <Table.Cell>{currentUser.savior_kills}</Table.Cell>
                <Table.Cell>{singleUser.savior_kills}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.savior_kills, singleUser.savior_kills)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Games Played</Table.Cell>
                <Table.Cell>{currentUser.games_played}</Table.Cell>
                <Table.Cell>{singleUser.games_played}</Table.Cell>
                <Table.Cell>{this.formatText(currentUser.games_played, singleUser.games_played)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={3}>
          <Card>
            <Image src= 'https://avatarfiles.alphacoders.com/839/83908.jpg' />
              <Card.Content>
                <Card.Header>
                {singleUser.bf1_username}
                </Card.Header>
                <Card.Description>
                <Icon name="trophy" />
                Score: {singleUser.award_score}
                <br/>
                Kills: {singleUser.kills}
                <br/>
                Deaths: {singleUser.deaths}
                <br/>
                K/D: {singleUser.kdr}
                <br/>
                Favorite Class: {singleUser.best_class}
                <br/>
                </Card.Description>
              </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
    } else {
      return null
    }
  }





  render(){
    // console.log("in users props", this.props)
    return (
      <div>
        <Button onClick={this.buttonAction}>
          Compare Characters
        </Button>
        {this.typeOfRender()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    userID: state.user.userID,
    singleUser: state.user.singleUser,
    loading: state.user.loading,
    frontEndUser: state.user.frontEndUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   getSingleUserByID : getSingleUserByID,
   getUserCharacters: getUserCharacters,
   getCurrentUserDate: getCurrentUserDate
 }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);
