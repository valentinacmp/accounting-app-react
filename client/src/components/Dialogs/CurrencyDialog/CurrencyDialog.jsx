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

class CurrencyDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullWidth: true,
      maxWidth: 'md'
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };


  render() {

    const { classes } = this.props;
    const monedas = this.props.monedas;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Monedas</DialogTitle>
          <DialogContent>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow align="center">
                    <TableCell>Descripción</TableCell>
                    <TableCell>Simbolo</TableCell>
                    <TableCell>Factor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monedas.map((row, i) => (
                    <TableRow key={i} className={classes.tableRow}>
                      <TableCell component="th" scope="row">
                        <Button
                          name="id_company"
                          onChange={this.handleChange}
                        >
                          {row.monedas_des}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button >{row.monedas_simbolo}</Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button >{row.monedas_factor}</Button>
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

CurrencyDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencyDialog);
