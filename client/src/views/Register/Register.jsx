import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
// // import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import LoginApp from "@material-ui/icons/ExitToApp";
import Person from "@material-ui/icons/PersonPin";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//material-dashboard components

import Button from "components/CustomButtons/Button.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader";

// import { withRouter } from "react-router-dom";
// import axios from "axios";

// import { Link, Link as RouterLink } from "react-router-dom";
// import { login } from "../../services/user/user";


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  container: {
    position: 'relative',
    top: '160px'
  },
  card: {
    width: '80%'
  },
  text: {
    textAlign: 'center'
  },
  register: {
    backgroundColor: 'transparent',
    color: 'gray',
    boxShadow: 'none'
  }
});


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      user_name: "",
      user_lastname: "",
      user_username: "",
      user_address: "",
      user_email: "",
      user_password: "",
      weight: "",
      weightRange: "",
      showPassword: false
    };

    this.onChange = this.onChange.bind(this);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form>
                  <CardHeader color="info">
                    <h4 className={classes.text}>Accounting App - Registrar </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          className={classes.textField}
                          default
                          name="user_name"
                          value={this.props.user_name}
                          onChange={this.props.onChange}
                          id="input-with-icon-textfield"
                          label="Nombre"
                          fullWidth
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          className={classes.textField}
                          default
                          name="user_lastname"
                          value={this.props.user_lastname}
                          onChange={this.props.onChange}
                          id="input-with-icon-textfield"
                          label="Apellido"
                          fullWidth
                        />
                      </GridItem>
                    </GridContainer>
                    <TextField
                      className={classes.textField}
                      default
                      name="user_username"
                      value={this.props.user_username}
                      onChange={this.props.onChange}
                      id="input-with-icon-textfield"
                      label="Username"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      className={classes.textField}
                      default
                      name="user_email"
                      value={this.props.user_email}
                      onChange={this.props.onChange}
                      id="input-with-icon-textfield"
                      label="Correo"
                      fullWidth
                    />
                    <TextField
                      className={classes.textField}
                      default
                      name="user_address"
                      value={this.props.user_address}
                      onChange={this.props.onChange}
                      id="input-with-icon-textfield"
                      label="Dirección"
                      fullWidth
                    />
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="adornment-password">
                            Contraseña
                          </InputLabel>
                          <Input
                            name="user_password"
                            id="adornment-password"
                            onChange={this.props.onChange}
                            type={
                              this.props.showPassword ? "text" : "password"
                            }
                            value={this.props.user_password}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.props.handleClickShowPassword}
                                >
                                  {this.props.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="adornment-password">
                            Repetir contraseña
                          </InputLabel>
                          <Input
                            name="user_password"
                            id="adornment-password"
                            onChange={this.props.onChange}
                            type={
                              this.props.showPassword ? "text" : "password"
                            }
                            value={this.props.user_password}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.props.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <Button
                          block
                          color="info"
                          size="lg"
                          onClick={this.props.onSubmit}
                        >
                          Registrar <br />
                          <LoginApp />
                        </Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <h6 className={classes.text}>
                          <Button
                            className={classes.register}
                            onClick={this.props.goToLogin}
                          >
                            ¿Ya es Usuario? Ingresar ahora!
                          </Button>
                        </h6>
                      </GridItem>
                    </GridContainer>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer/> */}
      </div>
    );
  }
}


export default withStyles(styles)(Register);
