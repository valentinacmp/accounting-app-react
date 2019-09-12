import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

//material-dashboard components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

//Components
import NewUserCompany from "components/Company/UserCompany/NewUserCompany";
import UsersCompany from "components/Company/UserCompany/UsersCompany";
import { createCompany, createSucursal } from "services/company/usercompany";
import Sucursal from "components/Company/UserCompany/Sucursal";


const styles = () => ({
  root: {
    width: "100%"
  },
});

class UserCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_company: "",
      company_name: "",
      company_rif: "",
      company_days: "",
      company_start_date: "",
      company_end_date: "",
      company_status: true,
      sucursal_status: true,
      sucursal_name: "",
      sucursal: "",
      open: false,
      fullWidth: true,
      maxWidth: "sm",
    };

    this.onChange = this.onChange.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.saveSucursal = this.saveSucursal.bind(this)
    this.myFunction = this.myFunction.bind(this);
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  saveCompany(e) {
    e.preventDefault();

    const register = {
      company_name: this.state.company_name,
      company_rif: this.state.company_rif,
      company_days: this.state.company_days,
      company_start_date: this.state.company_start_date,
      company_end_date: this.state.company_end_date,
      company_status: this.state.company_status,
    }

    console.log(register);

    if (this.state.company_name === "" || this.state.company_rif === "" || this.state.company_days === "") {
      alert("Please fill all the fields");
    } else {
      createCompany(register).then(res => {
        alert('Empresa creada!');
       }).catch(error =>{
        alert('Error', error.response.data);
      })
    }
  }


  saveSucursal(e) {
    e.preventDefault();

    const registerSuc = {
      sucursal_status: this.state.sucursal_status,
      sucursal_name: this.state.sucursal_name,
      sucursal: this.state.sucursal,
      user_company: this.state.user_company
    }

    console.log(registerSuc);

    if (this.state.sucursal_name === "" || this.state.sucursal === "" || this.state.user_company === "") {
      alert("Please fill all the fields");
    } else {
      createSucursal(registerSuc).then(res => {
        alert('Sucursal creada!');
      }).catch(error => {
        if(error.response.data === null){
          alert('Error: Ya existe');
        }else {
          alert('Error', error.response.data);
        }
      })
    }
  }

  myFunction(company_code) {
    this.setState({ user_company: company_code});
  }

  render() {
    // const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title=" "
              headerColor="info"
              tabs={[
                {
                  tabName: 'Empresas',
                  tabContent: (
                    <UsersCompany/>
                  ),
                },
                {
                  tabName: 'Nueva Empresa',
                  tabContent: (
                    <NewUserCompany
                      company_name={this.state.company_name}
                      company_rif={this.state.company_rif}
                      company_days={this.state.company_days}
                      company_start_date={this.state.company_start_date}
                      company_end_date={this.state.company_end_date}
                      company_status={this.state.company_status}
                      handleChange={this.handleChange}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit} 
                      saveCompany={this.saveCompany}
                    />
                  )
                },
                {
                  tabName: "Nueva Sucursal",
                  tabContent: (
                    <Sucursal 
                      saveSucursal={this.saveSucursal}
                      sucursal_status={this.state.sucursal_status}
                      sucursal_name={this.state.sucursal_name}
                      sucursal={this.state.sucursal}
                      onChange={this.onChange}
                      onSubmit={this.onSubmit}
                      handleChange={this.handleChange}
                      user_company={this.state.user_company}
                      myFunction={this.myFunction}
                    />
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

export default withStyles(styles)(UserCompany);

