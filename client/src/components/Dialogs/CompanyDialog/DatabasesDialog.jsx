import React from "react";
import PropTypes from "prop-types";

// core components
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import { companiesTaken, companyData } from "../../../services/company/company";

class SimpleDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      filtered: [],
      company: [],
      value: props.value,
      companiesName: [],
      companies: [],
      checkboxes: [],
      selected: []
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onSelect(this.state.selected);
    console.log(this.state.selected)
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {

    axios.defaults.withCredentials = false;
    const user = JSON.parse(localStorage.getItem("userToken"));
    console.log("User", user.userId);

    const newArr = [];
    const checkboxes = [];

    const data = {
      userId: user.userId,
      databases: '',
      table: 'empresa_aa'
    }

    companiesTaken(data).then(result => {

      for (var index = 0; index < result.length; index++) {
        checkboxes.push(result[index].TABLE_SCHEMA);
        const sum = index + 1;
        const name  = "checked_" + sum;
        this.setState({ [name]: false });
      }
      
      for (let index = 0; index < result.length; index++) {
        data.databases = result[index].TABLE_SCHEMA;
        companyData(data).then(data => {
          newArr.push({
            database: result[index].TABLE_SCHEMA,
            name: data.empresa_des,
            companyData: data
          });
          this.setState({ companies: newArr });
        })
      }
    });

    // setTimeout(function () {
    //   console.log(this.state)
    // }
    // .bind(this),3000);
  }


  handleToggle = name => () => {
    console.log("Parameter", name);
    const selected = this.state.selected.slice(0);
    const exists = selected.includes(name)

    console.log(exists)

    if(exists === true){
      const arr = this.state.selected;
      var index = arr.indexOf(name);
      console.log(index);

      if (index > -1) {
        arr.splice(index, 1);
      }
      console.log(arr);
      
    } else {
      selected.push(name);
      this.setState({ selected })
    }

  };

  render() {
    const { classes, value, ...other } = this.props;
    const user = JSON.parse(localStorage.getItem("userToken"));

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}

        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Permitir acceso a:
        </DialogTitle>
        <DialogContent>
          <List dense >
            {this.state.companies.map((value, i) => {
              const labelId = `checkbox-list-secondary-label-${value.i}`;
              const sum = i + 1;
              const name = 'empresa' + user.userId + '_' + sum;
              return (
                <ListItem key={i} button>
                  <ListItemText id={labelId} primary={value.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={this.handleToggle(name)}
                      checked={this.state[name]}
                      color="primary"
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string
};

const DatabasesDialog = SimpleDialog;


export default DatabasesDialog;