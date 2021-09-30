import React,{createRef} from 'react';
import { accountService } from '@/_services';
import { useOutsideClick} from '../_helpers/hook-ref';
import { Link, Route } from 'react-router-dom';
import { NavMobile} from './NavMobile';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
      showMenu:false
    };
    this.myRef = createRef();
  }
  componentDidMount() {
    const user = accountService.userValue;
    if (user) {
      this.setState({
        currentUser: user
      });
    }
    document.addEventListener("mousedown", this.outsideClick);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.outsideClick);
  }
  outsideClick = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showMenu: false });
    }
  };
  buttonToggle = () => {
    this.setState({showMenu: !this.state.showMenu});
  }

  logOut=()=>{
    accountService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <nav className="navbar navbar-expand-sm">
        <div className="container">
        <button id="menuButton" className='navbar-toggler'
                ref={this.myRef}
                onClick={this.buttonToggle}>
          <div className={`one ${this.state.showMenu ? 'close': ''}`}/>
          <div className={`two ${this.state.showMenu? 'close': ''}`}/>
          <div className={`three ${this.state.showMenu ? 'close': ''}`}/>
       </button>
          <Link to={"/"} className="navbar-brand">EigoPost</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-nav mr-auto mt-lg-0">
            <li className="nav-item"><Link to={"/about"} className="nav-link">About</Link></li>
            <li className="nav-item"><Link to={"/posts"} className="nav-link">Posts</Link></li>
            {currentUser && (
              <li className="nav-item"><Link to={"/profile"} className="nav-link">Profile</Link></li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item"><Link to={"/profile"} className="nav-link">{currentUser.userName}</Link></li>
              <li className="nav-item"><a href="/" className="nav-link" onClick={this.logOut}>LogOut</a></li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item mr-auto"><Link to={"/account/login"} className="nav-link">Login</Link></li>
              <li className="nav-item mr-auto"><Link to={"/account/register"} className="nav-link">Sign Up</Link>
              </li>
            </div>
          )}
          </div>
        </div>
        <NavMobile menuVis={this.state.showMenu}
                   currentUser={this.state.currentUser}
                   logOut={this.logOut}/>
      </nav>
    );
  }
}
export {Nav};
