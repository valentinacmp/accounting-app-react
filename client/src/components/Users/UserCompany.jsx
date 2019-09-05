import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

import { serverUrl } from "variables/general";

const styles = theme => ({
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  }
});

class UserCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + `users`, {
        withCredentials: false
      })
      .then(res => {
        const user = res.data.users;
        this.setState({ user });
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow align="center">
                <TableCell>Nombre</TableCell>
                <TableCell>Perfil</TableCell>
                <TableCell>Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.user.map((row, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {row.usuario}
                  </TableCell>
                  <TableCell align="right">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="right">
                    {row.estatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserCompany);
