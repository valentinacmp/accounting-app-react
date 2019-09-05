import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  tableHead: {
    textAlignLast: 'center'
  },
  tableRow: {
    textAlignLast: 'center'
  }
});

class ChartDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md',
    plans: []
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  componentDidMount() {
    // axios
    //   .get(`http://localhost:3001/chart_accounts/empresa5_3`)
    //   .then(res => {
    //     const plans = res.data.result;
    //     console.log(plans)
    //     this.setState({ plans });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  deleteItem(id_plan_cuentas, e, i) {
    //alert(id_company);
    const url = `http://localhost:3001/plan_cuentas/` + id_plan_cuentas;

    let plans = [...this.state.plans];
    plans.splice(i, 1);
    this.setState({
      plans: plans
    });

    axios
      .delete(url)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log("Deleted Successful, company: " + res.data);
        alert("Eliminada!");
      })
      .catch(error => {
        console.log("url" + url);
        console.log("Error! Company couldn't be deleted " + error);
      });
  }

  render() {

    const { classes } = this.props;
    const plans = this.props.plans;

    return (
      <React.Fragment>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open max-width dialog
        </Button> */}
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Plan de Cuentas</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Insert text here.
            </DialogContentText> */}
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow align="center">
                    <TableCell>Código</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Movimientos</TableCell>
                    <TableCell>Centros</TableCell>
                    {/* <TableCell>Presupuestos</TableCell>
                    <TableCell>Terceros</TableCell> */}
                    {/* <TableCell>Efectivo</TableCell>
                    <TableCell>Activas</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans.map((row, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell component="th" scope="row">
                        <Button
                          name="id_company"
                          onChange={this.handleChange}
                          
                        >
                          {row.plan_de_cuentas_cod}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button >{row.plan_de_cuentas_des}</Button>
                      </TableCell>
                      <TableCell align="right">
                        
                      </TableCell>
                      <TableCell align="right">

                      </TableCell>
                      {/* <TableCell align="right">

                      </TableCell>
                      <TableCell align="right">

                      </TableCell> */}
                      {/* <TableCell align="right">

                      </TableCell>
                      <TableCell align="right">
                        
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ChartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartDialog);
