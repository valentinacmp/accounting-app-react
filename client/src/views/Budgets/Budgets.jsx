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
import Budget from "../../components/Budget/Budget";
import { getBudgets, createBudget, createBudgetCC, getBudgetsCC } from "../../services/budget/budget";
import BudgetDialog from "../../components/Dialogs/BudgetDialog/BudgetDialog";
import BudgetCCDialog from "../../components/Dialogs/BudgetDialog/BudgetCCDialog";

const styles = theme => ({
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

class Budgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      newBudgets: [],
      database: "",
      open: false,
      openCC: false,
      partidas_presupuestarias: [],
      partidas_presupuestarias_cod: "",
      partidas_presupuestarias_des: "",
      partidas_presupuestarias_espec: "",
      partidas_presupuestarias_responsable: "",
      partidas_presupuestarias_partida: "",
      partidas_presupuestarias_cc: 0,
      partidas_presupuestarias_cuentas: 0,
      partidas_presupuestarias_mod: 0,
      partidas_presupuestarias_total: 0,
      partidas_presupuestarias_fecha_inicio: "",
      partidas_presupuestarias_fecha_fin: "",
      partidas_presupuestarias_status: true,
      presupuesto_total: props.presupuesto_total,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendTotal = this.sendTotal.bind(this);
    this.getBudgetCC = this.getBudgetCC.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.presupuesto_total !== this.props.presupuesto_total) {
      this.setState({ presupuesto_total: nextProps.presupuesto_total });
    }
  }


  componentDidMount() {
    axios.defaults.withCredentials = false;
    const db = localStorage.getItem("db");

    this.setState({
      database: db,
    })

    const data = {
      databases: db,
      partidas_presupuestarias_id: ''
    }

    getBudgets(data).then(result =>{
      // console.log(result);
      this.setState({
        budgets: result
      })

      getBudgetsCC(data).then(res => {
        const groupBy = key => array =>
          array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
          }, {});

        const groupById = groupBy('partidas_presupuestarias_id');
        const partidas = result.map(i => {
          return Object.assign(i, {partidas_cc : groupById(res)[i.partidas_presupuestarias_id]});
        }, [])

        // console.log(partidas);
        this.setState({
          newBudgets: partidas
        })

      }).catch(error => console.log(error))
    })

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
    // console.log(name);
  };

  handleClickOpen = () => {
    this.setState({ 
      open: true
     });
  };

  handleClose = () => {
    this.setState({ open: false });
    // console.log(this.state.presupuesto_total);
  };

  handleClickOpenCC = () => {

    if (this.state.partidas_presupuestarias_partida === ""){
      alert('Debe asignar un monto de presupuesto a la partida')
    } else {
      this.setState({
        openCC: true
      });
    }
  };

  handleCloseCC = () => {
    const total = this.state.partidas_presupuestarias_partida;
    
    this.setState({ 
      openCC: false,
      partidas_presupuestarias_total: total
    });

    this.sendTotal();
  };

  onSubmit(e) {
    e.preventDefault();

    if (this.state.partidas_presupuestarias_des === ""){
      alert('Ingrese una descripción');
    } else {

      const data = {
        databases: this.state.database,
        partidas_presupuestarias_cod: this.state.partidas_presupuestarias_cod,
        partidas_presupuestarias_des: this.state.partidas_presupuestarias_des,
        partidas_presupuestarias_espec: this.state.partidas_presupuestarias_espec,
        partidas_presupuestarias_responsable: this.state.partidas_presupuestarias_responsable,
        partidas_presupuestarias_partida: this.state.partidas_presupuestarias_partida,
        partidas_presupuestarias_cc: this.state.partidas_presupuestarias_cc,
        partidas_presupuestarias_cuentas: this.state.partidas_presupuestarias_cuentas,
        partidas_presupuestarias_mod: this.state.partidas_presupuestarias_mod,
        partidas_presupuestarias_total: this.state.partidas_presupuestarias_total,
        partidas_presupuestarias_fecha_inicio: this.state.partidas_presupuestarias_fecha_inicio,
        partidas_presupuestarias_fecha_fin: this.state.partidas_presupuestarias_fecha_fin,
        partidas_presupuestarias_status: this.state.partidas_presupuestarias_status,
      }

      // console.log(data);

      // const budget_cc = this.state.partidas_presupuestarias;


      // console.log(this.state.partidas_presupuestarias)

      createBudget(data).then(result => {
        // console.log(result);

        const budget_cc = this.state.partidas_presupuestarias;

        budget_cc.map(budgets => {
          // console.log(budgets);
          const data_cc = {
            databases: this.state.database,
            partidas_presupuestarias_id: result.insertId,
            partidas_presupuestarias_cc_partida: 0,
            partidas_presupuestarias_cc_total: this.state.partidas_presupuestarias_total,
            partidas_presupuestarias_cc_codigo: budgets.partidas_presupuestarias_cc_codigo,
            partidas_presupuestarias_cc_des: budgets.partidas_presupuestarias_cc,
            partidas_presupuestarias_cc_pres: budgets.partidas_presupuestarias_cc_pres,
            partidas_presupuestarias_cc_asig: budgets.partidas_presupuestarias_cc_asig,
            partidas_presupuestarias_cc_dif: budgets.partidas_presupuestarias_cc_dif
          }

          createBudgetCC(data_cc).then(res => {
            console.log(res);
            // console.log(Object.assign(data, data_cc))
          }).catch(error => {console.log(error)})

          console.log(data)
        })
      }).catch(error => {
        console.log(error);
      })
    }
  }

  numberValidator = e => {
    if (this.state.partidas_presupuestarias_partida.includes(',') && !(this.state.partidas_presupuestarias_partida === "")){
      // console.log('includes')
    } else {
      const partidas = this.state.partidas_presupuestarias_partida.concat(",00");
      this.setState({
        partidas_presupuestarias_partida: partidas
      })
    }
  }

  sendTotal(total){
    // console.log(total);
    if(total !== undefined){
      this.setState({
        partidas_presupuestarias_cc: total.replace('.', ',')
      })
    }
  }

  getBudgetCC(array) {
    // console.log(array);
    this.setState({
      partidas_presupuestarias: array
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <BudgetDialog
          open={this.state.open}
          newBudgets={this.state.newBudgets}
          handleClose={this.handleClose}
        />
        <BudgetCCDialog
          openCC={this.state.openCC}
          handleClose={this.handleCloseCC}
          partidas_presupuestarias_cc_total={this.state.partidas_presupuestarias_partida}
          partidas_presupuestarias={this.getBudgetCC}
          sendTotal={this.sendTotal}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitle}>Partidas Presupuestarias</h4>
              </CardHeader>
              <CardBody>
                <Budget
                  partidas_presupuestarias_cod= {this.state.partidas_presupuestarias_cod}
                  partidas_presupuestarias_des= {this.state.partidas_presupuestarias_des}
                  partidas_presupuestarias_espec= {this.state.partidas_presupuestarias_espec}
                  partidas_presupuestarias_responsable= {this.state.partidas_presupuestarias_responsable}
                  partidas_presupuestarias_partida= {this.state.partidas_presupuestarias_partida}
                  partidas_presupuestarias_cc= {this.state.partidas_presupuestarias_cc}
                  partidas_presupuestarias_cuentas= {this.state.partidas_presupuestarias_cuentas}
                  partidas_presupuestarias_mod= {this.state.partidas_presupuestarias_mod}
                  partidas_presupuestarias_total= {this.state.partidas_presupuestarias_total}
                  partidas_presupuestarias_fecha_inicio= {this.state.partidas_presupuestarias_fecha_inicio}
                  partidas_presupuestarias_fecha_fin= {this.state.partidas_presupuestarias_fecha_fin}
                  partidas_presupuestarias_status= {this.state.partidas_presupuestarias_status}
                  handleClickOpen={this.handleClickOpenCC}
                  numberValidator={this.numberValidator}
                  onChange={this.onChange}
                  onHandleChange={this.onHandleChange('partidas_presupuestarias_status')}
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
                      title="Ver Registros"
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

export default withStyles(styles)(Budgets);
