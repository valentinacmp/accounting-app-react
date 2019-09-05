import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ListAlt from '@material-ui/icons/ListAlt';
import Save from "@material-ui/icons/Save";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import NumberFormat from 'react-number-format';

import CostDialog from '../CostDialog/CostDialog';

import axios from "axios";
import { getCostCenters } from '../../../services/costCenters/costCenters';

const styles = theme => ({
  text: {
    float: 'right',
    fontWeight: 'bold'
  },
  div: {
    float: 'right'
  },
  cardHeader: {
    margin: '0px !important',
    marginTop: '-7px !important'
  },
  button: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 0px',
    float: 'right'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

class BudgetImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: true,
      openImport: false,
      costCenter: [],
      monto_total: [],
      database: "",
      maxWidth: 'md',
      openCC: props.openCC,
      partidas_presupuestarias_cc_total: props.partidas_presupuestarias_cc_total,
      partidas_presupuestarias_monto_total: "",
      partidas_presupuestarias_cc_monto: "",
      partidas_presupuestarias_cc_codigo: "",
      partidas_presupuestarias_cc: "",
      partidas_presupuestarias_cc_pres: 0,
      partidas_presupuestarias_cc_asig: "0,00",
      partidas_presupuestarias_cc_dif: 0
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);

    if (nextProps.partidas_presupuestarias_cc_total !== this.props.partidas_presupuestarias_cc_total) {
      this.setState({
        partidas_presupuestarias_cc_total: nextProps.partidas_presupuestarias_cc_total,
      });
    }
    if (nextProps.openCC !== this.props.openCC) {
      this.setState({
        openCC: nextProps.openCC
      });
    }
  }

  componentDidMount() {
    this.setState({
      partidas_presupuestarias_monto_total: this.state.partidas_presupuestarias_cc_total
    })

    axios.defaults.withCredentials = false;

    const company = localStorage.getItem("company");
    const db = localStorage.getItem("db");
    const jsonComp = JSON.parse(company);

    this.setState({
      formato_cc: jsonComp.empresa_mascara_cc,
      mascara_cc: jsonComp.empresa_separador_cc,
      empresa_separador_cc: jsonComp.empresa_separador_cc,
      database: db
    });

    const data = {
      databases: db
    }

    // console.log(db, jsonComp.empresa_mascara_cc, jsonComp.empresa_separador_cc);

    getCostCenters(data).then(result =>{
      console.log(result);
      this.setState({ costCenter: result });
    }).catch(error => {
      console.log(error);
    });

  }

  handleClickOpen = () => {
    this.setState({ openImport: true });
  };

  handleClose = () => {
    this.setState({ openImport: false });
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  selected = (centros_de_costos_cod, centros_de_costos_des) => {
    // console.log(centros_de_costos_cod, centros_de_costos_des);
    this.setState({
      partidas_presupuestarias_cc_codigo: centros_de_costos_cod,
      partidas_presupuestarias_cc: centros_de_costos_des,
      openImport: false
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const cc_monto = this.state.partidas_presupuestarias_cc_monto;
    const monto_total = this.state.partidas_presupuestarias_monto_total;

    let partidas_presupuestarias_cc_monto;
    let partidas_presupuestarias_monto_total;

    //total / input value 

    // console.log(monto_total, cc_monto);

    partidas_presupuestarias_cc_monto = parseFloat(cc_monto.replace('.', '').replace(',', '.'));
    partidas_presupuestarias_monto_total = parseFloat(monto_total.replace('.', '').replace(',', '.'));


    // console.log(partidas_presupuestarias_monto_total, partidas_presupuestarias_cc_monto);

    if (this.state.partidas_presupuestarias_cc_codigo === "" || this.state.partidas_presupuestarias_cc === "") {
      alert("Debe ingresar un código de Centros de Costo");
    }

    if (partidas_presupuestarias_cc_monto > partidas_presupuestarias_monto_total) {
      alert('El monto ingresado excede el monto disponible de la partida.')
    } else if (this.state.partidas_presupuestarias_cc_codigo === "" || this.state.partidas_presupuestarias_cc === "") {
      alert("Debe ingresar un código de Centros de Costo");
    } else {

      const data = {
        partidas_presupuestarias_cc_codigo: this.state.partidas_presupuestarias_cc_codigo,
        partidas_presupuestarias_cc: this.state.partidas_presupuestarias_cc,
        partidas_presupuestarias_cc_pres: this.state.partidas_presupuestarias_cc_monto,
        partidas_presupuestarias_cc_asig: this.state.partidas_presupuestarias_cc_asig,
        partidas_presupuestarias_cc_dif: this.state.partidas_presupuestarias_cc_monto
      }

      // console.log(partidas_presupuestarias_monto_total, partidas_presupuestarias_cc_monto)

      const res = partidas_presupuestarias_monto_total - partidas_presupuestarias_cc_monto;

      // console.log(res.toFixed(2).replace('.', ','));

      this.setState({
        partidas_presupuestarias_monto_total: res.toFixed(2).toString().replace('.', ',')
      })

      this.props.handleClose();
      this.props.addItem(data);

      this.setState({
        monto_total: [...this.state.monto_total, res.toString()]
      });

      // setTimeout(function () {
      //   console.log(this.state.monto_total)
      // }
      // .bind(this),3000);
    }
  }

  numberValidator = () => {
    if (this.state.partidas_presupuestarias_cc_monto.includes(',')) {
    } else {
      const monto = this.state.partidas_presupuestarias_cc_monto.concat(",00");
      this.setState({
        partidas_presupuestarias_cc_monto: monto
      })
    }
  }

  addTotals = () => {

    const item = {
      partidas_presupuestarias_monto_total: this.state.partidas_presupuestarias_monto_monto_total
    };

    this.setState({
      monto_total: [...this.state.monto_total, item]
    });

  }

  render() {

    const { classes } = this.props;
    // const monedas = this.props.monedas;

    return (
      <React.Fragment>
        <CostDialog
          open={this.state.openImport}
          costCenter={this.state.costCenter}
          selected={this.selected}
          handleClose={this.handleClose}
        />
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.openImport}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <GridContainer>
              <GridItem sm={4}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={this.handleClickOpen}
                >
                  Importar Centros de Costo
                  <ListAlt className={classes.rightIcon} />
                </Button>
              </GridItem>
              <GridItem sm={2}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={this.onSubmit}
                >
                  Guardar
                  <Save className={classes.rightIcon} />
                </Button>
              </GridItem>
              <GridItem sm={6}>
                <span>Total:</span>
                <span className={classes.text} >{this.state.partidas_presupuestarias_cc_total}</span>
                <br />
                <span className={classes.text} >{this.state.partidas_presupuestarias_monto_total}</span>
              </GridItem>
            </GridContainer>
          </DialogTitle>
          <DialogContent>
            <Card className={classes.cardHeader}>
              <CardBody>
                <div>
                  <GridContainer>
                    <GridItem sm={6}>
                      <span>Centros de Costo:</span>
                      <span className={classes.text} >{this.state.partidas_presupuestarias_cc_codigo}</span>
                    </GridItem>
                    <GridItem sm={6}>
                      <span>Descripción:</span>
                      <span className={classes.text} >{this.state.partidas_presupuestarias_cc}</span>
                    </GridItem>
                    <GridItem sm={12}>
                      <NumberFormat
                        className={classes.textField}
                        label="Partida Origial"
                        fullWidth
                        margin="normal"
                        value={this.state.partidas_presupuestarias_cc_monto}
                        name="partidas_presupuestarias_cc_monto"
                        onKeyDown={this.numberValidator}
                        onChange={this.onChange}
                        decimalSeparator=","
                        thousandSeparator="."
                        customInput={TextField}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              </CardBody>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

BudgetImport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BudgetImport);
