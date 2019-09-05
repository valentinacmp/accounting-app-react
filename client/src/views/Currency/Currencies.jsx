import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//material-dashboard components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader";
// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import List from "@material-ui/icons/List";

import axios from "axios";
import Currency from "../../components/Currency/Currency.jsx";
import CurrencyDialog from "../../components/Dialogs/CurrencyDialog/CurrencyDialog.jsx";
import { getCurencies, createCurrency } from "../../services/currency/currency.js";

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
  }
});

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monedas: [],
      database: "",
      monedas_des: "",
      monedas_simbolo: "",
      monedas_factor: "",
      monedas_status: true,
      open: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    axios.defaults.withCredentials = false;
    const db = localStorage.getItem("db");

    this.setState({
      database: db
    })

    const data = {
      databases: db
    }

    getCurencies(data).then(result =>{
      console.log(result);
      this.setState({
        monedas: result
      })
    }).catch(error => {
      console.log(error);
    })

    console.log(data);
  }

  relaoad = () => {
    window.location.reload();
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onHandleChange = name => e => {
    this.setState({ [name]: e.target.checked });
    console.log(name);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit(e){
    e.preventDefault();

    const data = {
      databases: this.state.database,
      monedas_des: this.state.monedas_des,
      monedas_simbolo: this.state.monedas_simbolo,
      monedas_factor: this.state.monedas_factor,
      monedas_status: this.state.monedas_status
    }

    console.log(data);

    createCurrency(data).then(result =>{
      console.log(result);
    }).catch(error =>{
        alert(error.message);
    })

  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <CurrencyDialog
          open={this.state.open}
          handleClose={this.handleClose}
          monedas={this.state.monedas}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitle}>Monedas</h4>
              </CardHeader>
              <CardBody>
                <Currency
                  monedas_des={this.state.monedas_des}
                  monedas_simbolo={this.state.monedas_simbolo}
                  monedas_factor={this.state.monedas_factor}
                  onChange={this.onChange}
                  onHandleChange={this.onHandleChange("monedas_status")}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Guardar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton 
                        aria-label="Save"
                        onClick={this.onSubmit}
                        >
                        <Save className={classes.save} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Cancelar Registro"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Cancel"
                        onClick={this.cancelCourse}
                      >
                        <Cancel className={classes.cancel} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Ver Centro de Costos"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Ver Centro de Costos"
                        onClick={this.handleClickOpen}
                      >
                        <List />
                      </IconButton>
                    </Tooltip>
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

export default withStyles(styles)(Currencies);
