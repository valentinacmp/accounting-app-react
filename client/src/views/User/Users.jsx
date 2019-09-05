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

// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
//import Search from "@material-ui/icons/Search";
//import Button from "components/CustomButtons/Button.jsx";

//Components
import UserCompany from "components/Users/UserCompany";
import NewUserCompany from "components/Users/NewUserCompany";
import { createUser } from "services/user/usercompany";

import axios from "axios";
// import Promise from "promise";
import { serverUrl } from "variables/general";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      company: [],
      user_password: "",
      user_username: "",
      user_company: "",
      user_sucursal: "",
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);  
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const register = {
      user_username: this.state.user_username,
      user_password: this.state.user_password,
      user_company: this.state.user_company,
      user_sucursal: this.state.user_sucursal
    };

    console.log('here', register);

    if (this.state.user_username === "" || this.state.user_password === "" || this.state.user_company === "" || this.state.user_sucursal === "") {
      alert("Please fill all the fields");
    } else {
      createUser(register).then(res => {
        alert('Usuario registrado!')
      }).catch(error => {
        alert('Ya existe el usuario en la base de datos')
        // alert(error.response.data.message)
      })
    }
  }

  handleClick(company_code, company_id, company_name) {
    console.log(` Users Component: RIF -> ${company_code} ID -> ${company_id} NOMBRE -> ${company_name}`);

    this.setState({ user_company: company_code });

    axios
      .get(serverUrl + `userCompany/sucursal/` + company_code, {
        withCredentials: false
      })
      .then(res => {
        const company = res.data.result;
        this.setState({ company });
        console.log(company);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick2(sucursal){
    console.log(` Users Component: Sucursal -> ${sucursal}`);
    this.setState({ user_sucursal: sucursal });
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <CustomTabs
              title=""
              headerColor="info"
              tabs={[
                {
                  tabName: "Usuarios",
                  tabContent: <UserCompany />
                },
                {
                  tabName: "Crear Usuario",
                  tabContent: (
                    <NewUserCompany
                      user_password={this.state.user_password}
                      user_username={this.state.user_username}
                      user_company={this.state.user_company}
                      user_sucursal={this.state.user_sucursal}
                      onChange={this.onChange}
                      myFunction={this.handleClick}
                      myFunction2={this.handleClick2}
                      company={this.state.company}
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
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        onClick={this.onSubmit}
                        aria-label="Guardar"
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
                      classes={{ tooltip: classes.tooltip }}
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
}

export default withStyles(styles)(Users);
