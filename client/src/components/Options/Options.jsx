import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//material-dashboard components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

// @material-ui/icons
import Save from "@material-ui/icons/Save";


const styles = theme => ({
  root: {
    width: "100%"
  },
});

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={1}>
            <Card>
              <CardBody> */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Tooltip
                      id="tooltip-top"
                      title="Guardar"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton aria-label="Save" onClick={this.props.onSubmit}>
                        <Save className={classes.save} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={4}>
                    <Tooltip
                      id="tooltip-top"
                      title="Cancelar Registro"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Cancel"
                        onClick={this.props.cancelCourse}
                      >
                        <Cancel className={classes.cancel} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Tooltip
                      id="tooltip-top"
                      title="Ver Plan"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Ver Plan"
                        onClick={this.props.handleClickOpen}
                      >
                        <List />
                      </IconButton>
                    </Tooltip>
                  </GridItem> */}
                </GridContainer>
              {/* </CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }
}

export default withStyles(styles)(Options);
