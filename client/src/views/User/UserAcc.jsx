import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
// import axios from "axios";

const styles = theme => ({
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  }
});

class UserAcc extends React.Component {

  constructor(props){
    super(props);
    this.state= {

    }
  }


  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <dir>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow align="center">
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {this.state.user.map((row, i) => ( */}
                <TableRow  className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    <Button
                      name="user_ide"
                      onChange={this.handleChange}
                      color="transparent"
                    >
                     {/* {row.user_name} */}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button color="transparent">{row.user_des}</Button> */}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button color="transparent">{row.user_role}</Button> */}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      id="tooltip-top"
                      title="Editar"
                      placement="top"
                    >
                      <Button>
                        <Edit />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Eliminar"
                      placement="top"
                    >
                      <Button
                        // justIcon
                        // color="danger"
                        // size="sm"
                        // type="submit"
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </Paper>
      </dir>
    );
  }
}

export default withStyles(styles)(UserAcc);
