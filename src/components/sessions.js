import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import { Form } from 'semantic-ui-react'



class Login extends React.Component{
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
    this.props.login(this.state)
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


  render(){
    return(
      this.logginForm()
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login
 }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);



function find() {
  let current;
  let next;



}
