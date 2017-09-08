import React from 'react';
import { Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '../actions/userActions';



const options = [
  {key: 'pl', text: 'Playstation', value: 'playstation'},
  {key: 'x', text: 'Xbox', value: ''},
  {key: 'pc', text: 'PC', value: 'pc'}
]


class SignUpForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      name: "",
      bf1_username: "",
      platform: "",
      username: "",
      password: ""
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handlePlatform = (e) => {
    this.setState({
      platform: e.target.innerText.toLowerCase()
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.createUser(this.state)
  }


  render(){
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input label='Full Name' placeholder='Full Name'  name="name" onChange={this.handleChange} />
          <Form.Input label='Battlefield 1 Username' placeholder='Battlefield 1 Username' name="bf1_username" onChange={this.handleChange}/>
          <Form.Select label='Platform' options={options} placeholder='Platform' name="platform" onChange={this.handlePlatform}/>
          <Form.Input label='Username' placeholder='Username' name="username" onChange={this.handleChange}/>
          <Form.Input type="password" label='Password' placeholder='Password' name="password" onChange={this.handleChange}/>
        </Form.Group>
        <Form.Button>Create Account</Form.Button>
      </Form>
    )
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createUser: createUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUpForm);
