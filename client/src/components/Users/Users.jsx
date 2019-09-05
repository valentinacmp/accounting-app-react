import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import Button from "components/CustomButtons/Button.jsx";
// import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';
// import Delete from "@material-ui/icons/Delete";
// import Edit from "@material-ui/icons/Edit";
// import Tooltip from "@material-ui/core/Tooltip";
// import axios from "axios";
// import { baseUrl } from "variables/general";


const styles = theme => ({
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  },
  fab: {
    margin: theme.spacing(1),
  },
});

class Users extends React.Component {

  constructor(){
    super();
    this.state= {
      user: []
    }
  }


  componentDidMount() {

    // const db = localStorage.getItem("db");
    // const url = baseUrl + "userAcc/" + db.database;

    // console.log(db, url);

    // axios({
    //   method: "GET",
    //   url: `${url}`,
    //   data: null,
    //   headers: { "Content-Type": "application/json" }
    // }).then(res =>{
    //   console.log(res)
    // }).catch(error =>{
    //   console.log(error);
    // })

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
            </TableBody>
          </Table>
        </Paper>
      </dir>
    );
  }
}

export default withStyles(styles)(Users);
