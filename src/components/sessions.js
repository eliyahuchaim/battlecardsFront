import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from '../actions/userActions';
import { Form, Button } from 'semantic-ui-react'
import { Route, Redirect} from 'react-router';



class Sessions extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state).then(resp => {console.log("test", this.context.router)})
    // this.props.history.push('/userspage')
  }

  logginForm = () => {
    return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label='Username' placeholder='Username'  name="username" onChange={this.handleChange} />
        <Form.Input label='Password' type="password" placeholder='password' name="password" onChange={this.handleChange}/>
      </Form.Group>
      <Form.Button>Login</Form.Button>
    </Form>
    )
  }

  logout = () => {
    this.props.logout()
  }

  logoutButton = () => {
    return (
      <Form>
        <Button onClick={this.logout}>Logout</Button>
      </Form>
    )
  }

  whatToRender = () => {
    if (localStorage.the_key_to_happiness !== "null") {
      return this.logoutButton()
    } else {
      return this.logginForm()
    }
  }


  render(){
    return(
      this.whatToRender()
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    logout: logout
 }, dispatch);
}

const mapStateToProps = (state) => {
  return {
  userID: state.user.userID
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
