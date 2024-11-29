import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errMsg: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  loginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 7})
    history.replace('/')
  }

  loginFailure = error => {
    this.setState({errMsg: error})
  }

  onLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const url = 'https://apis.ccbp.in/ebank/login'
    const userCredentials = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const loginData = await fetch(url, options)
    // console.log(loginData)
    const response = await loginData.json()
    console.log(response)
    //
    if (loginData.ok) {
      this.loginSuccess(response.jwt_token)
    } else {
      this.loginFailure(response.error_msg)
    }
  }

  render() {
    const {userId, pin, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />

          <form className="form-container" onSubmit={this.onLogin}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userId" className="label-text">
              User ID
            </label>
            <input
              type="text"
              className="input-box"
              id="userId"
              onChange={this.onChangeUserId}
              value={userId}
              data-testid="userId"
            />

            <label htmlFor="pin" className="label-text">
              PIN
            </label>
            <input
              type="password"
              className="input-box"
              id="pin"
              onChange={this.onChangePin}
              value={pin}
              data-testid="pin"
            />

            <button type="submit" className="login-btn" data-testid="login">
              Login
            </button>
            {errMsg && (
              <p className="err-msg" data-testid="errorMessage">
                {errMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
