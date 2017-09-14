import React from 'react';
import {Card, Grid, Image, Button, Table, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Home extends React.Component{
  constructor(props){
    super(props)
  }



  renderTopPlayers = () => {
    let topUsersJsx = this.props.topUsers.map(user => {
      return (
        <Table.Row>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.score}</Table.Cell>
          <Table.Cell>{user.squad_score}</Table.Cell>
          <Table.Cell>{user.wins}</Table.Cell>
          <Table.Cell>{user.losses}</Table.Cell>
          <Table.Cell>{user.kills}</Table.Cell>
          <Table.Cell>{user.deaths}</Table.Cell>
        </Table.Row>
      )
    })


    return(
      <Grid.Column width={9}>
      <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>Squad Score</Table.HeaderCell>
              <Table.HeaderCell>Games Won</Table.HeaderCell>
              <Table.HeaderCell>Games Lost</Table.HeaderCell>
              <Table.HeaderCell>Kills</Table.HeaderCell>
              <Table.HeaderCell>Deaths</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {topUsersJsx}
          </Table.Body>
          </Table>
        </Grid.Column>
    )
  };



  render(){
    return(
      <div className="Home-page">
      {this.renderTopPlayers()}
      </div>
    )
  }

}


  const mapStateToProps = (state) => {
    return {
      topUsers: state.user.topUsers
    }
  }



export default connect(mapStateToProps, null)(Home)
