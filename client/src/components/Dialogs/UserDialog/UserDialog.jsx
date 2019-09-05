import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Policies from "../../Users/AllowUser/Policies";
import NewUser from "components/Users/AllowUser/NewUser";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { companiesTaken, companyData } from "../../../services/company/company";
import axios from "axios";


// import axios from "axios";
// import { baseUrl } from "variables/general";

class UserDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      scroll: "paper",
      fullWidth: true,
      maxWidth: "lg",
      hide: true,
      filtered: [],
      companiesName: [],
      companies: [],
      checkboxes: [],
      usuarios_accesos: props.usuarios_accesos,
      usuario_acceso_empresa: props.usuario_acceso_empresa,
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

  componentWillReceiveProps(nextProps) {
    if ((nextProps.usuarios_accesos !== this.props.usuarios_accesos) && (nextProps.usuario_acceso_empresa !== this.props.usuario_acceso_empresa)) {
      this.setState({
        usuarios_accesos: nextProps.usuarios_accesos,
        usuario_acceso_empresa: nextProps.usuario_acceso_empresa
      });

      for (var i = 0; i < this.state.arr.length; i++) {
        const sum = i + 1;
        const name = "checked_" + sum;
        this.setState({ [name]: false });
      }

      const array = nextProps.usuarios_accesos.split(",");
      array.map(v => {
        return this.setState({ [`checked_${v}`]: true });
      });

      this.setState({
        usuarios_accesos: array,
      });

      const user = JSON.parse(localStorage.getItem("userToken"));
      for (var index = 0; index < this.state.companies.length; index++) {
        const n = index + 1;
        const name = "empresa" + user.userId + "_" + n;
        this.setState({ [name]: false });
      }

      nextProps.usuario_acceso_empresa.map(n => {
        return this.setState({ [`${n}`]: true });
      });

    }
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  onHandleChange = name => e => {
    this.setState({ [name]: e.target.checked });
    console.log("Parameter", name);

    var selected;
    var exists;
    var index;
    var newName;

    if (name.startsWith('empresa')) {

      selected = this.state.usuario_acceso_empresa;
      exists = selected.includes(name);

      // console.log(exists);

      if (exists === true) {
        index = selected.indexOf(name);
        console.log(index);

        if (index > -1) {
          selected.splice(index, 1);
        }
        console.log(selected);
        this.setState({ usuario_acceso_empresa: selected })
        this.props.nuevos_accesos(selected);
        
      } else {
        selected.push(name);
        this.setState({ usuario_acceso_empresa: selected })
        console.log(selected);
        this.props.nuevos_accesos(selected);

      }

    } else {

      selected = this.state.usuarios_accesos;
      newName = name.replace('checked_', '');
      exists = selected.includes(newName);

      // console.log(selected, exists, newName);

      if(exists === false){
        selected.push(newName);
        this.setState({ usuarios_accesos: selected })
        console.log(selected);
        this.props.nuevos_accesos(selected);
      } else {
        index = selected.indexOf(newName);
        console.log(index);

        if (index > -1) {
         selected.splice(index, 1);
        }
        this.setState({ usuarios_accesos: selected })
        console.log(selected);
        this.props.nuevos_accesos(selected);
      }

    }
  };

  componentDidMount() {

    axios.defaults.withCredentials = false;

    const user = JSON.parse(localStorage.getItem("userToken"));
    const newArr = [];

    const data = {
      userId: user.userId,
      databases: '',
      table: 'empresa_aa'
    }

    companiesTaken(data).then(result => {
      for (let index = 0; index < result.length; index++) {
        data.databases = result[index].TABLE_SCHEMA;
        companyData(data).then(data => {
          newArr.push({
            database: result[index].TABLE_SCHEMA,
            name: data.empresa_des,
            companyData: data
          });
          this.setState({ companies: newArr });
          this.props.companies(this.state.companies);
        })
      }
    });

  }

  render() {

    const { ...props } = this.props;

    const user = JSON.parse(localStorage.getItem("userToken"));

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
                  // disabled
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
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          scroll={this.state.scroll}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            <div>{this.props.selected}</div>
          </DialogTitle>
          <DialogContent>
            <CustomTabs
              headerColor="info"
              tabs={[
                {
                  tabName: "Usuario",
                  tabContent: (
                    <NewUser
                      {...props}
                      onChange={this.props.onChange}
                    />
                  )
                },
                {
                  tabName: "Políticas",
                  tabContent: (
                    <div>
                      <List dense >
                        {checkboxList}
                      </List>
                    </div>
                  )
                },
                {
                  tabName: "Accesos",
                  tabContent: (
                    <div>
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
                                  onChange={this.onHandleChange(name)}
                                  checked={this.state[name]}
                                  value={this.state[name]}
                                  color="primary"
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
                  )
                }
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button
              name="close"
              onClick={this.props.handleClose}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              name="update"
              onClick={this.props.onSubmit}
              color="primary"
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserDialog;
