import React from "react";
import axios from "axios";

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
import Tooltip from "@material-ui/core/Tooltip";

//Alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { serverUrl } from "variables/general";

const styles = theme => ({
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  }
});

class UserAssigned extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user_username: "",
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + `users/acc`, {
        withCredentials: false
      })
      .then(res => {
        const user = res.data.users;
        // this.setState({ user });
        console.log(user);

        const filtered = user.filter(p => String(p.usuario) !== 'valentina');
        this.setState({ users: filtered });
        console.log(filtered);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItem(row){
    confirmAlert({
      title: 'Confirmar',
      message: 'El usuario seleccionado se eliminara de accounting app. Confirme su selección',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            console.log(row.usuario)

            const newState = this.state.user.slice();
            if (newState.indexOf(row) > -1) {
              newState.splice(newState.indexOf(row), 1);
              this.setState({ user: newState });
            }
            console.log("Usuario eliminado de accounting ->", row.usuario);
            console.log(serverUrl + `users/accUser/` + row.usuario)
            axios
              .get(serverUrl + `users/accUser/` + row.usuario, {
                withCredentials: false
              })
              .then(res => {
                const userId = res.data.result[0].idUser;
                console.log(res.data.result[0].idUser);
                axios.delete(serverUrl+`users/deleteAcc/` + userId)
                  .then(res => {
                    console.log(res.data);
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((row, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {row.usuario}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Tooltip
                      id="tooltip-top"
                      title="Eliminar"
                      placement="top"
                    >
                      <Button
                        type="submit"
                        onClick={this.deleteItem.bind(this, row)}
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
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

export default withStyles(styles)(UserAssigned);
