import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import CardHeader from "components/Card/CardHeader.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";
// import { ValidatorForm } from "react-material-ui-form-validator";

const styles = theme => ({
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
    marginTop: theme.spacing(2),
  },
  inputSim: {
    marginTop: "20px"
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  },
  maxLines: {
    width: "70px"
  }
});

class AccountConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      value: true
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    //   ValidatorForm.addValidationRule("isValidMask", string =>
    //     regex.test(string)
    //   );

    //   ///^([0-9.])*$/
    //   // var regex = /^[0-9\b]+$/
    //   var regex = /^([9]{1,9}[\/|.|_|-]{1}[9]{0,9}[\/|.|_|-]{1}[9]{0,9}[\/|.|_|-]{1}[9]{0,9})|(^[9]{1,9})|(^[9]{1,9}[\/|.|_|-]{1}[9]{0,9})|(^[9]{1,9}[\/|.|_|-]{1}[9]{0,9}[\/|.|_|-]{1}[9]{0,9})|(^[9]{1,9}[\/|.|_|-]{1})$/g;
  }

  // componentWillReceiveProps(nextProps) {
  //   var str = this.state.password;
  //   var n = str.endsWith("9");
  //   var n1 = str.endsWith("9.");

  //   var str2 = ".";
  //   if (n) {
  //     const res = str.concat(str2);
  //     console.log(res);
  //     this.setState({ password: res });
  //   }
  //   console.log(this.state.password);
  //   // console.log(str)
  //   // console.log(res)
  // }

  // shouldComponentUpdate(nextProps, nextState) {

  //   var str = this.state.password;
  //   var n = str.endsWith("9");

  //   // var str1 = "Hello ";
  //   // var str2 = ".";
  //   // // var res = str1.concat(str2);
  //   // const res = str.concat(str2);
  //   // console.log(res)
  //   // console.log(str)

  //   // if (n) {
  //     return this.state.value != nextState.value;
  //   // }

  // }

  // handleChange = (event) => {
  //   const { password } = this.state;
  //   password[event.target.name] = event.target.value;
  //   this.setState({ password });
  // }

  handleSubmit = () => {
    // your submit logic
  };

  numberValidator = e => {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (
        !(
          key === 105 ||
          key === 8 ||
          key === 110 ||
          key === 109 ||
          key === 55 ||
          key === 189 ||
          key === 190 ||
          key === 57 ||
          key === 37 ||
          key === 39
        )
      ) {
        e.preventDefault();
        this.setState({ password: this.state.password + 9 });
        // if (((key === 8) || (key === 110) || (key === 109) || (key === 55) || (key === 189) || (key === 190))){
        //   console.log('es separador')
        // }
      }
    }

    if (
      (e.ctrlKey === true && (e.which === 118 || e.which === 86)) ||
      e.keyCode === 93
    ) {
      alert("NOT!");
      e.preventDefault();
    }

    window.oncontextmenu = function () {
      return false;
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form noValidate onSubmit={this.props.onSubmit}>
          <GridContainer>
            <GridItem md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Ejercicio Contable Actual
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="date"
                            label="Fecha de Inicio:"
                            type="date"
                            fullWidth
                            defaultValue={this.props.empresa_fecha_inicio}
                            name="empresa_fecha_inicio"
                            onChange={this.props.onChange}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="date"
                            label="Fecha Fin:"
                            type="date"
                            fullWidth
                            defaultValue={this.props.empresa_fecha_fin}
                            name="empresa_fecha_fin"
                            onChange={this.props.onChange}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Formato Plan de Cuentas
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl
                            className={classes.formControl}
                            disabled={this.props.disabled}
                          >
                            <InputLabel shrink htmlFor="age-label-placeholder">
                              Separador
                            </InputLabel>
                            <Select
                              value={this.props.empresa_separador_pc}
                              onChange={this.props.onChange}
                              input={
                                <Input
                                  name="empresa_separador_pc"
                                  id="age-label-placeholder"
                                />
                              }
                              displayEmpty
                              name="empresa_separador_pc"
                              className={classes.selectEmpty}
                            >
                              <MenuItem value="">
                                <em>Seleccione una opción</em>
                              </MenuItem>
                              <MenuItem value=".">.</MenuItem>
                              <MenuItem value="-">-</MenuItem>
                              <MenuItem value="/">/</MenuItem>
                              <MenuItem value="_">_</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Máscara"
                            fullWidth
                            disabled={this.props.disabled}
                            type="text"
                            className={classes.textField}
                            onKeyDown={this.props.numberValidator}
                            onChange={this.props.onChange}
                            name="formato"
                            value={this.props.formato}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                          <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="age-label-placeholder">
                              Símbolo
                            </InputLabel>
                            <Select
                              value={this.props.empresa_simbolo}
                              onChange={this.props.onChange}
                              input={
                                <Input
                                  name="empresa_simbolo"
                                  id="age-label-placeholder"
                                />
                              }
                              displayEmpty
                              name="empresa_simbolo"
                              className={classes.selectEmpty}
                            >
                              <MenuItem value="">
                                <em>Seleccione una opción</em>
                              </MenuItem>
                              <MenuItem value="()">{"()"}</MenuItem>
                              <MenuItem value="{}">{"{}"}</MenuItem>
                              <MenuItem value="[]">{"[]"}</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem
                          xs={12}
                          sm={12}
                          md={4}
                          style={{ marginTop: "20px" }}
                        >
                          <InputLabel>(Saldo Acreedor)</InputLabel>
                        </GridItem>
                      </GridContainer>
                      {/* <GridContainer>
                      <GridItem>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Activar Plan de Cuentas Local como Plan de Cuentas VEN-NIF para PYME (Plan unico)"
                        />
                      </GridItem>
                    </GridContainer> */}
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Configuración de Comprobantes
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="empresa_fecha_mov"
                                checked={this.props.empresa_fecha_mov}
                                onChange={this.props.onHandleChange0}
                                classes={{
                                  root: classes.root,
                                  checked: classes.checked
                                }}
                              />
                            }
                            label="Fecha fija de movimiento"
                          />
                        </GridItem>
                        {/* <GridItem xs={12} sm={12} md={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Manejo de flujo de efectivo"
                        />
                      </GridItem> */}
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="empresa_centros_costos"
                                checked={this.props.empresa_centros_costos}
                                onChange={this.props.onHandleChange1}
                                classes={{
                                  root: classes.root,
                                  checked: classes.checked
                                }}
                              />
                            }
                            label="Validar centros de costos"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="empresa_correlativo"
                                checked={this.props.empresa_correlativo}
                                onChange={this.props.onHandleChange2}
                                classes={{
                                  root: classes.root,
                                  checked: classes.checked
                                }}
                              />
                            }
                            label="Correlativo Automático"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="empresa_num_lineas"
                                    checked={this.props.empresa_num_lineas}
                                    onChange={this.props.onHandleChange3}
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Máximo número de líneas"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <TextField
                                id="standard-bare"
                                className={classes.maxLines}
                                defaultValue="1000"
                                margin="normal"
                              />
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        {/* <GridItem xs={12} sm={12} md={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Imprimir detalle del mnovimiento (Memo)"
                        />
                      </GridItem> */}
                        {/* <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              classes={{
                                root: classes.root,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Incluir atomáticamente la descripción de la cuenta contable"
                        />
                      </GridItem> */}
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Formatos de centros de costos
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <FormControl
                            className={classes.formControl}
                            disabled={this.props.disabled}
                          >
                            <InputLabel shrink htmlFor="age-label-placeholder">
                              Separador
                            </InputLabel>
                            <Select
                              value={this.props.empresa_separador_cc}
                              onChange={this.props.onChange}
                              input={
                                <Input
                                  name="empresa_separador_cc"
                                  id="age-label-placeholder"
                                />
                              }
                              displayEmpty
                              name="empresa_separador_cc"
                              className={classes.selectEmpty}
                            >
                              <MenuItem value="">
                                <em>Seleccione una opción</em>
                              </MenuItem>
                              <MenuItem value=".">.</MenuItem>
                              <MenuItem value="-">-</MenuItem>
                              <MenuItem value="/">/</MenuItem>
                              <MenuItem value="_">_</MenuItem>
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            label="Máscara"
                            disabled={this.props.disabled}
                            type="text"
                            fullWidth
                            className={classes.textField}
                            onKeyDown={this.props.numberValidator}
                            onChange={this.props.onChange}
                            name="formato_cc"
                            value={this.props.formato_cc}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AccountConfig);
