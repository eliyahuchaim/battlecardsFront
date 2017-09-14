import React from 'react';
import {NavLink} from 'react-router-dom';
import Sessions from './sessions';


const link = {
  width: '150px',
  padding: '10px',
  margin: '0 6px 6px',
  textAlign: 'center',
  background: '#f17f1a',
  display: 'inline-block',
  fontSize: '13px',
  textDecoration: 'none',
  color: 'white',
  borderRadius: '.28571429rem'
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
          background: '#868079'}}
        >Home</NavLink>
          <NavLink
            to='/characters'
            exact
            style={link}
            activeStyle={{
            background: '#868079'}}
          >Characters</NavLink>
            <NavLink
              to='/userspage'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >My Page</NavLink>
            <NavLink
              to='/weapons'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >Weapon Cards</NavLink>
            <NavLink
              to='/vehiclecards'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >Vehicle Cards</NavLink>
            <NavLink
              to='/classcards'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >Class Cards</NavLink>
            <NavLink
              to='/createcharacter'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >Create Character</NavLink>
            <NavLink
              to='/compare'
              exact
              style={link}
              activeStyle={{
              background: '#868079'}}
            >Compare</NavLink>
            <Sessions/>

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
          background: '#868079'}}
        >Home</NavLink>
        <NavLink
          to='/signup'
          exact
          style={link}
          activeStyle={{
          background: '#868079'}}
        >SignUp</NavLink>
        <Sessions/>
      </div>
    )
  }
};

export default NavBar;
