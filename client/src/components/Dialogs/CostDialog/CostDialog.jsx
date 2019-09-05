import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class CostDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: 'md',
    costCenter: []
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


  render() {

    const { classes } = this.props;
    const costCenter = this.props.costCenter;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Centro de Costos</DialogTitle>
          <DialogContent>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow align="center">
                    <TableCell>Código</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Movimientos</TableCell>
                    <TableCell>Centros</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {costCenter.map((row, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell component="th" scope="row">
                        <Button
                          name="id_company"
                          onChange={this.handleChange}

                        >
                          {row.centros_de_costos_cod}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                        onClick={() => { 
                          this.props.selected(row.centros_de_costos_cod,row.centros_de_costos_des, this)
                        }}
                        >
                          {row.centros_de_costos_des}
                        </Button>
                      </TableCell>
                      <TableCell align="right">

                      </TableCell>
                      <TableCell align="right">

                      </TableCell>
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

CostDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CostDialog);
