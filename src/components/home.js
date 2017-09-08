import React from 'react';
import {Card, Grid, Image, Button, Table, Icon } from 'semantic-ui-react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';



class Home extends React.Component{
  constructor(){
    super()
  }



  renderTopPlayers = () => {
    return(
      <Grid.Column width={9}>
      <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Player</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>Squad Score</Table.HeaderCell>
              <Table.HeaderCell>Kills</Table.HeaderCell>
              <Table.HeaderCell>Games Won</Table.HeaderCell>
              <Table.HeaderCell>Games Lost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Jeff </Table.Cell>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>100</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Johan </Table.Cell>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>50</Table.Cell>
              <Table.Cell>100</Table.Cell>
            </Table.Row>
            <Table.Cell>Es </Table.Cell>
            <Table.Cell>100</Table.Cell>
            <Table.Cell>100</Table.Cell>
            <Table.Cell>50</Table.Cell>
            <Table.Cell>50</Table.Cell>
            <Table.Cell>100</Table.Cell>
          </Table.Body>
          </Table>
        </Grid.Column>
    )
  };



  render(){
    return(
      <div>
      <h1> Welcome To Battlecards1 </h1>
      {this.renderTopPlayers()}
      </div>
    )
  }




}

export default Home
