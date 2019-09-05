import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//material-dashboard components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";

import NumberFormat from 'react-number-format';

const styles = theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
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
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  },
  active: {
    height: '85%',
    borderRadius: '0',
    backgroundColor: '#ececec',
    position: 'relative',
    bottom: '13%'
  },
});

class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  componentDidMount() {

  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {

    const { classes } = this.props;

    // const numberFormatCustom = (props) => {
    // const {inputRef, onChange, ...other } = props
    
    //   return (
    //     <NumberFormat
    //       {...other}
    //       // getInputRef={inputRef}
    //       value={this.props.monedas_factor}
    //       name="monedas_factor"
    //       onChange={this.props.onChange}
    //       decimalSeparator=","
    //       thousandSeparator="."
    //       prefix={`${this.props.monedas_simbolo}`}
    //     />
    //   );
    // }

    return (
      <div>
        <Card>
          <CardContent>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="standard-full-width"
                  label="Descripción"
                  fullWidth
                  margin="normal"
                  value={this.props.monedas_des}
                  name="monedas_des"
                  onChange={this.props.onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                /> 
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <TextField
                  id="standard-full-width"
                  label="Simbolo"
                  fullWidth
                  margin="normal"
                  value={this.props.monedas_simbolo}
                  name="monedas_simbolo"
                  onChange={this.props.onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <NumberFormat
                  className={classes.textField}
                  label="Factor"
                  fullWidth
                  margin="normal"
                  value={this.props.monedas_factor}
                  name="monedas_factor"
                  onChange={this.props.onChange}
                  decimalSeparator=","
                  thousandSeparator="."
                  customInput={TextField}
                  // prefix={`${this.props.monedas_simbolo}`}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                {/* <TextField
                  className={classes.textField}
                  label="Factor"
                  fullWidth
                  margin="normal"
                  // value={this.props.monedas_factor}
                  // name="monedas_factor"
                  // onChange={this.props.onChange}
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: numberFormatCustom
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                /> */}
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  id="standard-full-width"
                  label="Ultima Actualización"
                  fullWidth
                  margin="normal"
                  // value={this.props.centros_de_costos_des}
                  // name="centros_de_costos_des"
                  // onChange={this.onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </GridItem>
              <GridItem xs={4} >
                <Card className={classes.active}>
                  <CardContent>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="monedas_status"
                          checked={this.props.monedas_status}
                          onChange={this.props.onHandleChange}
                          classes={{
                            root: classes.root,
                            checked: classes.checked
                          }}
                        />
                      }
                      label="Activo"
                    />
                  </CardContent>
                </Card>
              </GridItem>
            </GridContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Currency);
