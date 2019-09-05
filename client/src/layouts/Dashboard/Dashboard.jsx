/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logoh.png";
import Login from "views/Login/Login";
import { createUser } from "services/user/user";
// import { login, logout } from "services/user/login";
// import { login } from "services/user/login";
import { createBrowserHistory } from "history";

import axios from "axios";
import { serverUrl } from "variables/general";
import { login, logout } from "../../services/user/user";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      isLogged: false,
      isRegister: false,
      user_name: "",
      user_lastname: "",
      user_username: "",
      user_address: "",
      user_email: "",
      user_password: "",
      showPassword: false,
      token: "",
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   const ps = new PerfectScrollbar(this.refs.mainPanel);
    // }

    if (localStorage.getItem("userToken")) {
      this.setState({
        isLogged: !this.state.isLogged
      });
    } else {
      this.setState({
        isLogged: this.state.isLogged
      });
    }
    window.addEventListener("resize", this.resizeFunction);

    axios.defaults.withCredentials = true;

    // console.log(document.cookie);

  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }


  register(e) {
    e.preventDefault();

    const user = {
      user_name: this.state.user_name,
      user_lastname: this.state.user_lastname,
      user_username: this.state.user_username,
      user_address: this.state.user_address,
      user_email: this.state.user_email,
      user_password: this.state.user_password
    };

    createUser(user)
      .then(res => {
        console.log("Usuario registrado", res);
        // this.showComponent();
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  showComponent() {
    this.setState({ isRegister: !this.state.isRegister });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  check() {
    axios
      .get(serverUrl + "session/logout/check")
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        // Authentication failed
        console.log(error.response.data.message);
      });
  }

  login(e) {
    e.preventDefault();

    const user = {
      user_username: this.state.user_username,
      user_password: this.state.user_password
    };

    console.log(user);

    if (this.state.user_username === "" || this.state.user_password === "") {
      alert("Please fill all the fields");
    } else {

      login(user).then(result =>{
        console.log(result);
        this.setState({
          isLogged: !this.state.isLogged
        });
      }).catch(error => {
        console.log(error.response.data.message);
        alert(error.response.data.message);

      })
    }
  }

  async logout(e) {
    e.preventDefault();

    logout().then(result =>{
      
      console.log(result.data);

      this.setState({
        isLogged: !this.state.isLogged
      });

      const history = createBrowserHistory();
      history.push({ pathname: '/' });
      // window.location.reload();
    }).catch(error =>{
      console.log(error.response.data.message);
      alert(error.response.data.message);
    });
  
  }

  render() {
    var shown = {
      display: this.state.isLogged ? "block" : "none"
    };

    var hidden = {
      display: this.state.isLogged ? "none" : "block"
    };

    const { classes, ...rest } = this.props;
    // const { value } = this.state;

    if (!this.state.isLogged) {
      return (
        <div style={{ margin: '215px 30px' }}>
          <Login
            style={shown}
            onSubmit={this.login.bind(this)}
            register={this.showComponent.bind(this)}
            user_username={this.state.user_username}
            user_password={this.state.user_password}
            onChange={this.onChange}
          />
          {/* </div> */}
        </div>
      );
    } else {
      const compSelected = localStorage.getItem("compSelected");

      return (
        <div className={classes.wrapper}>
          <Sidebar
            style={hidden}
            routes={dashboardRoutes}
            logoText={"Hybrid Accounting"}
            companySelected={compSelected}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
              // logOut={this.logOut.bind(this)}
              logOut={this.logout.bind(this)}
              check={this.check}
              // checklogin={this.checklogin.bind(this)}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            {this.getRoute() ? (
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
              </div>
            ) : (
                <div className={classes.map}>{switchRoutes}</div>
              )}
            {this.getRoute() ? <Footer /> : null}
          </div>
        </div>
      );
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);


