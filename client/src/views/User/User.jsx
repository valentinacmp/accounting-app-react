import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

// import { ValidatorForm } from 'react-material-ui-form-validator';
//Components
// import Users from "components/Users/Users";

import axios from "axios";
// import { baseUrl } from "variables/general";
import { confirmAlert } from 'react-confirm-alert'; // Import
import UserDialog from "../../components/Dialogs/UserDialog/UserDialog";
import LinearProgress from '@material-ui/core/LinearProgress';
import { userAcc, updateUserAcc, deleteUserAcc, createUserAcc } from "../../services/user/useracc";


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  tableRow: {
    textTransform: "uppercase",
    textAlignLast: "center"
  },
  tableHead: {
    textAlignLast: "center"
  },
});

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      users: [],
      open: false,
      value: "",
      usuario_nombre: "",
      usuarios_accesos: "",
      usuario_acceso_empresa: [],
      usuario_des: "",
      usuario_clave: "",
      usuario_ubicacion: "",
      usuario_expiration_date: "",
      usuario_status: "",
      usuario_email: "",
      checked: [],
      selected: "",
      nuevo_usuarios_accesos: [],
      nuevo_usuario_acceso_empresa: [],
      companies: [],
      disabled: true,
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

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    axios.defaults.withCredentials = false;
    const user = JSON.parse(localStorage.getItem("userToken"));
    const users = [];

    const data = {
      userId: user.userId,
      databases: ''
    }

    for (let index = 1; index < 6; index++) {
      data.databases = 'empresa' + data.userId + '_' + index
      userAcc(data).then(result => {

        result.forEach(i => {
          users.push({ user: i });
        });
        // console.log(users)
        const filtered = users.reduce((acc, current) => {
          const x = acc.find(item => item.user.usuario_nombre === current.user.usuario_nombre);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        // console.log('REMOVED REPEATED VALUES', filtered);

        this.setState({
          users: filtered,
          array: users
        })

      }).catch(error => {
        console.log(error);
      })
    }


    for (var i = 0; i < this.state.arr.length; i++) {
      const sum = i + 1;
      const name = "checked_" + sum;
      this.setState({ [name]: false });
    }

  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleClick = () => {
    this.setState({ open: true });

    console.log(this.state.usuarios_accesos)
  };

  handleClose = value => {
    this.setState({ value, open: false });
    // window.location.reload();
  };

  convertDate = (date) => {
    // eslint-disable-next-line
    var date = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/);
    if (date === null) {
      return false;
    } else {
      const dateObj = {
        dateFormat1: date[3] + '.' + date[2] + '.' + date[1],
        dateFormat2: date[1] + '-' + date[2] + '-' + date[3],
        dateFormat3: date[2] + '/' + date[3] + '/' + date[1],
        time: date[4] + ':' + date[5] + ':' + date[6],
      };
      return dateObj;
    }
  };

  handleClickOpen = data => {

    console.log(this.state);
    console.log(data.user.usuario_acceso_empresa);

    const filter = this.state.array.filter(item => item.user.usuario_nombre === data.user.usuario_nombre);
    const usuario_acceso_empresa = [];

    console.log(filter);

    for (let index = 0; index < filter.length; index++) {
      const database = filter[index].user.usuario_acceso_empresa;
      usuario_acceso_empresa.push(database);
      console.log(usuario_acceso_empresa);
    }

    const usuario_expiration_date = this.convertDate(data.user.usuario_expiration_date).dateFormat2;

    this.setState({
      open: true,
      usuario_nombre: data.user.usuario_nombre,
      usuario_des: data.user.usuario_des,
      usuario_clave: data.user.usuario_clave,
      usuario_ubicacion: data.user.usuario_ubicacion,
      usuario_expiration_date: usuario_expiration_date,
      usuario_status: data.user.usuario_status,
      usuario_email: data.user.usuario_email,
      selected: data.user.usuario_nombre,
      usuarios_accesos: data.user.usuarios_accesos,
      usuario_acceso_empresa: usuario_acceso_empresa
    });

  };

  deleteItem(selected) {
    // const filter = this.state.users.filter(item => item.user.usuario_nombre === data.user.usuario_nombre);
    const filter = this.state.array.filter(item => item.user.usuario_nombre === selected.user.usuario_nombre);

    console.log(filter);

    confirmAlert({
      title: 'Confirmar',
      message: 'El usuario seleccionado será eliminado. Confirme su selección',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            const newState = this.state.users.slice();
            console.log(newState);

            if (newState.indexOf(selected) > -1) {
              newState.splice(newState.indexOf(selected), 1);
              this.setState({ users: newState });
            }

            const data = {
              databases: '',
              usuario_nombre: ''
            }

            for (let index = 0; index < filter.length; index++) {
              data.databases = filter[index].user.usuario_acceso_empresa;
              data.usuario_nombre = filter[index].user.usuario_nombre;

              console.log(data);

              deleteUserAcc(data).then(result =>{
                console.log(result);
              }).catch(error =>{
                console.log(error);
              })
            }
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Click No')
        }
      ]
    });
  }

  welcome() { }

  onSubmit = (e) => {

    const filter = this.state.array.filter(item => item.user.usuario_nombre === this.state.selected);

    e.preventDefault();

    const data = {
      user_id: '',
      databases: '',
      usuario_nombre: this.state.usuario_nombre,
      usuario_des: this.state.usuario_des,
      usuario_clave: this.state.usuario_clave,
      usuario_ubicacion: this.state.usuario_ubicacion,
      usuario_expiration_date: this.state.usuario_expiration_date,
      usuario_status: this.state.usuario_status,
      usuario_email: this.state.usuario_email,
      usuario_acceso_empresa: this.state.usuario_acceso_empresa,
      usuarios_accesos: this.state.usuarios_accesos
    }

    //Si check.length esta en 0 hacer solo update
    const check_acceso_empresa = this.state.nuevo_usuario_acceso_empresa;
    const check_usuarios_accesos = this.state.nuevo_usuarios_accesos;

    // const update = () =>{
    //   for (let index = 0; index < filter.length; index++) {
    //     data.databases = filter[index].user.usuario_acceso_empresa;
    //     data.user_id = filter[index].user.user_id;
    //     data.usuario_acceso_empresa = filter[index].user.usuario_acceso_empresa;
    //     updateUserAcc(data).then(result => {
    //       console.log(result);
    //       this.setState({ open: false });
    //       window.location.reload();
    //     }).catch(error => {
    //       console.log(error);
    //     });
    //   }
    // }

    if (check_usuarios_accesos.length === 0){
      for (let index = 0; index < filter.length; index++) {
        data.databases = filter[index].user.usuario_acceso_empresa;
        data.user_id = filter[index].user.user_id;
        data.usuario_acceso_empresa = filter[index].user.usuario_acceso_empresa;
        updateUserAcc(data).then(result => {
          console.log(result);
          this.setState({ open: false });
          window.location.reload();
        }).catch(error => {
          console.log(error);
        });
      }
    } 
    
    if (check_acceso_empresa.length === 0){
      for (let index = 0; index < filter.length; index++) {
        data.databases = filter[index].user.usuario_acceso_empresa;
        data.user_id = filter[index].user.user_id;
        data.usuario_acceso_empresa = filter[index].user.usuario_acceso_empresa;
        updateUserAcc(data).then(result => {
          console.log(result);
          this.setState({ open: false });
          window.location.reload();
        }).catch(error => {
          console.log(error);
        });
      }
    }else {
      //filtrar la base de datos para eliminar al usuario
      let db_to_delete = this.state.companies;
      db_to_delete = db_to_delete.filter(item => !this.state.usuario_acceso_empresa.includes(item.database));

      //filtrar la base de datos para agregar al usuario
      let db_to_post = this.state.companies;
      db_to_post = db_to_post.filter(item => this.state.usuario_acceso_empresa.includes(item.database));

      //DELETE
      for (let i = 0; i < db_to_delete.length; i++) {
        data.databases = db_to_delete[i].database;
        // console.log('delete', data.databases);
        deleteUserAcc(data).then(result =>{
          console.log(result);
        }).catch(error =>{
          console.log(error);
        })
      }

      //POST
      for (let n = 0; n < db_to_post.length; n++) {
        data.databases = db_to_post[n].database;
        data.usuario_acceso_empresa = db_to_post[n].database;
        // console.log('post', data.databases);
        createUserAcc(data).then(result =>{
          console.log(result);
        }).catch(error =>{
          console.log(error);
        })
      }

      //UPDATE
      for (let index = 0; index < filter.length; index++) {
        data.databases = filter[index].user.usuario_acceso_empresa;
        data.user_id = filter[index].user.user_id;
        data.usuario_acceso_empresa = filter[index].user.usuario_acceso_empresa;
        // console.log('update',data.databases);
        // console.log(data);
        updateUserAcc(data).then(result =>{
          console.log(result);
          this.setState({ open: false });
          window.location.reload();
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }

  clicked = (data) => {
    console.log(data);
  }

  newStates = (newArr) => {
    if (newArr.sort().join(',').startsWith('empresa') === true) {
      this.setState({
        usuario_acceso_empresa: newArr,
        nuevo_usuario_acceso_empresa: newArr
      })
    } else {
      const accesos = newArr.sort().join(',')
      this.setState({
        usuarios_accesos: accesos,
        nuevo_usuarios_accesos: accesos
      })
    }
  }

  getCompanies = (newArr) => {
    // console.log(newArr);
    this.setState({
      companies: newArr
    });
  }

  render() {
    const { classes } = this.props;

    const users = (
      <div>
        <UserDialog
          open={this.state.open}
          onClose={this.handleClose}
          handleClose={this.handleClose}
          onChange={this.onChange}
          selected={this.state.selected}
          usuario_nombre={this.state.usuario_nombre}
          usuario_des={this.state.usuario_des}
          usuario_clave={this.state.usuario_clave}
          usuario_ubicacion={this.state.usuario_ubicacion}
          usuario_expiration_date={this.state.usuario_expiration_date}
          usuario_status={this.state.usuario_status}
          usuario_email={this.state.usuario_email}
          usuarios_accesos={this.state.usuarios_accesos}
          usuario_acceso_empresa={this.state.usuario_acceso_empresa}
          nuevos_accesos={this.newStates}
          companies={this.getCompanies}
          disabled={this.state.disabled}
          policies={this.state.arr}
          clicked={this.clicked}
          onSubmit={this.onSubmit}
        />
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
              {this.state.users.map((value, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell>
                    <Button
                    >
                      {value.user.usuario_nombre}
                    </Button>
                  </TableCell>
                  <TableCell>{value.user.usuario_des}</TableCell>
                  <TableCell>{value.user.usuario_ubicacion}</TableCell>
                  <TableCell component="th" scope="row">
                    <Tooltip
                      id="tooltip-top"
                      title="Eliminar Usuario"
                      placement="top"
                    >
                      <Button
                        type="submit"
                        onClick={this.deleteItem.bind(this, value)}
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Editar Usuario"
                      placement="top"
                    >
                      <Button
                        type="submit"
                        onClick={this.handleClickOpen.bind(this, value)}
                      >
                        <Edit />
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

    if (this.state.users.length === 0) {
      return (
        <CustomTabs
          headerColor="info"
          tabs={[
            {
              tabName: "Empresas",
              tabContent: (
                <div id="progress">
                  <LinearProgress className={classes.progress} color="primary" />
                </div>
              )
            },
          ]}
        />
      )
    } else {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomTabs
                headerColor="info"
                tabs={[
                  {
                    tabName: "Usuarios",
                    tabContent: (users)
                  },
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}

export default withStyles(styles)(User);
