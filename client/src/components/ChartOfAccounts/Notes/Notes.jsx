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
import { Table } from 'reactstrap';

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
  },
  appBar: {
    backgroundColor: "#00acc1"
  },
  table:{
    height: '260px'
  }
});

class Notes extends React.Component  {
  constructor(props){
    super(props);

    this.state ={

    }
  }

  render(){

  const { classes } = this.props;

  return(
    <div>
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
                    <Select 
                      value={this.props.plan_de_cuentas_actv_notes}
                      onChange={this.props.onChange}
                      input={
                        <Input
                          name="plan_de_cuentas_actv_notes"
                          id="age-label-placeholder"
                        />
                      }
                      displayEmpty
                      name="plan_de_cuentas_actv_notes"
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="Operacional"> Operacional </MenuItem>
                      <MenuItem value="Inversión"> Inversión </MenuItem>
                      <MenuItem value="Financiamiento"> Financiamiento </MenuItem>
                      <MenuItem value="Caja"> Caja </MenuItem>
                      <MenuItem value="Sin definir"> Sin definir </MenuItem>
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
                            <th>Orden</th>
                            <th>Año</th>
                            <th>Periodo</th>
                            <th>Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>);
  }
  
}

export default withStyles(styles)(Notes);
