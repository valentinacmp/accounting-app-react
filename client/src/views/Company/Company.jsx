import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CreateCompany from "components/Company/CreateCompany/CreateCompany";
import { serverUrl } from "variables/general";

const styles = theme => ({

});

class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: [],
      Database: "",
      open: false,
      show: false,
      hide: false
    };
    this.onChange = this.onChange.bind(this);
  }

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
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  showComponent = () => {
    this.setState({ show: true });
  };

  hideComponent = () => {
    this.setState({ show: false });
  };

  render() {

    return (
      <div>
        <GridContainer>
          <GridItem md={12}><CreateCompany hide={this.state.hide} /></GridItem>
        </GridContainer>
      </div>
    );
  }
}

Company.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Company);
