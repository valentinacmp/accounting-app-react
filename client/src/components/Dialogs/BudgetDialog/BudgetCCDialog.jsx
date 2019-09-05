import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import ListAlt from '@material-ui/icons/ListAlt';
import Create from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import BudgetImport from './BudgetImport';
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';

const styles = theme => ({
  tableHead: {
    textAlignLast: 'center'
  },
  tableRow: {
    textAlignLast: 'center'
  },
  text:{
    float: 'right',
    fontWeight: 'bold'
  },
  div: {
    float: 'right'
  },
  p: {
    margin: '10px',
  },
  cardHeader:{
    margin: '0px !important',
    marginTop: '-7px !important'
  },
  cardActions:{
    backgroundColor: '#e3edef',
    borderRadius: '0px',
    boxShadow: '0px 0px 0px'
  },
  button: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 0px'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

class BudgetCCDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: true,
      openImport: false,
      maxWidth: 'md',
      partidas_presupuestarias: [],
      presupuesto_total: "",
      openCC: props.openCC,
      partidas_presupuestarias_cc_total: props.partidas_presupuestarias_cc_total,
      partidas_presupuestarias_cc_monto: "",
      partidas_presupuestarias_cc_codigo: "",
      partidas_presupuestarias_cc: "",
      partidas_presupuestarias_cc_pres: "",
      partidas_presupuestarias_cc_asig: "",
      partidas_presupuestarias_cc_dif: "0"
    }

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

  addItem = (data) => {
    // console.log(data);

    let cc_pres;

    if (data.partidas_presupuestarias_cc_pres.includes(',')) {
      // console.log('includes');
      cc_pres = data.partidas_presupuestarias_cc_pres;
    } else {
      cc_pres = data.partidas_presupuestarias_cc_pres.toString().concat(",00");
    }

    const item = {
      partidas_presupuestarias_cc_codigo: data.partidas_presupuestarias_cc_codigo,
      partidas_presupuestarias_cc: data.partidas_presupuestarias_cc,
      partidas_presupuestarias_cc_pres: cc_pres,
      partidas_presupuestarias_cc_asig: data.partidas_presupuestarias_cc_asig,
      partidas_presupuestarias_cc_dif: data.partidas_presupuestarias_cc_dif
    };

    this.setState({
      partidas_presupuestarias: [...this.state.partidas_presupuestarias, item]
    });

  }

  handleChange = idx => e => {
    const { name, value } = e.target;
    const partidas_presupuestarias = [...this.state.partidas_presupuestarias];
    partidas_presupuestarias[idx] = {
      [name]: value
    };
    this.setState({
      partidas_presupuestarias
    });
  };

  getTotal() {
    let grandTotal = 0;
    // console.log()
    const rowTotals = this.state.partidas_presupuestarias.map(
      row => (parseFloat(row.partidas_presupuestarias_cc_pres.replace('.', '').replace(',', '.'))) || 0
    );
    if (rowTotals.length > 0) {
      grandTotal = rowTotals.reduce((acc, val) => {
        // console.log(acc, val)
        return acc + val;
      });
    }
    // console.log(grandTotal.toFixed(2))
    return grandTotal.toFixed(2);
  }

  sendTotal(){
    // this.props.sendTotal(this.state.presupuesto_total);
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.openCC}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
        <BudgetImport
          handleClose={this.handleClose}
          partidas_presupuestarias_cc_total={this.state.partidas_presupuestarias_cc_total}
          partidas_presupuestarias_cc_monto={this.state.partidas_presupuestarias_cc_monto}
          addItem={this.addItem}
          // onChange={this.onChange}
          // numberValidator={this.numberValidator}
            openImport={this.state.openImport}
        />
          <DialogTitle id="max-width-dialog-title">
            <GridContainer>
              <GridItem sm={4}>
                Centros de Costo
              </GridItem>
              <GridItem sm={2}>
                <Button 
                  variant="contained" 
                  size="small"
                  className={classes.button}
                  onClick={this.handleClickOpen}
                  >
                    Nuevo
                  <CreateNewFolder className={classes.rightIcon} />
                </Button>
              </GridItem>
              <GridItem sm={2}>
                <Button variant="contained" size="small" className={classes.button}>
                  Editar
                  <Create className={classes.rightIcon} />
                </Button>
              </GridItem>
              <GridItem sm={2}>
                <Button 
                  variant="contained" 
                  size="small" 
                  className={classes.button}
                  onClick={this.sendTotal}
                  >
                  Eliminar
                  <DeleteIcon className={classes.rightIcon} />
                </Button>
              </GridItem>
              <GridItem sm={2}>
                <Button variant="contained" size="small" className={classes.button}>
                  Cuentas
                  <ListAlt className={classes.rightIcon} />
                </Button>
              </GridItem>
            </GridContainer>
          </DialogTitle>
          <DialogContent>
            <Card className={classes.cardHeader}>
              <CardBody>
                <div>
                  <span>Partida: <strong>{this.props.partidas_presupuestarias_cc_partida}</strong></span>
                  <div className={classes.div}>
                    <span className={classes.p}>Total:</span>
                    <span className={classes.text}>{this.props.partidas_presupuestarias_cc_total}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow align="center">
                    <TableCell>Código</TableCell>
                    <TableCell>Centros de Costo</TableCell>
                    <TableCell>Presupuesto</TableCell>
                    <TableCell>Asignado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.partidas_presupuestarias.map((item, idx) => (
                    <TableRow key={idx} className={classes.tableRow}>
                      <TableCell component="th" scope="row">
                        <Button> {this.state.partidas_presupuestarias[idx].partidas_presupuestarias_cc_codigo}  </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button>{this.state.partidas_presupuestarias[idx].partidas_presupuestarias_cc}</Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button>{this.state.partidas_presupuestarias[idx].partidas_presupuestarias_cc_pres}</Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button>{this.state.partidas_presupuestarias[idx].partidas_presupuestarias_cc_asig}</Button>
                      </TableCell>
                    </TableRow>
                  ))}  
                </TableBody>
              </Table>
            </Paper>
            <Card className={classes.cardActions}>
              <CardBody>
                <div>
                  <GridContainer>
                    <GridItem sm={3}>
                      {/* <span className={classes.text}>0,00</span> */}
                    </GridItem>
                    <GridItem sm={3}>
                      {/* <span className={classes.text}>0,00</span> */}
                    </GridItem>
                    <GridItem sm={3}>
                      <span className={classes.text}>{this.getTotal()}</span>
                    </GridItem>
                    <GridItem sm={3}>
                      <span className={classes.text}>0,00</span>
                    </GridItem>
                    <GridItem sm={12}>
                      <div className={classes.div}>
                        <GridContainer>
                          <GridItem sm={6}>
                            <span style={{float: 'left'}}>Diferencia:</span>
                          </GridItem>
                          <GridItem sm={6}>
                            <NumberFormat
                              // className={classes.text}
                              // label="Partida Origial"
                              disabled
                              fullWidth
                              margin="normal"
                              value={this.getTotal()}
                              // name="presupuesto_total"
                              // onKeyDown={this.numberValidator}
                              onChange={this.onChange}
                              decimalSeparator="."
                              // thousandSeparator="."
                              customInput={TextField}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        {/* <span className={classes.text} >{this.getTotal()}</span> */}
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
              </CardBody>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                this.props.sendTotal(this.getTotal())
                this.props.partidas_presupuestarias(this.state.partidas_presupuestarias);
                this.props.handleClose()
              }}
              color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

BudgetCCDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BudgetCCDialog);
