import React, {Component} from 'react';
import {Form, FormGroup} from 'react-bootstrap';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', email: '', isSignup: false};
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    console.log(
      'User submitted: ' + this.state.username +
      ', email: ' + this.state.email +
      ', password: ' + this.state.password);
    this.props.onSuccess({role:'ADMIN', user: this.state.username});
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <div>Please signup</div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>
              username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              email:
              <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              password:
              <input name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
            </label>
          </FormGroup>
          <input type="submit" value="Sign up" />
        </Form>
      </div>
    );
  }
}

export default SignupForm;
