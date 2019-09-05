import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
// import classNames from "classnames";
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

const styles = theme => ({
  textField: {
    flexBasis: 200
  },
  container: {
    position: 'relative',
    top: '160px'
  },
  card:{
    width: '80%'
  },
  text:{
    textAlign: 'center'
  },
  register:{
    backgroundColor: 'transparent',
    color: 'gray',
    boxShadow: 'none'
  }
});


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      user_email: "",
      user_password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
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
      // <div
      //   // style={{
      //   //   // backgroundImage: "url(" + image + ")",
      //   //   backgroundSize: "cover",
      //   //   backgroundPosition: "top center"
      //   // }}
      // >
        // <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form>
                  <CardHeader color="info">
                    <h4 className={classes.text}>Hybrid Accounting</h4>
                  </CardHeader>
                  <CardBody>
                    <TextField
                      className={classes.textField}
                      default
                      name="user_username"
                      value={this.props.user_username}
                      onChange={this.props.onChange}
                      id="input-with-icon-textfield"
                      label="Usuario"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person />
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel htmlFor="adornment-password">
                        Contraseña
                      </InputLabel>
                      <Input
                        name="user_password"
                        id="adornment-password"
                        onChange={this.props.onChange}
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.props.user_password}
                        autoComplete="new-password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </CardBody>
                  <CardFooter>
                    {/* <GridContainer>
                      <GridItem xs={12} sm={12} md={12}> */}
                        <Button
                          block
                          color="info"
                          size="lg"
                          onClick={this.props.onSubmit}
                        >
                          Iniciar Sesión <br />
                          <LoginApp />
                        </Button>
                      {/* </GridItem> */}
                      {/* <GridItem xs={12} sm={12} md={12}>
                        <h6 className={classes.text}>
                          <Button
                            className={classes.register}
                            onClick={this.props.register}
                          >
                            ¿Usuario Nuevo? Registrar ahora!
                          </Button>
                        </h6>
                      </GridItem> */}
                    {/* </GridContainer> */}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        // </div>
    );
  }
}


export default withStyles(styles)(Login);
