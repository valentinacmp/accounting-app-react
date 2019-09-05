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
import cyan from "@material-ui/core/colors/cyan";


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
  }
});

function Accounts(props) {

  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem md={12}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>Cuentas de Utilidad y Pérdidas</h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                          <TextField
                            id="standard-full-width"
                            label="Utilidad Acumulada"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          <TextField
                            id="standard-full-width"
                            fullWidth
                            label="Buscar:"
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                          <TextField
                            id="standard-full-width"
                            label="Pérdidas Acumuladas"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          <TextField
                            id="standard-full-width"
                            fullWidth
                            label=" "
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                          <TextField
                            id="standard-full-width"
                            label="Utilidad del Ejercicio"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          <TextField
                            id="standard-full-width"
                            fullWidth
                            label=" "
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                          <TextField
                            id="standard-full-width"
                            label="Pérdidas del ejercicio"
                            fullWidth
                            margin="normal"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          <TextField
                            id="standard-full-width"
                            fullWidth
                            label=" "
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

export default withStyles(styles)(Accounts);
