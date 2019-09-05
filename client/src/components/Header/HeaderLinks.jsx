import React from "react";

// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// core components

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { Link, withRouter } from "react-router-dom";
// import Button from "components/CustomButtons/Button.jsx";

// import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

// const styles = theme => ({
//   root: {
//     display: "flex"
//   },
//   paper: {
//     marginRight: theme.spacing.unit * 2
//   }
// });


class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  logOut(e){
    e.preventDefault();
    // localStorage.removeItem('userToken');
    this.props.history.push("/");
    console.log('removeitem')
  }

  render() {
   // const { classes } = this.props;
    return <div>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <Dropdown isOpen={this.state.dropdownOpen[4]} toggle={() => {
                  this.toggle(4);
                }}>
                <DropdownToggle tag="span" onClick={() => {
                    this.toggle(4);
                  }} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen[4]}>
                  Mantenimiento
                </DropdownToggle>
                <DropdownMenu right style={{ right: "auto" }}>
                  <Link to="company"><DropdownItem>Selección de Empresas</DropdownItem></Link>
                  <DropdownItem divider />
                   <Link to="newCompany"><DropdownItem>Empresas</DropdownItem></Link>
                  <DropdownItem>Plan de Cuentas</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>NIFF para las PYMES/NIC</DropdownItem>
                  <DropdownItem>Plan de Cuentas VEN-NIF PYMES</DropdownItem>
                  <DropdownItem>Notas revelatorias</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Centros de costos</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Dropdown isOpen={this.state.dropdownOpen[3]} toggle={() => {
                  this.toggle(3);
                }}>
                <DropdownToggle tag="span" onClick={() => {
                    this.toggle(3);
                  }} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen[3]}>
                  Transacciones
                </DropdownToggle>
                <DropdownMenu right style={{ right: "auto" }}>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <Dropdown isOpen={this.state.dropdownOpen[2]} toggle={() => {
                  this.toggle(2);
                }}>
                <DropdownToggle tag="span" onClick={() => {
                    this.toggle(2);
                  }} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen[2]}>
                  Informes
                </DropdownToggle>
                <DropdownMenu right style={{ right: "auto" }}>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Dropdown isOpen={this.state.dropdownOpen[1]} toggle={() => {
                  this.toggle(1);
                }}>
                <DropdownToggle tag="span" onClick={() => {
                    this.toggle(1);
                  }} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen[1]}>
                  Sistema
                </DropdownToggle>
                <DropdownMenu right style={{ right: "auto" }}>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </GridItem>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            {/* <Button onClick={this.props.logOut}>Cerrar Sesión</Button> */}
          </GridItem>
          </GridContainer>
        </div>
      </div>;
  }
}

export default withRouter(HeaderLinks);
