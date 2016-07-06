const React = require('react')
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const ProjectStore = require('../stores/project_store');
const SessionActions = require('../actions/session_actions');
const ProjectActions = require('../actions/project_actions');

const NavBar = React.createClass({
  _handleLogOut () {
   SessionActions.logOut();
  },

  getInitialState() {
    return ({greeting: this.greeting(), searchState: "", input:"", results: "", suggestion:""});
  },

  componentDidMount () {
    this.nav = "";
    this.search = "-hidden";
    this.projectListener = ProjectStore.addListener(this.onProjectChange);
    this.setState({greeting: this.greeting(), searchState: "-hidden"});
  },

  componentWillUnmount(){
    this.projectListener.remove();
  },

  onProjectChange(){

  },

  handleSearchClick(e) {
    e.preventDefault();
    if (this.search === "-hidden") {
      this.nav = "-hidden";
      this.search = "";
      this.setState({searchState: "search-navbar"});
    } else {
      this.nav = "";
      this.search = "-hidden";
      this.setState({searchState: "search-navbar-hidden"});
    }
  },

  handleSearch(e){
    e.preventDefault();
    if (e.target.value) {
      this.setState({input: e.target.value});
      ProjectActions.searchProjects(e.target.value);
   } else {
     this.setState({results: [], input: ""});
   }
  },

  greeting(){
    let navRight;
    if (SessionStore.isUserLoggedIn()) {
      navRight = <div className={`navRight${this.nav}`}>
        <a onClick={this.handleSearchClick} className="nav-search" href="#">
          <img src="http://res.cloudinary.com/di7w4wcnw/image/upload/v1467822040/magnifying-glass_rjnbyg.svg"
               height="18px"
               width="18px">
          </img>
        </a>
        <Link to="/" className="signout-link">
          <div className="logout-hover">
            <h4>{SessionStore.currentUser().username}</h4>
            <input className="logout-button" type="submit" value="Logout" onClick={ this._handleLogOut } />
          </div>
        </Link>
      </div>;
    } else {
      navRight = <div className={`navRight${this.nav}`}>
        <a onClick={this.handleSearchClick} className="nav-search" href="#">
          <img src="http://res.cloudinary.com/di7w4wcnw/image/upload/v1467822040/magnifying-glass_rjnbyg.svg"
               height="18px"
               width="18px">
          </img>
        </a>
        <Link to="/login" className="login-link"><h4>Log In</h4></Link>
        <Link to="/sign-up" className="signup-link"><h4>Sign Up</h4></Link>
      </div>;
    }

  	return (
      <header className={`navBar${this.nav}`}>
        <div className={`navLeft${this.nav}`}>
          <Link to="/discover" className="discover-link"><h4>Discover</h4></Link>
          <Link to="/build" className="build-link"><h4>Build</h4></Link>
        </div>
        <div className={`navMiddle${this.nav}`}>
          <Link to="/" className="header-link"><h2>BuildStarter</h2></Link>
        </div>
        { navRight }
        <div className={`search-navbar${this.search}`}>
          <input className="search-input" onChange={this.handleSearch} type="text" placeholder="Search"></input>
            <a onClick={this.handleSearchClick} className="nav-search-active" href="#">
              <img src="http://res.cloudinary.com/di7w4wcnw/image/upload/v1467822040/magnifying-glass_rjnbyg.svg"
                   height="18px"
                   width="18px">
              </img>
            </a>
        </div>
      </header>
      );
    },

  render() {
    return (
      <div>
        { this.greeting() }
      </div>
    );
  }
});

module.exports = NavBar;
