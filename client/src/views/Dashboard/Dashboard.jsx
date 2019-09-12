import React from "react";
import PropTypes from "prop-types";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

//material-dashboard components
import Card from "components/Card/Card.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card
          style={{ width: "30%", margin: '80px 370px', textAlign: 'center' }}
          plain
          color="transparent"
        >
          <img  
            className={classes.cardImgTop}
            data-src="holder.js/100px180/"
            alt="100%x180"
            style={{ display: "block" }}
            src="/static/media/logoh.ca9758a6.png"
            data-holder-rendered="true"
          />{" "}
          <h2 style={{ color: "#757575" }}>
            Hybrid Accounting
          </h2>
        </Card>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
