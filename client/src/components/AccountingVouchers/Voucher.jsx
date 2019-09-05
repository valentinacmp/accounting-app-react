import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "components/CustomButtons/Button.jsx";


const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  FormControl: {
    minWidth: "100%"
  },
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  },
  grid: {
    textAlign: 'right'
  },
  textField: {
    position: 'relative',
  },
  cardTable:{
    position: 'relative',
    top: '-50px'
  },
};


class Voucher extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rows: [{}],
      currentKey: ""
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };

  handleAddRow = () => {
    const item = {
      cuenta: "",
      des: "",
      referencia: "",
      debe: "",
      haber:""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };

  // handleRemoveSpecificRow = (idx) => () => {
  //   const rows = [...this.state.rows]
  //   rows.splice(idx, 1)
  //   this.setState({ rows })
  // }

  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    var idx = this.state.rows.indexOf(rows);
    rows.splice(idx, 1);
    this.setState({ rows: rows })
  }

//   removeItem(index) {
//     this.setState({
//       rows: this.state.rows.filter((x, i) => i != index)
//   });
// }

//   removeItem(idx) {
//     const rows = this.state.data.filter(i => i.id !== idx.id)
//     this.setState({ rows })
//   }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    this.setState({ currentKey: e.keyCode });
    if (e.keyCode === 113) {
      alert('Pressed F2, Deleted last item');
      this.handleRemoveRow()
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.FormControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Tipo
                      </InputLabel>
                      <Select
                        input={
                          <Input
                            name="comp_coa_separator"
                            id="age-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="comp_coa_separator"
                      >
                        <MenuItem value="">
                          <em>Seleccione una opción</em>
                        </MenuItem>
                        <MenuItem value=".">.</MenuItem>
                        <MenuItem value="-">-</MenuItem>
                        <MenuItem value="/">/</MenuItem>
                        <MenuItem value="_">_</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="date"
                      label="Fecha:"
                      type="date"
                      fullWidth
                      margin="dense"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="standard-full-width"
                      label="Número"
                      fullWidth
                      margin="dense"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} />
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-full-width"
                      label="Descripción"
                      fullWidth
                      margin="dense"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <h6>Total Debe</h6>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <h6>Total Haber</h6>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <h6>Saldo</h6>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign: 'right'}}>
                        <h6>0,00</h6>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign: 'right'}}>
                        <h6>0,00</h6>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} >
                        <hr />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} style={{textAlign: 'right'}}>
                        <h6>0,00</h6>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.cardTable}>
              <CardBody>
                <Paper className={classes.root}>
                  <Table className={classes.table} padding="none">
                    <TableHead className={classes.tableHead}>
                      <TableRow align="center">
                        <TableCell>Cuenta</TableCell>
                        <TableCell>Descripción movimiento</TableCell>
                        <TableCell>Referencia</TableCell>
                        <TableCell>Debe</TableCell>
                        <TableCell>Haber</TableCell>
                        <TableCell> <Button onClick={this.handleAddRow}>
                          +
                          </Button> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {this.state.company.map((row, i) => ( */}
                      {this.state.rows.map((item, idx) => (
                      <TableRow className={classes.tableRow} key={idx}>
                        <TableCell component="th" scope="row">
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue=""
                            margin="normal"
                            name="cuenta"
                            value={this.state.rows[idx].cuenta}
                            onChange={this.handleChange(idx)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue=""
                            margin="normal"
                            name="des"
                            value={this.state.rows[idx].des}
                            onChange={this.handleChange(idx)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue=""
                            margin="normal"
                            name="referencia"
                            value={this.state.rows[idx].referencia}
                            onChange={this.handleChange(idx)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue=""
                            margin="normal"
                            name="debe"
                            value={this.state.rows[idx].debe}
                            onChange={this.handleChange(idx)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            defaultValue=""
                            margin="normal"
                            name="haber"
                            value={this.state.rows[idx].haber}
                            onChange={this.handleChange(idx)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={this.handleAddRow}>
                            +
                          </Button>
                          <Button
                            onClick={this.handleRemoveSpecificRow(idx)}>
                            -
                          </Button>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }
}

Voucher.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Voucher);
