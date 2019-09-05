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
// import Checkbox from '@material-ui/core/Checkbox';
import Delete from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";

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
  },
  button: {
    backgroundColor: 'transparent',
    boxShadow: '0px 0px 0px'
  },
});

class BudgetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: true,
      maxWidth: 'md',
      selected: [],
      // budgets: [],
      newBudgets: props.newBudgets
    };
    // this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
  }

   componentWillReceiveProps(nextProps) {
     if (nextProps.newBudgets !== this.props.newBudgets) {
       this.setState({ newBudgets: nextProps.newBudgets });
    }
  };

  componentDidMount() {
  
  };

  handleSelectAllClick = (event) =>   {
    if (event.target.checked) {
      console.log(event.target.checked, this.state)
      this.setState(state => ({ selected: state.newBudgets.map(n => n.partidas_presupuestarias_id) }));
      return;
    } 
    console.log(event.target.checked,this.state)
    this.setState({ selected: [] });
  };

  handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    // console.log(this.state)
    console.log("checkbox select", id);
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => { 
    this.state.selected.indexOf(id) !== -1
  };

  handleRowClick = (event, data) => {
    console.log("row link", data);
  };

  deleteItem = (event, data) => {
    event.stopPropagation();
    console.log("delete", data);
  }

  handleClickOpen = (event, data) => {
    event.stopPropagation();
    console.log("edit", data);
  }

  render() {

    const { classes } = this.props;
    // const newBudgets = this.props.newBudgets;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
              Partidas Presupuestarias
          </DialogTitle>
          <DialogContent>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                  <TableRow align="center">
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={this.state.selected.length > 0 && this.state.selected.length < this.state.budgets.length}
                        checked={this.state.selected.length === this.state.budgets.length}
                        onChange={this.handleSelectAllClick}
                      />
                    </TableCell> */}
                    <TableCell>Código</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Responsable</TableCell>
                    <TableCell>Activa</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.newBudgets.map((row, i) => {
                    const sum = i + 1;
                    // const isSelected = this.isSelected(row.partidas_presupuestarias_id);
                    let status;

                    if(row.partidas_presupuestarias_status === "1"){
                      status = 'Activa';
                    } else {
                      status = 'Inactiva';
                    }

                    return(
                      <TableRow 
                          key={row.partidas_presupuestarias_id} 
                          // onClick={event => this.handleRowClick(event, row)}
                          className={classes.tableRow}
                          hover
                          // role="checkbox"
                          // aria-checked={isSelected}
                          // tabIndex={-1}
                          // selected={isSelected}
                        >
                        {/* <TableCell className="selectCheckbox" padding="checkbox">
                          <Checkbox
                            onClick={event =>
                              this.handleCheckboxClick(event, row.partidas_presupuestarias_id)
                            }
                            className="selectCheckbox"
                            checked={isSelected}
                          />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none" >
                          00000{sum}
                        </TableCell>
                        <TableCell align="right">
                          {row.partidas_presupuestarias_des}
                        </TableCell>
                        <TableCell align="right">
                          {row.partidas_presupuestarias_responsable}
                        </TableCell>
                        <TableCell align="right">
                          {status}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                            type="submit"
                            // disabled={this.state.delete}
                            onClick={event => this.handleClickOpen(event, row)}
                          >
                            <Edit />
                          </Button>
                          <Button
                            type="submit"
                            // disabled={this.state.put}
                            onClick={event => this.deleteItem(event, row.partidas_presupuestarias_id)}
                          >
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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

BudgetDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BudgetDialog);
