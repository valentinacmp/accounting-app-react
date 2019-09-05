import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";

const styles = theme => ({
  textField: {
    margin: 10
  },
  active: {
    height: "75%",
    backgroundColor: "#ececec",
    borderRadius: 0,
    alignItems: "center"
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  }
});

class GeneralData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
     
    }
  }

 componentDidMount() {
   
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form noValidate onSubmit={this.props.onSubmit}>
          <GridContainer>
            <GridItem md={12}>
              <Card>
                <CardContent>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="address"
                        multiline
                        label="Dirección:"
                        rows="2"
                        margin="normal"
                        name="empresa_direccion"
                        value={this.props.empresa_direccion}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <TextField
                        id="standard-full-width"
                        label="Contacto:"
                        fullWidth
                        margin="normal"
                        name="empresa_contacto"
                        value={this.props.empresa_contacto}
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
                        label="R.I.F:"
                        fullWidth
                        margin="normal"
                        name="empresa_rif"
                        value={this.props.empresa_rif}
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
                      <TextField
                        id="standard-full-width"
                        label="Ciudad:"
                        fullWidth
                        margin="normal"
                        name="empresa_ciudad"
                        value={this.props.empresa_ciudad}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        id="standard-full-width"
                        label="N.I.T:"
                        fullWidth
                        margin="normal"
                        name="comp_nif"
                        value={this.props.comp_nif}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem> */}
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <TextField
                        id="standard-full-width"
                        label="Telefono:"
                        fullWidth
                        margin="normal"
                        name="empresa_telefono"
                        value={this.props.empresa_telefono}
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
                        label="Telefax:"
                        fullWidth
                        margin="normal"
                        name="empresa_telefax"
                        value={this.props.empresa_telefax}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={6}>
                      <GridContainer>
                        <GridItem xs={12}>
                          <TextField
                            id="standard-full-width"
                            label="Email:"
                            fullWidth
                            margin="normal"
                            name="empresa_email"
                            value={this.props.empresa_email}
                            onChange={this.props.onChange}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12}>
                          <TextField
                            id="standard-full-width"
                            label="Sitio Web:"
                            fullWidth
                            margin="normal"
                            name="empresa_website"
                            value={this.props.empresa_website}
                            onChange={this.props.onChange}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={6}>
                      <Card className={classes.active}>
                        <CardContent>
                          <FormControlLabel
                            control={
                              <Checkbox
                                // name="empresa_status"
                                checked={this.props.empresa_status}
                                onChange={this.props.onHandleChange}
                                value={this.props.empresa_status}
                                className={classes.checked}
                              />
                            }
                            label="Activa"
                          />
                        </CardContent>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </CardContent>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(GeneralData);
