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

//Components
import { assignUser } from "services/user/usercompany";

// import axios from "axios";
// import Promise from "promise";
import UserAssigned from "components/Users/UserAssigned";
import AssignUser from "components/Users/AssignUser";

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

class Assign extends React.Component {
  constructor() {
    super();
    this.state = {
      user_username: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const assign = {
      user_username: this.state.user_username,
    };

    if (this.state.user_username === "" ) {
      alert("Please fill all the fields");
    } else {
      assignUser(assign).then(res => {
        alert('Bases de datos asignadas!');
      }).catch(error => {
        alert('Ya el usuario tiene 5 bases de datos asignadas');
        // alert(error.response.data.message)
      })
    }
  }

  handleClick(user_username) {
    console.log(` Username -> ${user_username}`);
    this.setState({ user_username: user_username });
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
                  tabName: "Usuarios con BD assignadas ",
                  tabContent: <UserAssigned />
                },
                {
                  tabName: "Asginar BD a Usuario",
                  tabContent: (
                    <AssignUser 
                      user_username={this.state.user_username}
                      myFunction={this.handleClick}
                      onChange={this.onChange}
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

export default withStyles(styles)(Assign);
