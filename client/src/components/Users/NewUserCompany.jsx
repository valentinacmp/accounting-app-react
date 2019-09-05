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
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Button from "components/CustomButtons/Button.jsx";

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
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  },
  checkbox: {
    margin: 10
  }
});

class NewUserCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      company: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
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

  handleClick(company_code, company_id, company_name) {
    console.log(
      `RIF -> ${company_code} ID -> ${company_id} NOMBRE -> ${company_name}`
    );
    // this.setState({ sucursal_nombre: groupName })
    axios
      .get(serverUrl + `userCompany/sucursal/` + company_code, {
        withCredentials: false
      })
      .then(res => {
        const company = res.data.result;
        this.setState({ company });
        console.log(company);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick2(sucursal) {
    console.log(`my data are ${sucursal}`);
  }

  handleOk = () => {
    this.props.onSelect(this.state.value);
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    const company = this.props.company;

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
                      label="Nombre del usuario"
                      fullWidth
                      margin="normal"
                      name="user_username"
                      value={this.props.user_username}
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
                      name="user_password"
                      value={this.props.user_password}
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
                        Seleccione empresa a la cual pertenece
                      </InputLabel>
                      <Select
                        value={this.props.user_company}
                        onChange={this.props.onChange}
                        input={
                          <Input
                            name="user_company"
                            id="age-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="user_company"
                        className={classes.selectEmpty}
                      >
                        {this.state.companies.map((row, i) => (
                          <MenuItem key={i} value={row.empresa}>
                            <span
                              color="transparent"
                              onClick={() =>
                                this.props.myFunction(
                                  row.empresa,
                                  i,
                                  row.nombre
                                )
                              }
                            >
                              {row.nombre}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Seleccione la sucursal a la cual pertenece
                      </InputLabel>
                      <Select
                        value={this.props.user_sucursal}
                        onChange={this.props.onChange}
                        input={
                          <Input
                            name="user_sucursal"
                            id="age-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="user_sucursal"
                        className={classes.selectEmpty}
                      >
                        {company.map((row, i) => (
                          <MenuItem key={i} value={row.sucursal}>
                            <span
                              color="transparent"
                              onClick={() =>
                                this.props.myFunction2(
                                  row.sucursal
                                )
                              }
                            >
                              {row.nombre}
                            </span>
                          </MenuItem>
                        ))}
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

export default withStyles(styles)(NewUserCompany);
