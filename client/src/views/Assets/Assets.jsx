import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Tooltip from "@material-ui/core/Tooltip";

//material-dashboard components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// @material-ui/icons
import Save from "@material-ui/icons/Save";
import NewFolder from "@material-ui/icons/CreateNewFolder";
import Delete from "@material-ui/icons/Delete";
import Cancel from "@material-ui/icons/Cancel";
import Search from "@material-ui/icons/Search";

//Components
import Rules from "components/ChartOfAccounts/Rules/Rules";
import AssetsGeneralData from "components/Assets/GeneralData/AssetsGeneralData";
import Specifications from "components/Assets/Specifications/Specifications";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#00acc1"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

function Assets(props) {
  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={11}>
          <CustomTabs
            title="Activos"
            headerColor="info"
            tabs={[
              {
                tabName: "Datos Generales",
                tabContent: <AssetsGeneralData />
              },
              {
                tabName: "Especificaciones",
                tabContent: <Specifications />
              },
              {
                tabName: "Clasificación y Cuentas Asociadas",
                tabContent: <Rules />
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
                    <IconButton aria-label="Save">
                      <Save className={classes.save} />
                    </IconButton>
                  </Tooltip>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Tooltip
                    id="tooltip-top"
                    title="Incluir registro"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton aria-label="NewFolder">
                      <NewFolder className={classes.createNewFolder} />
                    </IconButton>
                  </Tooltip>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Tooltip
                    id="tooltip-top"
                    title="Buscar Registro"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton aria-label="Search">
                      <Search className={classes.seacrh} />
                    </IconButton>
                  </Tooltip>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Tooltip
                    id="tooltip-top"
                    title="Borrar registro"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton aria-label="Delete">
                      <Delete className={classes.delete} />
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

export default withStyles(styles)(Assets);
