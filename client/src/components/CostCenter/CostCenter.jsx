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

const styles = theme => ({
  textField: {
    margin: 10
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  }
});

class CostCenter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem md={12}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <TextField
                      id="standard-full-width"
                      label="Descripción"
                      fullWidth
                      margin="normal"
                      value={this.props.centros_de_costos_des}
                      name="centros_de_costos_des"
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
                      label="Código"
                      fullWidth
                      margin="normal"
                      value={this.props.centros_de_costos_cod}
                      name="centros_de_costos_cod"
                      onChange={this.props.onChange}
                      onKeyDown={this.props.numberValidator}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="centros_de_costos_movimiento"
                              checked={this.props.centros_de_costos_movimiento}
                              onChange={this.props.onHandleChange0}
                              classes={{
                                root: classes.root,
                                checked: classes.checked
                              }}
                            />
                          }
                          label="Centro de Movimiento"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="centros_de_costos_presupuesto"
                              checked={this.props.centros_de_costos_presupuesto}
                              onChange={this.props.onHandleChange1}
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
                              name="centros_de_costos_status"
                              checked={this.props.centros_de_costos_status}
                              onChange={this.props.onHandleChange}
                              classes={{
                                root: classes.root,
                                checked: classes.checked
                              }}
                            />
                          }
                          label="Activo"
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(CostCenter);
