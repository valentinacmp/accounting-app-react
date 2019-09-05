import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//material-dashboard components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";
import NumberFormat from 'react-number-format';
import ViewList from "@material-ui/icons/ViewList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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
  text: {
    float: 'right',
    fontWeight: 'bold'
  }
});

class Budget extends React.Component {
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

    return (
      <div>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  id="standard-full-width"
                  label="Descripción"
                  fullWidth
                  margin="normal"
                  value={this.props.partidas_presupuestarias_des}
                  name="partidas_presupuestarias_des"
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
                  label="Responsable"
                  fullWidth
                  margin="normal"
                  value={this.props.partidas_presupuestarias_responsable}
                  name="partidas_presupuestarias_responsable"
                  onChange={this.props.onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="address"
                  multiline
                  label="Especificaciones:"
                  rows="2"
                  margin="normal"
                  name="partidas_presupuestarias_espec"
                  value={this.props.partidas_presupuestarias_espec}
                  onChange={this.props.onChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader>
                <h6>Asignaciones <hr /></h6>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem md={12}>
                    <NumberFormat
                      className={classes.textField}
                      label="Partida Origial"
                      fullWidth
                      margin="normal"
                      value={this.props.partidas_presupuestarias_partida}
                      onKeyDown={this.props.numberValidator}
                      name="partidas_presupuestarias_partida"
                      onChange={this.props.onChange}
                      decimalSeparator=","
                      thousandSeparator="."
                      customInput={TextField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    {/* <TextField
                      id="standard-full-width"
                      label="Partida Origial"
                      fullWidth
                      margin="normal"
                      value={this.props.partidas_presupuestarias_partida}
                      name="partidas_presupuestarias_partida"
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    /> */}
                  </GridItem>
                  <GridItem md={12}>
                    <span>Centros de Costos 
                      <span className={classes.text}>
                        {this.props.partidas_presupuestarias_cc}
                        <Tooltip
                          id="tooltip-top"
                          title="Centros de Costos"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <IconButton
                            aria-label="Ver Centro de Costos"
                            onClick={this.props.handleClickOpen}
                          >
                            <ViewList />
                          </IconButton>
                        </Tooltip>
                      </span> 
                    </span>
                  </GridItem>
                  <GridItem md={12}>
                    <span>Cuentas <span className={classes.text}>{this.props.partidas_presupuestarias_cuentas}</span> </span>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader>
                <h6>Montos en Modificaciones<hr /></h6>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem md={12}>
                    <span>Modificaciones <span className={classes.text}>{this.props.partidas_presupuestarias_mod}</span> </span>
                  </GridItem>
                  <GridItem md={12}>
                    <span>Total Partida: <span className={classes.text}>{this.props.partidas_presupuestarias_total}</span> </span>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader>
                <h6>Fechas<hr /></h6>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem md={12}>
                    <TextField
                      id="date"
                      label="Fecha de Inicio:"
                      type="date"
                      fullWidth
                      defaultValue={this.props.partidas_presupuestarias_fecha_inicio}
                      name="partidas_presupuestarias_fecha_inicio"
                      onChange={this.props.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem md={12}>
                    <TextField
                      id="date"
                      label="Fecha Final:"
                      type="date"
                      fullWidth
                      defaultValue={this.props.partidas_presupuestarias_fecha_fin}
                      name="partidas_presupuestarias_fecha_fin"
                      onChange={this.props.onChange}
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
          <GridItem xs={12} sm={12} md={6}>
            {/* <Card>
              <CardHeader>
                <h6>Asignaciones</h6>
              </CardHeader>
              <CardBody> */}
            <FormControlLabel
              control={
                <Checkbox
                  name="partidas_presupuestarias_status"
                  checked={this.props.partidas_presupuestarias_status}
                  onChange={this.props.onHandleChange}
                  classes={{
                    root: classes.root,
                    checked: classes.checked
                  }}
                />
              }
              label="Activo"
            />
            {/* </CardBody>
            </Card> */}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Budget);
