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
  textField: {
    margin: 10
  },
  active: {
    height: "78%",
    borderRadius: 0,
    alignItems: "center"
  },
  formControl: {
    margin: theme.spacing.unit,
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

function Third(props) {
  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="standard-full-width"
                    label="Código"
                    fullWidth
                    margin="normal"
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
                      input={<Input name="age" id="age-label-placeholder" />}
                      displayEmpty
                      name="age"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value={10}> Proveedor </MenuItem>
                      <MenuItem value={20}> Cliente </MenuItem>
                      <MenuItem value={10}> Ninguno </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <TextField
                    id="standard-full-width"
                    label="Descripción"
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
                        checked
                        disabled
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label="Activo"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="standard-full-width"
                    label="Contacto"
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
                    label="Dirección"
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
                    label="Ciudad"
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
                    label="R.I.F"
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
                    label="Telefonos"
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
                    label=" "
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
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(Third);
