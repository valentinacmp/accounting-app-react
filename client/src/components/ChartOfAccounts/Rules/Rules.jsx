import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import cyan from "@material-ui/core/colors/cyan";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CardHeader from "components/Card/CardHeader.jsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.jsx";
import Delete from "@material-ui/icons/Delete";
import { Table } from "@material-ui/core";

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
  appBar: {
    backgroundColor: "#00acc1"
  },
  table: {
    height: '260px'
  },
  deleteBtn:{
    width: '15%',
    left: '83%'
  }
});

function Rules(props) {
  const { classes } = props;
  return <div>
      <GridContainer>
        <GridItem md={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField id="standard-full-width" label="Código" fullWidth margin="normal" className={classes.textField} InputLabelProps={{ shrink: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                      Tipo de actividad:
                    </InputLabel>
                    <Select input={<Input name="age" id="age-label-placeholder" />} displayEmpty name="age" className={classes.selectEmpty}>
                      <MenuItem value={10}> Operacional </MenuItem>
                      <MenuItem value={20}> Inversión </MenuItem>
                      <MenuItem value={10}> Financiamiento </MenuItem>
                      <MenuItem value={20}> Caja </MenuItem>
                      <MenuItem value={20}> Sin definir </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField id="standard-full-width" label="Descripción" fullWidth margin="normal" className={classes.textField} InputLabelProps={{ shrink: true }} />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card plain>
                    <CardHeader>
                      <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                          <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                            Notas Aclaratorias
                          </Typography>
                        </Toolbar>
                      </AppBar>
                    </CardHeader>
                    <CardBody>
                      <Table responsive bordered className={classes.table}>
                        <thead>
                          <tr>
                            <th>Norma NIC - NIF</th>
                            <th>Tipo</th>
                            <th>Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                    <Button color="danger" size="sm" simple className={classes.deleteBtn}>
                      <Delete /> Borrar
                    </Button>
                  </Card>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>;
}

export default withStyles(styles)(Rules);
