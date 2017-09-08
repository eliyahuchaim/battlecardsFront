import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSingleUserByID, getUserCharacters } from '../actions/userActions';
import {Card, Grid, Image, Button, Table, Icon } from 'semantic-ui-react';

class UserPage extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getSingleUserByID(this.props.userID)
    this.props.getUserCharacters(this.props.userID)
  }



  renderUser = () => {
    // debugger
    if (this.props.singleUser.user) {
      return (
        <Grid>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://www.windowscentral.com/sites/wpcentral.com/files/styles/larger/public/field/image/2016/10/battlefield-1-promotional.jpg?itok=DTg0ENJW' />
              <Card.Content>
                <Card.Header>
                {this.props.singleUser.user.name}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Battlefield Username: {this.props.singleUser.user.bf1_username}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <Icon name="trophy" />
                  Score: {this.props.singleUser.user.award_score}
                  <br/>
                  Kills: {this.props.singleUser.user.kills}
                  <br/>
                  Deaths: {this.props.singleUser.user.deaths}
                  <br/>
                  K/D: {this.props.singleUser.user.kdr}
                  <br/>
                  Favorite Class: {this.props.singleUser.user.best_class}
                  <br/>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  Edit Your Profile
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={9}>
          <Table basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Skill</Table.HeaderCell>
                  <Table.HeaderCell>Score Per Minute</Table.HeaderCell>
                  <Table.HeaderCell>Best Kill Streak</Table.HeaderCell>
                  <Table.HeaderCell>Games Played</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.singleUser.user.skill}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.spm}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.highest_kill_streak}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.games_played}</Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Avenged Deaths</Table.HeaderCell>
                  <Table.HeaderCell>Dogtags Taken</Table.HeaderCell>
                  <Table.HeaderCell>Revives</Table.HeaderCell>
                  <Table.HeaderCell>Teamates Saved</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.singleUser.user.avenged_deaths}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.dogtags_taken}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.revives}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.savior_kills}</Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Wins</Table.HeaderCell>
                  <Table.HeaderCell>Losses</Table.HeaderCell>
                  <Table.HeaderCell>Flags Defended</Table.HeaderCell>
                  <Table.HeaderCell>Flags Captured</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.singleUser.user.wins}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.losses}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.flags_defended}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.flags_captured}</Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Headshots</Table.HeaderCell>
                  <Table.HeaderCell>Longest Headshot</Table.HeaderCell>
                  <Table.HeaderCell>Squad Score</Table.HeaderCell>
                  <Table.HeaderCell>Kills Assists</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.props.singleUser.user.head_shots}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.longest_headshot} Meters </Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.squad_score}</Table.Cell>
                  <Table.Cell>{this.props.singleUser.user.kill_assists}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={3}>
            <Image src='/assets/images/wireframe/media-paragraph.png' />
          </Grid.Column>
        </Grid>
      )
    } else {
      return null
    }
  };





  render(){
    console.log("in users props", this.props)
    return (
      this.renderUser()
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    userID: state.user.userID,
    singleUser: state.user.singleUser,
    loading: state.user.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
   getSingleUserByID : getSingleUserByID,
   getUserCharacters: getUserCharacters
 }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
