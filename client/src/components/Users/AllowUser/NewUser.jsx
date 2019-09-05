import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import cyan from "@material-ui/core/colors/cyan";

// import Button from '@material-ui/core/Button';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  textField: {
    margin: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  inputSim: {
    marginTop: "20px"
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  }
});

class NewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
    
  }

   componentDidMount() {

    // ValidatorForm.addValidationRule('isUserMatch', (value) => {
    //   if(value === ''){
    //     // this.setState({
    //     //   message: 'Ya existe'
    //     // })
    //     return true;
    //   }else if (this.props.selected !== value) {
    //     this.setState({
    //       message: 'Ya existe'
    //     })
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });

  }

  // componentWillUnmount() {
  //   // remove rule when it is not needed
  //   ValidatorForm.removeValidationRule('isUserMatch');
  // }

  // handleSubmit = () => {
  //   // your submit logic
  // }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem md={12}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-full-width"
                      disabled={this.props.disabled}
                      label="Nombre"
                      fullWidth
                      margin="normal"
                      name="usuario_nombre"
                      value={this.props.usuario_nombre}
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={6}>
                    <ValidatorForm
                      ref="form"
                      onSubmit={this.handleSubmit}
                      onError={errors => console.log(errors)}
                    >
                      <TextValidator
                        label="Nombre"
                        onChange={this.props.onChange}
                        name="usuario_nombre"
                        value={this.props.usuario_nombre}
                        validators={['isUserMatch', 'required']}
                        errorMessages={[this.state.message, 'email is not valid']}
                      />
                    </ValidatorForm>
                  </GridItem> */}
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-full-width"
                      label="Descripción"
                      fullWidth
                      margin="normal"
                      name="usuario_des"
                      value={this.props.usuario_des}
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-full-width"
                      label="E-mail"
                      fullWidth
                      margin="normal"
                      name="usuario_email"
                      value={this.props.usuario_email}
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-full-width"
                      label="Ubicación"
                      fullWidth
                      margin="normal"
                      name="usuario_ubicacion"
                      value={this.props.usuario_ubicacion}
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="standard-password-input"
                      label="Contraseña"
                      fullWidth
                      type="password"
                      autoComplete="current-password"
                      margin="normal"
                      name="usuario_clave"
                      value={this.props.usuario_clave}
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="standard-full-width"
                      label="Confirmar contraseña"
                      fullWidth
                      margin="normal"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="date"
                      label="Fecha de expiración:"
                      type="date"
                      fullWidth
                      defaultValue={this.props.usuario_expiration_date}
                      name="usuario_expiration_date"
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Status
                      </InputLabel>
                      <Select
                        value={this.props.usuario_status}
                        onChange={this.props.onChange}
                        input={
                          <Input
                            name="usuario_status"
                            id="age-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="usuario_status"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>Seleccione una opción</em>
                        </MenuItem>
                        <MenuItem value="Activo">Activo</MenuItem>
                        <MenuItem value="Inactivo">Inactivo</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(NewUser);
