import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "components/Card/CardHeader.jsx";
// import NumberFormat from "react-number-format";

const styles = theme => ({
  textField: {
    margin: 10
  },
  active: {
    height: "78%",
    borderRadius: 0,
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  },
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

class GeneralData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form noValidate onSubmit={this.props.onSubmit}>
          <GridContainer>
            <GridItem md={12}>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      {/* <NumberFormat
                        className={classes.textField}
                        placeholder={this.props.formato}
                        value={this.props.plan_de_cuentas_cod}
                        customInput={TextField}
                        fullWidth
                        format={this.props.numberFormat}
                        mask={this.props.mascara}
                      /> */}
                      <TextField
                        id="standard-full-width"
                        label="Código"
                        fullWidth
                        margin="normal"
                        name="plan_de_cuentas_cod"
                        onKeyDown={this.props.numberValidator}
                        value={this.props.plan_de_cuentas_cod}
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
                          Tipo de actividad:
                        </InputLabel>
                        <Select
                          value={this.props.plan_de_cuentas_actv}
                          onChange={this.props.onChange}
                          input={
                            <Input
                              name="plan_de_cuentas_actv"
                              id="age-label-placeholder"
                            />
                          }
                          displayEmpty
                          name="plan_de_cuentas_actv"
                          className={classes.selectEmpty}
                        >
                          <MenuItem value="Operacional"> Operacional </MenuItem>
                          <MenuItem value="Inversión"> Inversión </MenuItem>
                          <MenuItem value="Financiamiento">
                            {" "}
                            Financiamiento{" "}
                          </MenuItem>
                          <MenuItem value="Caja"> Caja </MenuItem>
                          <MenuItem value="Sin definir"> Sin definir </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="standard-full-width"
                        label="Descripción"
                        fullWidth
                        margin="normal"
                        name="plan_de_cuentas_des"
                        value={this.props.plan_de_cuentas_des}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardHeader>
                          <h4 className={classes.cardTitle}>Características</h4>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Cuenta de Movimiento"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja Presupuesto"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja Bases"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja Centro de Costo"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja F.Efectivo"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja Terceros"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Maneja Documentos"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Aplicar Auditoria"
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    classes={{
                                      root: classes.root,
                                      checked: classes.checked
                                    }}
                                  />
                                }
                                label="Aplicar Ajuste x Inflación"
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <Card>
                                <CardHeader>
                                  <h4 className={classes.cardTitle}>
                                    Tipos Activos/Pasivos
                                  </h4>
                                </CardHeader>
                                <CardBody>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="Corriente"
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="No Corriente"
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="C. / No C."
                                      />
                                    </GridItem>
                                  </GridContainer>
                                </CardBody>
                              </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <Card>
                                <CardHeader>
                                  <h4 className={classes.cardTitle}>
                                    Patrimonio de Propietario de la Compañia
                                  </h4>
                                </CardHeader>
                                <CardBody>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="Atribuible"
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="No Atribuible"
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="A. / No A."
                                      />
                                    </GridItem>
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
                                    Centros de Costos
                                  </h4>
                                </CardHeader>
                                <CardBody>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={8}>
                                      <TextField
                                        id="standard-full-width"
                                        label=" "
                                        fullWidth
                                        margin="normal"
                                        className={classes.textField}
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                      />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="Centro de Costo Fijo"
                                      />
                                    </GridItem>
                                  </GridContainer>
                                </CardBody>
                              </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                              <Card>
                                <CardHeader>
                                  <h4 className={classes.cardTitle}>Saldos</h4>
                                </CardHeader>
                                <CardBody>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                      <TextField
                                        id="standard-full-width"
                                        label="Saldo Inicial"
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
                                        id="standard-full-width"
                                        label="Débitos Acumulados"
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
                                        id="standard-full-width"
                                        label="Saldo Actual"
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
                                        id="standard-full-width"
                                        label="Créditos Acumulados"
                                        fullWidth
                                        margin="normal"
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
                            <GridItem xs={12} sm={12} md={4}>
                              <Card className={classes.active}>
                                <CardBody>
                                  <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked
                                            classes={{
                                              root: classes.root,
                                              checked: classes.checked
                                            }}
                                          />
                                        }
                                        label="Activa"
                                      />
                                    </GridItem>
                                  </GridContainer>
                                </CardBody>
                              </Card>
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(GeneralData);
