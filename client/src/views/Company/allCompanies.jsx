import React from "react";
import PropTypes from "prop-types";
import { createBrowserHistory } from 'history';
import axios from "axios";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

//Components 
import CompanyDialog from "components/Dialogs/CompanyDialog/CompanyDialog";

//Functions
import { dropTable2, createTable2, deleteCompany, updateComp } from "services/company/company";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LinearProgress from '@material-ui/core/LinearProgress';
import { companiesTaken, companyData } from "../../services/company/company";
import { userCreator, userPermissions } from "../../services/user/user";
import { userAcc, deleteAllUsers, deleteUser } from "../../services/user/useracc";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableHead: {
    textAlignLast: "center"
  },
  tableRow: {
    textAlignLast: "center"
  },
  progress: {
    margin: theme.spacing(2),
  },
});

class allCompanies extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      db: [],
      company: [],
      data: [],
      emp: "",
      table3: "empresa_aa",
      table2: "taken",
      table: "no_taken",
      open: false,
      scroll: "paper",
      empresa_des: "",
      empresa_direccion: "",
      empresa_email: "",
      empresa_website: "",
      empresa_contacto: "",
      empresa_rif: "",
      empresa_ciudad: "",
      empresa_telefono: "",
      empresa_telefax: "",
      empresa_status: false,
      empresa_fecha_inicio: "",
      empresa_fecha_fin: "",
      empresa_separador_pc: "",
      empresa_mascara_pc: "",
      empresa_simbolo: "",
      comp_last_date_depreciation: "",
      comp_depreciation_method: "",
      comp_month_depreciation: "",
      empresa_separador_cc: "",
      empresa_mascara_cc: "",
      empresa_fecha_mov: "",
      empresa_correlativo: "",
      empresa_centros_costos: "",
      empresa_num_lineas: "",
      mascara: "",
      formato: "",
      formato_cc: "",
      disabled: false,
      compSelected: false,
      companies: [],
      delete: false,
      put: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.companySelected = this.companySelected.bind(this);
  }

  componentDidMount() {
    
    axios.defaults.withCredentials = false;
    this._isMounted = true;

    const user = JSON.parse(localStorage.getItem("userToken"));
    const decode = this.parseJwt(user.token);
    const newArr = [];
    const users = [];

    const data = {
      userId: user.userId,
      databases: '',
      usuario: decode.usuario,
      table: 'empresa_aa'
    }

    console.log("User", user.userId);
    console.log("UserType", user.userType);

    if(user.userType === 3) {
      this.setState({
        delete: true,
        put: true
      });

      userCreator(data).then(result => {
        const creador = result.idUserCreador;
        for (let index = 1; index < 6; index++) {
          data.databases = 'empresa' + creador + '_' + index;
          userPermissions(data).then(permissions => {

            const accesos = permissions.usuarios_accesos.split(",");
            
            for (let index = 0; index < accesos.length; index++) {
              const element = accesos[index];
              if (element === "1") {
                console.log('post', element);
              } else if (element === "2") {
                console.log('put', element);
                this.setState({ put: false });
              } else if (element === "3") {
                console.log('delete', element);
                this.setState({ delete: false });
              } else {
                console.log('ninguno');
              }
            }

            data.databases = permissions.usuario_acceso_empresa;
            companyData(data).then(data => {
              newArr.push({
                database: permissions.usuario_acceso_empresa,
                name: data.empresa_des,
                companyData: data
              });
              this.setState({ companies: newArr });
            })
          })
        }
      })

    } else {
      companiesTaken(data).then(result => {
        for (let index = 0; index < result.length; index++) {
          data.databases = result[index].TABLE_SCHEMA;
          companyData(data).then(data => {
            newArr.push({
              database: result[index].TABLE_SCHEMA,
              name: data.empresa_des,
              companyData: data
            });
            console.log(newArr);
            this.setState({companies: newArr});
          })
        }
      });

      for (let index = 1; index < 6; index++) {
        data.databases = 'empresa' + data.userId + '_' + index
        userAcc(data).then(result => {
          result.forEach(i => {
            users.push({ user: i });
          });
          this.setState({
            array: users
          })
        }).catch(error => {
          console.log(error);
        })
      }

    }
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  deleteItem(item) {

    confirmAlert({
      title: 'Confirmar',
      message: 'La empresa seleccionada será borrada. Confirme su selección',
      buttons: [
        {
          label: 'Si',
          onClick: () => {
            const newState = this.state.companies.slice();
            console.log(newState)
            if (newState.indexOf(item) > -1) {
              newState.splice(newState.indexOf(item), 1);
              this.setState({ companies: newState });
            }
            console.log("Empresa elimnada ->", item.database);
            //Delete Company
            const table3 = this.state.table3;
            const deleteComp = {
              database: item.database,
              table: table3
            };
            deleteCompany(deleteComp).then(res => {
              alert(res.data.message);
              this.dropTable(item);
              this.createTable(item);
            }).catch(error => {
              console.log(error);
            });
            console.log(deleteComp);

            console.log(this.state.array);

            const data = {
              databases: item.database,
              usuario_nombre: ''
            }

            //USUARIOS EXISTENTES EN OTRAS BASE DE DATOS
            var result = Object.values(this.state.array.reduce((c, v) => {
              let k = v.user.usuario_nombre;
              c[k] = c[k] || [];
              c[k].push(v);
              return c;
            }, {}));

            //ELIMINAR TODOS LOS USUARIOS
            deleteAllUsers(data).then(res => {
              console.log(res);
            }).catch(error => console.log(error));

            //ELIMINAR USUARIOS EN WEBUSUARIO
            const delete_from_emp = result.reduce((c, v) => v.length === 1 ? c.concat(v) : c, []).filter(i => i.user.usuario_acceso_empresa === item.database);

            if (delete_from_emp.length !== 0) {
              console.log('Eliminar en websuario', delete_from_emp);
              for (let index = 0; index < delete_from_emp.length; index++) {
                data.usuario_nombre = delete_from_emp[index].user.usuario_nombre;
                deleteUser(data).then(res => {
                  console.log(res);
                }).catch(error => console.log(error));
              }
            } else {
              console.log('No hay usuarios');
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

  deleteUsers(item){
    const data = {
      databases: item.database
    }
    userAcc(data).then(res => {
      console.log('👉 Returned data:', res);
    }).catch(e => {
      console.log(`😱 Axios request failed: ${e}`);
    });
  }

  dropTable(item) {
    const table2 = this.state.table2;
    const taken = {
      database: item.database,
      table: table2
    };
    dropTable2(taken).then(res => {
      console.log('👉 Returned data:', res);
    }).catch(e => {
      console.log(`😱 Axios request failed: ${e}`);
    });
  }

  createTable(item) {
    const table = this.state.table;
    const no_taken = {
      database: item.database,
      table: table
    };
    createTable2(no_taken).then(res => {
      console.log('👉 Returned data:', res);
    }).catch(e => {
      console.log(`😱 Axios request failed: ${e}`);
    });
  }

  onSubmit(e) {
    this.setState({ open: false });
    e.preventDefault();
    const selected = this.state.emp;

    const updateCompany = {
      empresa_des: this.state.empresa_des,
      empresa_direccion: this.state.empresa_direccion,
      empresa_email: this.state.empresa_email,
      empresa_website: this.state.empresa_website,
      empresa_rif: this.state.empresa_rif,
      empresa_status: this.state.empresa_status,
      empresa_ciudad: this.state.empresa_ciudad,
      empresa_telefono: this.state.empresa_telefono,
      empresa_telefax: this.state.empresa_telefax,
      empresa_contacto: this.state.empresa_contacto,
      empresa_fecha_inicio: this.state.empresa_fecha_inicio,
      empresa_fecha_fin: this.state.empresa_fecha_fin,
      empresa_separador_pc: this.state.empresa_separador_pc,
      empresa_mascara_pc: this.state.formato,
      empresa_simbolo: this.state.empresa_simbolo,
      empresa_separador_cc: this.state.empresa_separador_cc,
      empresa_mascara_cc: this.state.formato_cc,
      empresa_fecha_mov: this.state.empresa_fecha_mov,
      empresa_correlativo: this.state.empresa_correlativo,
      empresa_centros_costos: this.state.empresa_centros_costos,
      empresa_num_lineas: this.state.empresa_num_lineas,
      database: selected,
      table: this.state.table3
    };

    updateComp(updateCompany).then(res => {
      console.log('👉 Returned data:', res);
      window.location.reload();
    }).catch(error => {
      console.log(`Axios request failed: ${error}`);
    })
    console.log(selected);
  }

  handleClickOpen = item => {
    console.log(item);
  
    this.setState({ open: true });
    const newState = this.state.db;

    this.setState({ db: newState });
    this.setState({ emp: item.database });

    const fecha_inicio = this.convertDate(item.companyData.empresa_fecha_inicio).dateFormat2;
    const fecha_fin = this.convertDate(item.companyData.empresa_fecha_fin).dateFormat2;

    const status = Boolean(Number(item.companyData.empresa_status));
      
    this.setState({
      empresa_des: item.companyData.empresa_des,
      empresa_direccion: item.companyData.empresa_direccion,
      empresa_email: item.companyData.empresa_email,
      empresa_website: item.companyData.empresa_website,
      empresa_contacto: item.companyData.empresa_contacto,
      empresa_rif: item.companyData.empresa_rif,
      empresa_ciudad: item.companyData.empresa_ciudad,
      empresa_telefono: item.companyData.empresa_telefono,
      empresa_telefax: item.companyData.empresa_telefax,
      empresa_status: status,
      empresa_fecha_inicio: fecha_inicio,
      empresa_fecha_fin: fecha_fin,
      empresa_separador_pc: item.companyData.empresa_separador_pc,
      formato: item.companyData.empresa_mascara_pc,
      empresa_simbolo: item.companyData.empresa_simbolo,
      empresa_separador_cc: item.companyData.empresa_separador_cc,
      formato_cc: item.companyData.empresa_mascara_cc,
      empresa_fecha_mov: item.companyData.empresa_fecha_mov,
      empresa_correlativo: item.companyData.empresa_correlativo,
      empresa_centros_costos: item.companyData.empresa_centros_costos,
      empresa_num_lineas: item.companyData.empresa_num_lineas,
      disabled: false
    });
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

  companySelected = selected => {

    const data = {
      databases:'',
      table: 'empresa_aa'
    }

    data.databases = selected;

    companyData(data).then(data => {
      this.setState({ compSelected: true });
      localStorage.setItem("selected", true);
      localStorage.setItem("db", selected);
      localStorage.setItem("compSelected", data.empresa_des);
      localStorage.setItem("company", JSON.stringify(data));
      const history = createBrowserHistory();
      history.push({ pathname: '/dashboard' });
      window.location.reload();

    }).catch(error => console.log(error));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onHandleChange = name => e => {
    this.setState({ [name]: e.target.checked });
  };

  numberValidator = e => {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (!((key === 105) || (key === 8) || (key === 110) || (key === 109) || (key === 55) || (key === 189) || (key === 190) || (key === 57) || (key === 37) || (key === 39))) {
        e.preventDefault();
        this.setState({ password: this.state.password + 9 });
      }
    }
    if (e.ctrlKey === true && (e.which === 118 || e.which === 86 || e.keyCode === 93)) {
      alert('NOT!');
      e.preventDefault();
    }
    window.oncontextmenu = function () {
      return false;
    }

  };

  render() {
    const { classes } = this.props;
    const { companies } = this.state;

    if (companies.length === 0) {
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
    )} else {
      return (
        <div>
          <CompanyDialog
            open={this.state.open}
            handleClose={this.handleClose}
            scroll={this.state.scroll}
            empresa_des={this.state.empresa_des}
            empresa_direccion={this.state.empresa_direccion}
            empresa_email={this.state.empresa_email}
            empresa_website={this.state.empresa_website}
            empresa_rif={this.state.empresa_rif}
            empresa_ciudad={this.state.empresa_ciudad}
            empresa_telefono={this.state.empresa_telefono}
            empresa_telefax={this.state.empresa_telefax}
            empresa_status={this.state.empresa_status}
            empresa_contacto={this.state.empresa_contacto}
            empresa_fecha_inicio={this.state.empresa_fecha_inicio}
            empresa_fecha_fin={this.state.empresa_fecha_fin}
            empresa_separador_pc={this.state.empresa_separador_pc}
            empresa_mascara_pc={this.state.empresa_mascara_pc}
            empresa_simbolo={this.state.empresa_simbolo}
            empresa_separador_cc={this.state.empresa_separador_cc}
            empresa_mascara_cc={this.state.empresa_mascara_cc}
            empresa_fecha_mov={this.state.empresa_fecha_mov}
            empresa_correlativo={this.state.empresa_correlativo}
            empresa_centros_costos={this.state.empresa_centros_costos}
            empresa_num_lineas={this.state.empresa_num_lineas}
            formato={this.state.formato}
            formato_cc={this.state.formato_cc}
            onHandleChange={this.onHandleChange("empresa_status")}
            onHandleChange0={this.onHandleChange("empresa_fecha_mov")}
            onHandleChange1={this.onHandleChange("empresa_centros_costos")}
            onHandleChange2={this.onHandleChange("empresa_correlativo")}
            onHandleChange3={this.onHandleChange("empresa_num_lineas")}
            numberValidator={this.numberValidator}
            mascara={this.state.mascara}
            disabled={this.state.disabled}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
          <CustomTabs
            headerColor="info"
            tabs={[
              {
                tabName: "Empresas",
                tabContent: (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead className={classes.tableHead}>
                        <TableRow align="center">
                          <TableCell>Código</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.companies.map((company, i) => (

                            <TableRow key={i} className={classes.tableRow}>
                              <TableCell>EMP{i + 1}</TableCell>
                              <TableCell component="th" scope="row">
                                <Tooltip title={`Seleccionar ${company.name}`} >
                                  <Button
                                    name="id_company"
                                    onClick={this.companySelected.bind(this, company.database)}>
                                    {company.name}
                                  </Button>
                                </Tooltip>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                  <Button
                                    type="submit"
                                    disabled={this.state.delete}
                                    onClick={this.deleteItem.bind(this, company)}
                                  >
                                    <Delete />
                                  </Button>
                                  <Button
                                    type="submit"
                                    disabled={this.state.put}
                                    onClick={this.handleClickOpen.bind(this, company)}
                                  >
                                    <Edit />
                                  </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>
                )
              }
            ]}
          />
        </div>
      );
    }
  }
}

allCompanies.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(allCompanies);
