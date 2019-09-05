import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";

//Components
import NewUser from "components/Users/AllowUser/NewUser";
import DatabasesDialog from "../Dialogs/CompanyDialog/DatabasesDialog";
import Policies from "./AllowUser/Policies";

import axios from "axios";
// import { baseUrl } from "variables/general";
import { createUser, createUserAcc } from "../../services/user/useracc";

const styles = {

};

class UserAcc extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario_nombre: "",
      usuario_des: "",
      usuario_clave: "",
      usuario_expiration_date: "",
      usuario_status: "",
      usuario_email: "",
      usuario_ubicacion: "",
      usuario_acceso_empresa: [],
      value: "",
      crador:"",
      selected: [],
      open: false,
      show: false,
      result: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    axios.defaults.withCredentials = false;
    const user = JSON.parse(localStorage.getItem("userToken"));

    this.setState({ creador: user.userId });
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  
  handleClickListItem = () => {
    this.setState({ open: true });
  };
  
  handleClose = value => {
    this.setState({ value, open: false });
  };

  onSelect = selected => {
    this.setState({ 
      selected, 
      open: true,
      show: true
    });
    console.log(selected);
    // this.showComponent();
    this.allowed()
  };

  allowed(){
    const usuario_acceso_empresa = [];
    const selected = this.state.selected;
    for (let index = 0; index < selected.length; index++) {
      const element = "Permitir acceso a:" + selected[index];
      console.log(element);
      usuario_acceso_empresa.push(element);
      this.setState({usuario_acceso_empresa})
    }
  }

  clicked = sum => () => {
    console.log("Value", sum);
    const result = this.state.result.slice(0);
    const exists = result.includes(sum)

    console.log(exists)

    if (exists === true) {
      const arr = this.state.result;
      var index = arr.indexOf(sum);
      console.log(index);

      if (index > -1) {
        arr.splice(index, 1);
      } 
      console.log(arr);
      this.setState({ result: arr })

    } else {
      result.push(sum);
      console.log(result);
      this.setState({ result: result })
    }
  }

  onSubmit (e) {
    e.preventDefault();

    const selected = this.state.selected;
    const usuarios_accesos = this.state.result.sort().join(',');

    if (usuarios_accesos === ""){
      alert('Politicas!!!')
    } else {
      
      const data = {
        databases: '',
        usuario_nombre: this.state.usuario_nombre,
        usuario_clave: this.state.usuario_clave,
        creador_id: this.state.creador,
        usuario_des: this.state.usuario_des,
        usuario_expiration_date: this.state.usuario_expiration_date,
        usuario_status: this.state.usuario_status,
        usuario_ubicacion: this.state.usuario_ubicacion,
        usuario_email: this.state.usuario_email,
        usuario_acceso_empresa: '',
        usuarios_accesos: usuarios_accesos
      }

      console.log(data);

      createUser(data).then(result => {
        console.log(result);
        for (let i = 0; i < selected.length; i++) {
          data.databases = selected[i];
          data.usuario_acceso_empresa = selected[i];
          console.log(data);
          createUserAcc(data).then(res => {
            console.log(res);
          }).catch(error => {
            console.log(error);
          })
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { show, selected } = this.state;

    
    if(show === false){

      return (
        <div>
          <GridContainer>
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
                      primary="Seleccionar Empresa(s):"
                      // secondary={this.state.value + "op"}
                    />
                    {/* <ListItemText>{this.state.value} hh</ListItemText> */}
                  </ListItem>
                  <DatabasesDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    onSelect={this.onSelect}
                    value={this.state.value}
                  />
                </List>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      return(
        <div>
          <span> 
            Permitir acceso a: {selected.sort().join(', ')}
          </span>
          <GridContainer>
           <GridItem xs={12} sm={12} md={11}>
             <CustomTabs
              headerColor="info"
              tabs={[
                {
                  tabName: "Crear Usuario",
                  tabContent: (
                    <NewUser
                      usuario_nombre={this.state.usuario_nombre}
                      usuario_des={this.state.usuario_des}
                      usuario_clave={this.state.usuario_clave}
                      usuario_ubicacion={this.state.usuario_ubicacion}
                      usuario_expiration_date={this.state.usuario_expiration_date}
                      usuario_status={this.state.usuario_status}
                      usuario_email={this.state.usuario_email}
                      onChange={this.onChange}
                    />
                  )
                },
                {
                  tabName: "Políticas",
                  tabContent: (
                    <Policies 
                      clicked={this.clicked}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Guardar"
                      placement="top"
                      className={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        onClick={this.onSubmit}
                        type="submit"
                      >
                        <Save />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Cancelar Registro"
                      placement="top"
                      className={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Cancel">
                        <Cancel className={classes.cancel} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        </div>
        
      );
    }

      // <div>
      
      // </div>
    // );
  }
}

export default withStyles(styles)(UserAcc);
