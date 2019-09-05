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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

import Save from "@material-ui/icons/Save";
import Button from 'components/CustomButtons/Button.jsx';

import axios from "axios";
import { serverUrl } from "variables/general";

const styles = theme => ({
  textField: {
    margin: 10
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
  root: {
    margin: 10
  },
  button: {
    float: 'right'
  },
  btnSelect:{
    width: '400px'
  }
});

class Sucursal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
    };
    this.myFunction = this.myFunction.bind(this);
  }

  componentDidMount() {
    axios
      .get(serverUrl + `userCompany/`, {
        withCredentials: false
      })
      .then(res => {
        const companies = res.data.result;
        this.setState({
          companies: companies
        });
        console.log(companies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  myFunction(value){
    alert(value);
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
                    <GridItem xs={12} sm={12} md={8}>
                      <TextField
                        id="standard-full-width"
                        label="Nombre de la sucursal"
                        fullWidth
                        margin="normal"
                        name="sucursal_name"
                        value={this.props.sucursal_name}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        id="standard-full-width"
                        label="Número de la sucursal"
                        fullWidth
                        margin="normal"
                        name="sucursal"
                        value={this.props.sucursal}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                          Seleccione empresa a la cual pertenece
                      </InputLabel>
                        <Select
                          value={this.props.user_company}
                          onChange={this.props.onChange}
                          // onClose={this.props.myFunction(this.state.value)}
                          input={
                            <Input
                              name="user_company"
                              id="age-label-placeholder"
                            />
                          }
                          displayEmpty
                          name="user_company"
                        >
                          {this.state.companies.map((row, i) => (
                            <MenuItem 
                              key={i} 
                              value={row.empresa} 
                              // onClick={() => {
                              //   this.myFunction.bind(row.empresa, i)
                              // }}
                            >
                              {/* {row.nombre} */}
                              <span
                                // color="transparent"
                                className={classes.btnSelect}
                                onClick={() =>
                                  {this.props.myFunction(
                                    row.empresa,
                                    i
                                  )}
                                }
                              >
                                {row.nombre}  
                              </span>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.props.sucursal_status}
                            value="sucursal_status"
                            onChange={this.props.handleChange("sucursal_status")}
                            classes={{
                              root: classes.root,
                              checked: classes.checked
                            }}
                          />
                        }
                        label="Estatus"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Button onClick={this.props.saveSucursal} className={classes.button}>
                <Save /> Guardar
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Sucursal);
