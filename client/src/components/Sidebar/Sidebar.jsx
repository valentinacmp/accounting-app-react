import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";

import { logout } from "../../services/user/user";
import { createBrowserHistory } from 'history';
import axios from "axios";
import { baseUrl } from "variables/general";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: true,
      // isLogged: true,
      master: false,
      selected: true,
      db: [],
      creator: "",
      arr: [],
      open: false,
      usuario_accesos: [],
      name: [],
      post: false
    };
    this.companySelected = this.companySelected.bind(this);
  }

  // verifies if routeName is the one active (in browser input)

  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  handleChange = event => {
    alert("Selected");
  }

  parseJwt(token) {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);

  };

  componentDidMount() {

    document.cookie = "username=connect.sid"

    console.log(document.cookie);

    const compSelected = localStorage.getItem("compSelected");

    if (compSelected) {
      this.setState({ selected: false });
    }

    const user = JSON.parse(localStorage.getItem("userToken"));

    if (user.userType === 3) {

      const arr = [];
      const decode = this.parseJwt(user.token);

      axios.get(baseUrl + "usersAcc/creator/" + user.userId, {
        withCredentials: false
      }).then(res => {

        const creador = res.data.result[0].idUserCreador;
        localStorage.setItem("userCreator", creador);
        console.log(creador);

        for (let index = 1; index < 6; index++) {
          const databases = 'empresa' + creador + '_' + index;

          axios.get(baseUrl + "usersAcc/permissions/" + databases, {
            withCredentials: false
          }).then(res => {

            const filteredArr = res.data.result.find(item => item.usuario === decode.usuario);

            if (!(filteredArr === undefined)) {
              // console.log(filteredArr.usuarios_accesos.startsWith('1'));
              if (filteredArr.usuarios_accesos.startsWith('1')) {
                this.setState({ post: true })
              }
            }

          }).catch(e => console.log(e))

        }

        // usuario_accesos.push(arr[0].usuarios_accesos);

        this.setState({ filtered: arr });


      }).catch(e => { console.log(e) });
    }

    // setTimeout(function () {
    //   // console.log(this.state.filtered);
    // }
    //   .bind(this),
    //   3000);

  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
  }

  async selected(value) {
    // e.preventDefault();
    if (value === 17) {
      logout().then(result => {

        console.log(result.data);

        // this.setState({
        //   isLogged: !this.state.isLogged
        // });

        const history = createBrowserHistory();
        history.push({ pathname: '/' });
        // window.location.reload();
      }).catch(error => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
    }
  }

  companySelected = selected => {
    console.log(selected);
  };

  render() {
    const { classes, color, logo, image, logoText, routes, companySelected } = this.props;

    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          if (prop.invisible) return null;

          const user = JSON.parse(localStorage.getItem("userToken"));

          if (user.userType === 0) {
            if (prop.master === false) return null;
          } else if (user.userType === 1) {
            if (prop.master) return null;
            if (prop.method) return null;
          } else {
            if (prop.allowed) return null;
          }

          //PROBARRRRRRRRR ESTOO

          if (this.state.post) {
            if (prop.method) return null;
          } else {
            if (prop.method === false) return null;
          }

          // if (prop.selected === false) return null; //muestra si seleciono de lo contrario no lo muestra

          if (this.state.selected) {
            if (prop.selected === true) return null;
          } else {
            if (prop.selected === false) return null;
          }

          var activePro = " ";
          var listItemClasses;

          if (prop.path === "/logout") {
            activePro = classes.activePro + " ";
            listItemClasses = classNames({
              [" " + classes[color]]: true
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          }

          // if (prop.path) {
          //   listItemClasses = classNames({
          //     [" " + classes[color]]: this.activeRoute(prop.path)
          //   });
          // }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });

          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses} onClick={() => { this.selected(prop.id) }}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                      <prop.icon />
                    )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );

    const compSelected = localStorage.getItem("compSelected");

    if (compSelected) {
      var brand = (
        <div className={classes.logo}>
          <a style={{ color: "white" }} className={classes.logoLink}>
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
            {companySelected}
          </a>
          <a style={{ color: "white" }} className={classes.logoLink}>
            <Button
              variant="contained"
              onClick={() => {
                const history = createBrowserHistory();
                history.push({ pathname: '/' });
                window.location.reload();
                setTimeout(() => {
                  this.setState({ selected: true });
                }, 2000)
                localStorage.removeItem("compSelected");
              }}
              style={{ color: "white", borderRadius: '0px', backgroundColor: 'transparent' }}
            >
              Seleccionar otra empresa
              <ArrowForward className={classes.rightIcon} />
            </Button>
          </a>
        </div>
      );
    } else {
      // eslint-disable-next-line
      var brand = (
        <div className={classes.logo}>
          <a style={{ color: "white", fontSize: '17px' }} className={classes.logoLink}>
            <div className={classes.logoImage}>
              <img src={logo} alt="logo" className={classes.img} />
            </div>
            {logoText}
          </a>
        </div>
      );

    }

    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              {/* <HeaderLinks /> */}
              {links}
              {/* logout */}
              <List>
                <NavLink
                  to="/"
                >
                  <ListItem button>
                    <ListItemText
                      primary="Cerrar Sesión"
                      disableTypography={true}
                    />
                  </ListItem>
                </NavLink>
              </List>
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
