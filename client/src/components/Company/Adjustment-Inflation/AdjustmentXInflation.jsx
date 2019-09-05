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
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "14px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   },
//   cardTitle: {
//     marginTop: "0",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   },
//   textField: {
//     margin: 10
//   },
//   formControl: {
//     // margin: theme.spacing.unit,
//     minWidth: "100%"
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   },
//   inputSim: {
//     marginTop: "20px"
//   },
//   checked: {
//     color: cyan[600],
//     "&$checked": {
//       color: cyan[500]
//     }
//   }
// }));

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
    // margin: theme.spacing.unit,
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

function AdjustmentXInflation(props) {

  const { classes } = props;
  // const classes = useStyles()
  return (
    <div>
      <GridContainer>
        <GridItem md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <h6> Expresar el porcentaje de ajuste con</h6>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">

                    </InputLabel>
                    <Select
                      input={<Input name="age" id="age-label-placeholder" />}
                      displayEmpty
                      name="age"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={10}> . </MenuItem>
                      <MenuItem value={20}> / </MenuItem>
                      <MenuItem value={30}> - </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <h6>decimal(es)</h6>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>Ajuste Inicial</h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                classes={{
                                  root: classes.root,
                                  checked: classes.checked,
                                }}
                              />
                            }
                            label="Ajuste incial elaborado"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id="standard-full-width"
                            label="%Registro de activos actualizados"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id="date"
                            label="Fecha ajuste inicial:"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            id="standard-full-width"
                            label="Monto ajuste inicial"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            id="standard-full-width"
                            label="Actualización de patrimonio"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            id="standard-full-width"
                            label=" "
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>Ajuste Regular x Inflación</h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="date"
                            label="Fecha ajuste inicial:"
                            type="date"
                            fullWidth
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="standard-full-width"
                            label="Monto ajuste inicial"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
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
    </div>
  );
}

export default withStyles(styles)(AdjustmentXInflation);

