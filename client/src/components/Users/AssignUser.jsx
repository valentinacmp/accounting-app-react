import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import cyan from "@material-ui/core/colors/cyan";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Button from "components/CustomButtons/Button.jsx";

import axios from "axios";

import { serverUrl } from "variables/general";

const styles = theme => ({
  textField: {
    margin: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  },
  checkbox: {
    margin: 10
  }
});

class AssignUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(serverUrl + `users/web`, {
        withCredentials: false
      })
      .then(res => {
        const user = res.data.users;
        this.setState({ user: user });
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;
    // const company = this.props.company;

    return (
      <div>
        <GridContainer>
          <GridItem md={12}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Seleccione el usuario al cual desea asignar las 5 bases de datos
                      </InputLabel>
                      <Select
                        value={this.props.user_username}
                        onChange={this.props.onChange}
                        input={
                          <Input
                            name="user_username"
                            id="age-label-placeholder"
                          />
                        }
                        displayEmpty
                        name="user_username"
                        className={classes.selectEmpty}
                      >
                        {this.state.user.map((row, i) => (
                          <MenuItem key={i} value={row.usuario}>
                            <span
                              color="transparent"
                              onClick={() =>
                                this.props.myFunction(
                                  row.usuario
                                )
                              }
                            >
                              {row.usuario}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(AssignUser);
