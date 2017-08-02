import React, {Component} from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
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
      'User login: ' + this.state.username + ', password: ' + this.state.password);
    this.props.onSuccess({role:'USER', username: this.state.username});
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <div>Please login</div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              username:
              <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              password:
              <input name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
            </label>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
