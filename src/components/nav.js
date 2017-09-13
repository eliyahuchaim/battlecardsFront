import React from 'react';
import {NavLink} from 'react-router-dom';


const link = {
  width: '100px',
  padding: '12px',
  margin: '0 6px 6px',
  textAlign: 'center',
  background: '#008CBA',
  display: 'inline-block',
  fontSize: '13px',
  textDecoration: 'none',
  color: 'white',
}


const NavBar = () => {
  if (localStorage["the_key_to_happiness"] !== "null") {
    return(
      <div className='nav-in'>
        <NavLink
          to='/home'
          exact
          style={link}
          activeStyle={{
          background: '#2a65b2'}}
        >Home</NavLink>
          <NavLink
            to='/characters'
            exact
            style={link}
            activeStyle={{
            background: '#2a65b2'}}
          >Characters</NavLink>
            <NavLink
              to='/userspage'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >My Page</NavLink>
            <NavLink
              to='/weapons'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >Weapon Cards</NavLink>
            <NavLink
              to='/vehiclecards'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >Vehicle Cards</NavLink>
            <NavLink
              to='/classcards'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >Class Cards</NavLink>
            <NavLink
              to='/createcharacter'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >Create Character</NavLink>
            <NavLink
              to='/compare'
              exact
              style={link}
              activeStyle={{
              background: '#2a65b2'}}
            >Compare</NavLink>
      </div>
    )
  } else {
    return (
      <div className='nav-in'>
        <NavLink
          to='/home'
          exact
          style={link}
          activeStyle={{
          background: '#2a65b2'}}
        >Home</NavLink>
        <NavLink
          to='/signup'
          exact
          style={link}
          activeStyle={{
          background: '#2a65b2'}}
        >SignUp</NavLink>
      </div>
    )
  }
};

export default NavBar;
