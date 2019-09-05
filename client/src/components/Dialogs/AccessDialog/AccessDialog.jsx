import React from "react";
import PropTypes from "prop-types";

// core components
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Avatar from '@material-ui/core/Avatar';

class SimpleDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
      usuarios_accesos: props.usuarios_accesos,
      checked: [],
      isLoaded: false,
      arr: [
        {
          policies: "Acceso a incluir nuevos registros en la base de datos",
          checkbox: "checked_1"
        },
        {
          policies: "Acceso a modificar registros en la base de datos",
          checkbox: "checked_2"
        },
        {
          policies: "Autorizado a eliminar registros en la base de datos",
          checkbox: "checked_3"
        }
      ]
    };

    this.onHandleChange = this.onHandleChange.bind(this);

  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.usuarios_accesos !== this.props.usuarios_accesos) {
      this.setState({ usuarios_accesos: nextProps.usuarios_accesos });

      setTimeout(function () {
        const usuarios_accesos = this.state.usuarios_accesos;

        console.log(usuarios_accesos);
        const array = usuarios_accesos.split(",");

        array.map(v => {
          return this.setState({ [`checked_${v}`]: true });
        });

      }.bind(this), 300);
    }
  }


  handleCancel = () => {
    this.props.onClose();
    this.setStates();

  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleToggle = name => () => {
    console.log("Parameter", name);
  };

  clicked = sum => () => {
    console.log(this.props.check(sum));
  }

  onHandleChange = name => e => {
    this.setState({ [name]: e.target.checked });
    console.log("Parameter", name);
  };

  setStates(){
    const arr = this.state.arr;

    for (var i = 0; i < arr.length; i++) {

      const sum = i + 1;
      const name = "checked_" + sum;
      this.setState({ [name]: false });

      // if(this.state[name] === true){
      // }
    }
  }

  componentDidMount() {

    this.setStates();
  }

  render() {
    const { usuarios_accesos, policies, classes, value, ...other } = this.props;

    const checkboxList = this.state.arr.map((value, i) => {

      const labelId = `checkbox-list-secondary-label-${i}`;
      const name = value.checkbox;

      return (
        <ListItem key={i} button>
          <ListItemText id={labelId} primary={value.policies} />
          <ListItemSecondaryAction>
            <FormControlLabel
              value="start"
              labelPlacement="start"
              control={
                <Checkbox
                  disabled
                  color="primary"
                  checked={this.state[name]}
                  onChange={this.onHandleChange(name)}
                  value={this.state[name]}
                />
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
    );

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          {this.props.username} tiene acceso a:
          {this.props.usuarios_accesos}
        </DialogTitle>
        <DialogContent>
          <List dense >
            {checkboxList}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
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

const AccessDialog = SimpleDialog;


export default AccessDialog;