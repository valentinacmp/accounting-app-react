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

class UsersCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + `userCompany/`, { 
        withCredentials: false
       }).then(res => {
        const companies = res.data.result;
        this.setState({ companies });
        console.log(companies);
      })
      .catch(error => {
        console.log(error);
      });

    // try {

      // const options = {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   url: serverUrl + "userCompany/"
      // };

      // const response = axios(options);
      // const companies = response;
      // // this.setState({ companies });
      // console.log(companies);
      // console.log('👉 Returned data:', response);

    // } catch (e) {
    //   console.log(`😱 Axios request failed: ${e}`);
    // }

    // axios.defaults.withCredentials = true;
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
                <TableCell>RIF</TableCell>
                <TableCell>Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.companies.map((row, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="right">
                    {row.rif}
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

export default withStyles(styles)(UsersCompany);
