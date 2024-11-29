import {Component} from 'react'
import Cookies from 'js-cookie'

import {withRouter, Redirect} from 'react-router-dom'

import './index.css'

class Home extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-container">
        <nav className="navbar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button
            type="button"
            className="logout-btn"
            onClick={this.onLogout}
            data-testid="logout"
          >
            Logout
          </button>
        </nav>
        <div className="card-container">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            className="digital-card"
            alt="digital card"
            data-testid="digitalCard"
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
