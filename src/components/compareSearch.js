import React from 'react';
import { Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSingleUserByID, frontEndUser } from '../actions/userActions';
import UserApi from '../api/usersApi';

const options = [
  {key: 'pl', text: 'Playstation', value: 'playstation'},
  {key: 'x', text: 'Xbox', value: ''},
  {key: 'pc', text: 'PC', value: 'pc'}
]

class CompareForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      bf1_username: "",
      platform: null
    };
  }

  cleanData = (data) => {
    const frontEndUserData = {
      username: this.state.bf1_username,
      avengedDeaths: data.avengerKills,
      score: data.awardScore,
      kills: data.basicStats.kills,
      deaths: data.basicStats.deaths,
      skill: data.basicStats.skill,
      spm: data.basicStats.spm,
      kpm: data.basicStats.kpm,
      timePlayed: data.basicStats.timePlayed,
      wins: data.basicStats.wins,
      losses: data.basicStats.losses,
      dogTagsTaken: data.dogtagsTaken,
      bestClass: data.favoriteClass,
      flagsCaptured: data.flagsCaptured,
      flagsDefended: data.flagsDefended,
      headshots: data.headShots,
      kdr: data.kdr,
      killAssists: data.killAssists,
      longestHeadshot: data.longestHeadShot,
      saviorKills: data.saviorKills,
      squadScore: data.squadScore,
      highest_kill_streak: data.highestKillStreak,
      games_played: data.roundsPlayed
    }

    this.props.frontEndUser(frontEndUserData)
    this.props.history.push('/comparepage')
  }


  frontEndSinglePlayer = () => {
    UserApi.frontEndFetch(this.state.bf1_username, this.state.platform)
    .then(resp => {this.cleanData(resp["userdata"]["result"])})
  }


  fetchSinglePlayer = (event) => {
    event.preventDefault();
    let foundID;
    for (var i = 0, usernames = this.props.bf1_usernames["usernames"]; i < usernames.length; i++){
      if (usernames[i]["username"] == this.state.bf1_username) {
        foundID = usernames[i]["id"]
      }
    }
    if (typeof(foundID) === "number") {
      this.props.getSingleUserByID(foundID).then(resp => {this.props.history.push('/comparepage')})

    } else {
      this.frontEndSinglePlayer();
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handlePlatform = (e) => {
    let platformID;
    switch (e.target.innerText) {
      case "Playstation":
        platformID = 2
        break;
      case 'Xbox':
        platformID = 1
        break;
      case 'PC':
        platformID = 0
        break;
    default:
      return null
    }
    this.setState({
      platform: platformID
    })
  }



  renderForm = () => {
    return (
      <Form onSubmit={this.fetchSinglePlayer}>
        <Form.Group widths='equal'>
          <Form.Input label='Battlefield 1 Username' placeholder='Battlefield 1 Username' name="bf1_username" onChange={this.handleChange}/>
          <Form.Select label='Platform' options={options} placeholder='Platform' name="platform" onChange={this.handlePlatform}/>
        </Form.Group>
        <Form.Button>Compare</Form.Button>
      </Form>
    )
  }




  render(){
    return (
      this.renderForm()
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bf1_usernames: state.user.bf1usernames
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getSingleUserByID: getSingleUserByID,
    frontEndUser: frontEndUser
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(CompareForm);
