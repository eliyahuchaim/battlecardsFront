import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from 'redux';
import SignUpForm from './components/signupForm'
import { seedUsers } from './actions/userActions'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/nav';
import UserPage from './components/userPage';
import CharacterPage from './components/characterPage'
import WeaponCards from './components/weaponCards';
import Home from './components/home';
import {seedAllCardTypes} from './actions/cardTypesActions';
import VehicleCards from './components/vehicleCards';
import ClassCards from './components/classCards';
import CreateCharacter from './components/createCharacter';
import Login from './components/sessions'

class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.seedUsers()
    this.props.seedCardTypes()
  }



  render() {
    // console.log("app state", this.props)
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Login />
            <img src={logo} className="App-logo" alt="logo" />
            <Route exact path='/createcharacter' component={CreateCharacter} />
            <Route exact path='/classcards' component={ClassCards} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/vehiclecards' component={VehicleCards} />
            <Route exact path='/characters' component={CharacterPage} />
            <Route exact path='/weapons' component={WeaponCards} />
            <Route exact path='/userspage' component={UserPage} />
            <Route exact path='/signup' component={SignUpForm} />
        </div>
      </Router>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    seedUsers: seedUsers,
    seedCardTypes: seedAllCardTypes
  }, dispatch );
};

const mapStateToProps = (state) => {
  return {state}
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
