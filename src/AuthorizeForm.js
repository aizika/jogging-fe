import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function SelectButton(props) {
  return (
    <div>
      <Button bsStyle="success" onClick={() => props.onSelect('SIGNUP')}>Sign Up</Button>
      <Button bsStyle="primary" onClick={() => props.onSelect('LOGIN')}>Login</Button>
    </div>
  );
}

class AuthorizeForm extends Component {
  constructor() {
    super();
    this.state = {activePage: null};
  }

  handleSelect = (page) => {
    this.setState({activePage: page});
  };

  authorise = (props) => {
    this.props.onSuccess(props);
  };

  render() {
    return (
      <div>
        <div>{!this.state.activePage && <SelectButton onSelect={this.handleSelect} />}</div>
        <div>{this.state.activePage === 'SIGNUP' && <SignupForm onSuccess={this.authorise} />}</div>
        <div>{this.state.activePage === 'LOGIN' && <LoginForm onSuccess={this.authorise} />}</div>
      </div>
    );
  }

}

export default AuthorizeForm;
