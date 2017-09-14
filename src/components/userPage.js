import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSingleUserByID, getUserCharacters, getCurrentUserDate } from '../actions/userActions';
import {Card, Grid, Image, Button, Table, Icon, Statistic, Loader, Dimmer } from 'semantic-ui-react';

class UserPage extends React.Component{
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


  renderUser = () => {
    if (this.props.currentUser.user) {
      return (

        <Grid>
          <Grid.Column width={4}>
            <Card>
              <Image src='https://www.windowscentral.com/sites/wpcentral.com/files/styles/larger/public/field/image/2016/10/battlefield-1-promotional.jpg?itok=DTg0ENJW' />
              <Card.Content>
                <Card.Header>
                {this.props.currentUser.user.name}
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Battlefield Username: {this.props.currentUser.user.bf1_username}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <Icon name="trophy" />
                  Score: {this.props.currentUser.user.award_score}
                  <br/>
                  Kills: {this.props.currentUser.user.kills}
                  <br/>
                  Deaths: {this.props.currentUser.user.deaths}
                  <br/>
                  K/D: {this.props.currentUser.user.kdr}
                  <br/>
                  Favorite Class: {this.props.currentUser.user.best_class}
                  <br/>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
              </Card.Content>
            </Card>
            </Grid.Column>
            <Grid.Column width={9}>
            <Statistic.Group widths='four'>
              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.skill}
                </Statistic.Value>
                <Statistic.Label>Skill</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.spm}
                </Statistic.Value>
                <Statistic.Label>Score Per Minute</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.highest_kill_streak}
                </Statistic.Value>
                <Statistic.Label>Highest Kill Streak</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.games_played}
                </Statistic.Value>
                <Statistic.Label>Games Played</Statistic.Label>
              </Statistic>

            </Statistic.Group>
            <br />
            <Statistic.Group widths='four'>
              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.avenged_deaths}
                </Statistic.Value>
                <Statistic.Label>Avenged Deaths</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.dogtags_taken}
                </Statistic.Value>
                <Statistic.Label>Dogtags Taken</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.revives}
                </Statistic.Value>
                <Statistic.Label>Revives</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.savior_kills}
                </Statistic.Value>
                <Statistic.Label>Teamates Saved</Statistic.Label>
              </Statistic>

            </Statistic.Group>

            <br />
            <Statistic.Group widths='four'>
              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.wins}
                </Statistic.Value>
                <Statistic.Label>Wins</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.losses}
                </Statistic.Value>
                <Statistic.Label>Losses</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.flags_captured}
                </Statistic.Value>
                <Statistic.Label>Flags Captured</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.flags_defended}
                </Statistic.Value>
                <Statistic.Label>Flags Defended</Statistic.Label>
              </Statistic>

            </Statistic.Group>

            <br />
            <Statistic.Group widths='four'>
              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.longest_headshot}
                </Statistic.Value>
                <Statistic.Label>Furthest Headshot</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.head_shots}
                </Statistic.Value>
                <Statistic.Label>Headshots</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                {this.props.currentUser.user.squad_score}
                </Statistic.Value>
                <Statistic.Label>Squad Score</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>
                  {this.props.currentUser.user.kill_assists}
                </Statistic.Value>
                <Statistic.Label>Kills Assists</Statistic.Label>
              </Statistic>

            </Statistic.Group>


            </Grid.Column>
          </Grid>

      )
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
    return (
      <div >
        <div className="user-page"></div>
        {this.renderUser()}
      </div>
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
   getUserCharacters: getUserCharacters,
   getCurrentUserDate: getCurrentUserDate
 }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
