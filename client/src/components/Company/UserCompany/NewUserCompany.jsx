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
import Save from "@material-ui/icons/Save";
import Button from 'components/CustomButtons/Button.jsx';


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
  button: {
    float: 'right'
  }
});

class NewUserCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
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
                        label="Nombre de la empresa"
                        fullWidth
                        margin="normal"
                        name="company_name"
                        value={this.props.company_name}
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
                        label="RIF"
                        fullWidth
                        margin="normal"
                        name="company_rif"
                        value={this.props.company_rif}
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="date"
                        label="Fecha de Inicio:"
                        type="date"
                        fullWidth
                        defaultValue={this.props.company_start_date}
                        name="company_start_date"
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        id="date"
                        label="Fecha Fin:"
                        type="date"
                        fullWidth
                        defaultValue={this.props.company_end_date}
                        name="company_end_date"
                        onChange={this.props.onChange}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        id="standard-full-width"
                        label="Días de Evaluación"
                        fullWidth
                        name="company_days"
                        value={this.props.company_days}
                        onChange={this.props.onChange}
                        margin="normal"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.props.company_status}
                            value="company_status"
                            onChange={this.props.handleChange("company_status")}
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
              <Button onClick={this.props.saveCompany} className={classes.button}>
                <Save/> Guardar
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(NewUserCompany);
