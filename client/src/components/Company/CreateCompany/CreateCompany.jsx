import React from "react";
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// core components
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Tooltip from "@material-ui/core/Tooltip";

// // @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";

//components
import GeneralData from "components/Company/GeneralData/GeneralData";
import AccountConfig from "components/Company/AccountConfig/AccountConfig";
import Accounts from "components/Company/Accounts/Accounts";
import CompanyData from "components/CompanyData/CompanyData";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

//services

import {
  createCompany,
  dropTable,
  createTable
} from "services/company/company";

import axios from "axios";
import { serverUrl } from "variables/general";

class CreateCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      empresa_des: "",
      empresa_direccion: "",
      empresa_email: "",
      empresa_website: "",
      empresa_contacto: "",
      empresa_rif: "",
      empresa_ciudad: "",
      empresa_telefono: "",
      empresa_telefax: "",
      empresa_status: true,
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
      empresa_fecha_mov: false,
      empresa_correlativo: false,
      empresa_centros_costos: false,
      empresa_num_lineas: false,
      formato: "",
      formato_cc: "",
      mascara: "",
      db_name: "",
      database: "",
      data: "",
      table: "empresa_aa",
      table2: "no_taken",
      table3: "taken",
      company: [],
      db: [],
      buttonDisabled: false,
      disabled: false,
      open: false,
      show: false,
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  relaoad = () => {
    window.location.reload();
  };

  cancelCourse = e => {
    this.relaoad();
  };

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onHandleChange = name => e => {
    this.setState({ [name]: e.target.checked });
    console.log("Parameter", name);
  };

  numberValidator = e => {

    const name = e.target.name;
    console.log(name)
    
    var arr, actualState, separator;

    if (name === 'formato'){ 
      arr = actualState = this.state.formato;
      separator = this.state.empresa_separador_pc;
      console.log('pc', arr, actualState, separator);
    } else {
      arr = actualState = this.state.formato_cc;
      separator = this.state.empresa_separador_cc;
      console.log('cc', arr, actualState, separator);
    }

    if (arr.includes('.') || arr.includes('/') || arr.includes('-') || arr.includes('_')) {
      const replace = actualState.replace(/[.|_|-]/g, separator);
      console.log(replace);
      if (name === 'formato'){
        this.setState({ formato: replace });
      } else {
        this.setState({ formato_cc: replace });
      }
    } else {
      console.log('false');
    }

    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (!(key === 105 || key === 8 || key === 110 || key === 109 || key === 55 || key === 189 || key === 190 || key === 57 || key === 37 || key === 39)) {
        e.preventDefault();
        if (name === 'formato') {
          this.setState({ formato: actualState + 9 });
        } else {
          this.setState({ formato_cc: actualState + 9 });
        }
        
      }
    }

    if (e.ctrlKey === true && (e.which === 118 || e.which === 86 || e.keyCode === 93)) {
      alert("NOT!");
      e.preventDefault();
    }

    window.oncontextmenu = function () {
      return false;
    };

  };

  onSubmit(e) {
    e.preventDefault();

    const code_pc = this.state.formato.endsWith(this.state.empresa_separador_pc);
    console.log("endswith", code_pc);

    const code_cc = this.state.formato_cc.endsWith(this.state.empresa_separador_cc);
    console.log("endswith", code_cc);

    if (code_pc === false || code_cc === false) {
      const formato = this.state.formato.concat(this.state.empresa_separador_pc)
      this.setState({ formato: formato });

      const formato_cc = this.state.formato_cc.concat(this.state.empresa_separador_cc)
      this.setState({ formato_cc: formato_cc });

      const newCompany = {
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
        empresa_mascara_pc: formato,
        empresa_simbolo: this.state.empresa_simbolo,
        empresa_separador_cc: this.state.empresa_separador_cc,
        empresa_mascara_cc: formato_cc,
        empresa_fecha_mov: this.state.empresa_fecha_mov,
        empresa_correlativo: this.state.empresa_correlativo,
        empresa_centros_costos: this.state.empresa_centros_costos,
        empresa_num_lineas: this.state.empresa_num_lineas,
        database: this.state.value,
        table: this.state.table
      };

      createCompany(newCompany).then(res => {
        alert(res.data.message);
        this.dropTable();
        this.createTable();
      }).catch(error => {
        console.log(error);
      });
    }
  }

  dropTable() {
    const no_taken = {
      database: this.state.value,
      table2: this.state.table2
    };
    dropTable(no_taken).then(res => {
      console.log('👉 Returned data:', res);
    }).catch(e =>{
      console.log(`😱 Axios request failed: ${e}`);
    });
  }

  createTable() {
    const taken = {
      database: this.state.value,
      table3: this.state.table3
    };
    createTable(taken).then(res => {
      console.log('👉 Returned data:', res);
    }).catch(e => {
      console.log(`😱 Axios request failed: ${e}`);
    });
  }

  showComponent = () => {
    this.setState({ show: true });
  };

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  onSelect = value => {
    this.setState({ value, open: true });
    console.log(value);
    this.showComponent();
  };

  componentDidMount() {
    axios
      .get(serverUrl + `companies/databases`, {
        withCredentials: false
      })
      .then(res => {
        const db = res.data.databases;
        this.setState({ db });
      })
      .catch(error => {
        console.log(error);
      });

      console.log('here')

    axios.defaults.withCredentials = false;

  }

  render() {
    const { show } = this.state;
    var hide = this.props.hide;

    const createComp = (
      <GridItem xs={12} sm={12} md={11}>
        <CustomTabs
          title="Empresas"
          headerColor="info"
          tabs={[
            {
              tabName: "Datos Generales",
              tabContent: (
                <div>
                  <CompanyData
                    empresa_des={this.state.empresa_des}
                    db_name={this.state.db_name}
                    onChange={this.onChange}
                  />
                  <GeneralData
                    empresa_direccion={this.state.empresa_direccion}
                    empresa_email={this.state.empresa_email}
                    empresa_website={this.state.empresa_website}
                    empresa_rif={this.state.empresa_rif}
                    empresa_ciudad={this.state.empresa_ciudad}
                    empresa_telefono={this.state.empresa_telefono}
                    empresa_telefax={this.state.empresa_telefax}
                    empresa_status={this.state.empresa_status}
                    empresa_contacto={this.state.empresa_contacto}
                    onHandleChange={this.onHandleChange("empresa_status")}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                  />
                </div>
              )
            },
            {
              tabName: "Configuración de cuentas (Comprobantes y Otros)",
              tabContent: (
                <div>
                  <CompanyData
                    empresa_des={this.state.empresa_des}
                    onChange={this.state.onChange}
                    onSubmit={this.state.onSubmit}
                  />
                  <AccountConfig
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
                    mascara={this.state.formato}
                    disabled1={this.state.disabled}
                    numberValidator={this.numberValidator}
                    onHandleChange0={this.onHandleChange("empresa_fecha_mov")}
                    onHandleChange2={this.onHandleChange("empresa_correlativo")}
                    onHandleChange1={this.onHandleChange("empresa_centros_costos")}
                    onHandleChange3={this.onHandleChange("empresa_num_lineas")}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                  />
                </div>
              )
            },
            {
              tabName: "Cuentas",
              tabContent: (
                <div>
                  <CompanyData
                    empresa_des={this.state.empresa_des}
                    onChange={this.onChange}
                  />
                  <Accounts />
                </div>
              )
            }
            // {
            //   tabName: "Ajuste x Inflación",
            //   tabContent: (
            //     <div>
            //       <CompanyData code={this.state.code} />
            //       <AdjustmentXInflation />
            //     </div>
            //   )
            // }
          ]}
        />
      </GridItem>
    );

    const sideMenu = (
      <GridItem xs={12} sm={12} md={1}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Tooltip id="tooltip-top" title="Guardar" placement="top">
              <Button type="submit" onClick={this.onSubmit}>
                <Save />
              </Button>
            </Tooltip>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Tooltip id="tooltip-top" title="Cancelar Registro" placement="top">
              <Button onClick={this.cancelCourse} type="submit">
                <Cancel />
              </Button>
            </Tooltip>
          </GridItem>
        </GridContainer>
      </GridItem>
    );

    if (hide === false) {
      return (
        <div>
          <GridContainer>
            {show && (
              <GridItem xs={12} sm={12} md={12}>
                <span>Base de datos seleccionada: {this.state.value}</span>
              </GridItem>
            )}
            {!show && (
              <GridItem xs={12} sm={12} md={12}>
                <div>
                  <List>
                    <ListItem
                      button
                      divider
                      aria-haspopup="true"
                      aria-controls="ringtone-menu"

                      onClick={this.handleClickListItem}
                    >
                      <ListItemText
                        primary="Seleccionar una Base de Datos:"
                        secondary={this.state.value}
                      />
                      <ListItemText>{this.state.value}</ListItemText>
                    </ListItem>
                    <SimpleDialogWrapped
                      open={this.state.open}
                      onClose={this.handleClose}
                      onSelect={this.onSelect}
                      value={this.state.value}
                    />
                  </List>
                </div>
              </GridItem>
            )}
            {show && createComp}
            {show && sideMenu}
          </GridContainer>
        </div>
      );
    } else {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomTabs
                title="Empresas"
                headerColor="info"
                tabs={[
                  {
                    tabName: "Datos Generales",
                    tabContent: (
                      <div>
                        <CompanyData
                          empresa_des={this.props.empresa_des}
                          db_name={this.state.db_name}
                          onChange={this.props.onChange}
                        />
                        <GeneralData
                          empresa_direccion={this.props.empresa_direccion}
                          empresa_email={this.props.empresa_email}
                          empresa_website={this.props.empresa_website}
                          empresa_rif={this.props.empresa_rif}
                          empresa_ciudad={this.props.empresa_ciudad}
                          empresa_telefono={this.props.empresa_telefono}
                          empresa_telefax={this.props.empresa_telefax}
                          empresa_status={this.props.empresa_status}
                          empresa_contacto={this.props.empresa_contacto}
                          onHandleChange={this.props.onHandleChange}
                          onChange={this.props.onChange}
                          onSubmit={this.props.onSubmit}
                        />
                      </div>
                    )
                  },
                  {
                    tabName: "Configuración de cuentas (Comprobantes y Otros)",
                    tabContent: (
                      <div>
                        <CompanyData
                          empresa_des={this.props.empresa_des}
                          onChange={this.props.onChange}
                          onSubmit={this.props.onSubmit}
                        />
                        <AccountConfig
                          empresa_fecha_inicio={this.props.empresa_fecha_inicio}
                          empresa_fecha_fin={this.props.empresa_fecha_fin}
                          empresa_separador_pc={this.props.empresa_separador_pc}
                          empresa_mascara_pc={this.props.empresa_mascara_pc}
                          empresa_simbolo={this.props.empresa_simbolo}
                          empresa_separador_cc={this.props.empresa_separador_cc}
                          empresa_mascara_cc={this.props.empresa_mascara_cc}
                          empresa_fecha_mov={this.props.empresa_fecha_mov}
                          empresa_correlativo={this.props.empresa_correlativo}
                          empresa_centros_costos={this.props.empresa_centros_costos}
                          empresa_num_lineas={this.props.empresa_num_lineas}
                          formato={this.props.formato}
                          formato_cc={this.props.formato_cc}
                          onHandleChange={this.props.onHandleChange}
                          onHandleChange0={this.props.onHandleChange0}
                          onHandleChange1={this.props.onHandleChange1}
                          onHandleChange2={this.props.onHandleChange2}
                          onHandleChange3={this.props.onHandleChange3}
                          numberValidator={this.props.numberValidator}
                          mascara={this.props.formato}
                          disabled={this.props.disabled}
                          onChange={this.props.onChange}
                          onSubmit={this.props.onSubmit}
                        />
                      </div>
                    )
                  },
                  {
                    tabName: "Cuentas",
                    tabContent: (
                      <div>
                        <CompanyData
                          empresa_des={this.props.empresa_des}
                          onChange={this.props.onChange}
                        />
                        <Accounts />
                      </div>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      );
    }
  }
}


export default CreateCompany;


class SimpleDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      db: [],
      filtered: [],
      company: [],
      value: props.value
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onSelect(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userToken"));
    console.log("User", user.userId);

    console.log('here');

    if (user.userType === 3) {

      const creador = localStorage.getItem("userCreator");

      console.log(creador);

      axios
        .get(serverUrl + `companies/databases`, {
          withCredentials: false
        })
        .then(res => {
          const db = res.data.databases;
          this.setState({ db });
          // console.log("Databases", db);
          const filtered = db.filter(p => String(p.TABLE_SCHEMA).startsWith('empresa' + creador + '_'));
          console.log(filtered);
          this.setState({ filtered });
        })
        .catch(error => {
          console.log(error);
        });

    } else {
      axios
        .get(serverUrl + `companies/databases`, {
          withCredentials: false
        })
        .then(res => {
          const db = res.data.databases;
          this.setState({ db });
          // console.log("Databases", db);
          const filtered = db.filter(p => String(p.TABLE_SCHEMA).startsWith('empresa' + user.userId + '_'));
          console.log(filtered);
          this.setState({ filtered });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}

        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Seleccionar una opción:
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}

            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.state.filtered.map(company => (
              <FormControlLabel
                value={company.TABLE_SCHEMA}
                key={company.TABLE_SCHEMA}
                control={<Radio color="primary" />}
                label={company.TABLE_SCHEMA}
              />
            ))}
          </RadioGroup>
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

const SimpleDialogWrapped = SimpleDialog;
