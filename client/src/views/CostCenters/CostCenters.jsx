import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//material-dashboard components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader";

// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import List from "@material-ui/icons/List";

//components
import CostCenter from "../../components/CostCenter/CostCenter";
import { createCC } from "../../services/costCenters/costCenters";

import axios from "axios";
import CostDialog from "../../components/Dialogs/CostDialog/CostDialog";

import { serverUrl } from "variables/general";

const styles = theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  cardTitle: {
    marginTop: "0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

class CostCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      costCenter: [],
      formato_cc: "",
      empresa_separador_cc: "",
      database: "",
      centros_de_costos_cod: "",
      centros_de_costos_des: "",
      centros_de_costos_status: true,
      centros_de_costos_movimiento: false,
      centros_de_costos_presupuesto: false,
      answer: false,
      open: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {

    axios.defaults.withCredentials = false;

    const company = localStorage.getItem("company");
    const db = localStorage.getItem("db");
    const jsonComp = JSON.parse(company);

    this.setState({
      formato_cc: jsonComp.empresa_mascara_cc,
      mascara_cc: jsonComp.empresa_separador_cc,
      empresa_separador_cc: jsonComp.empresa_separador_cc,
      database: db
    });

    console.log(db, jsonComp.empresa_mascara_cc, jsonComp.empresa_separador_cc);

    axios
      .get(serverUrl + `cost_center/` + db, {
        withCredentials: false
      })
      .then(res => {
        const costCenter = res.data.result;
        console.log(costCenter);
        this.setState({ costCenter: costCenter });
      })
      .catch(error => {
        console.log(error);
      });
  }

  numberValidator = e => {

    const arr = this.state.centros_de_costos_cod;

    if (arr.includes('.') || arr.includes('/') || arr.includes('-') || arr.includes('_')) {
      const replace = this.state.centros_de_costos_cod.replace(/[.|/|_|-]/g, this.state.empresa_separador_cc);
      console.log(replace)
      this.setState({ centros_de_costos_cod: replace });
    } else {
      console.log('false');
    }

    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (
        !(
          key === 8 ||
          key === 96 ||
          key === 110 ||
          key === 109 ||
          key === 111 ||
          key === 55 ||
          key === 189 ||
          key === 190 ||
          key === 57 ||
          key === 37 ||
          key === 39 ||
          (key >= 97 && key <= 105)
        )
      ) {
        e.preventDefault();
      }
    }

    if (
      (e.ctrlKey === true && (e.which === 118 || e.which === 86)) ||
      e.keyCode === 93
    ) {
      alert("NOT!");
      e.preventDefault();
    }

    window.oncontextmenu = function () {
      return false;
    };
  };

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

  checkFormat(answer) {

    answer = this.state.answer;

    //CHECK IF ENDS WITH --> empresa_separador_cc

    const code = this.state.centros_de_costos_cod.endsWith(
      this.state.empresa_separador_cc
    );
    console.log("endswith", code);

    let centros_de_costos_cod;

    if (code === false) {
      centros_de_costos_cod = this.state.centros_de_costos_cod.concat(
        this.state.empresa_separador_cc
      );
    } else {
      centros_de_costos_cod = this.state.centros_de_costos_cod;
    }

    //CHECK IF STARTS WITH --> empresa_separador_cc

    const startsWith = centros_de_costos_cod.startsWith(this.state.empresa_separador_cc);
    console.log("startsWith", startsWith);

    if (startsWith === false) {

      const format = this.state.formato_cc; //FORMATO
      const array = format.split(this.state.empresa_separador_cc); //SPLIT CON EL SEPARADOR DEL FORMATO
      const newArr = array.slice(0, array.length - 1);

      const actualValue = centros_de_costos_cod; //VALOR DEL INPUT
      const transformedValue = actualValue.replace(/[0-9]/g, 9);
      const array2 = transformedValue.split(this.state.empresa_separador_cc); //SPLIT CON ELSEPARADOR DEL FORMATO
      const newArr2 = array2.slice(0, array2.length - 1);

      const array3 = actualValue.split("."); //SPLIT CON ELSEPARADOR DEL FORMATO
      const newArr3 = array3.slice(0, array2.length - 1); //ARRAY PARA COMPROBAR SI TIENE NIVEL SUPERIOR

      console.log(newArr); //NUEVOS ARRAYS
      console.log(newArr2); //NUEVOS ARRAYS
      console.log(newArr3); //NUEVOS ARRAYS
      console.log(newArr[0], newArr2[0]);

      //COMPROBAR QUE EL PRIMER ELEMENTO SEA IGUAL
      if (newArr[0] === newArr2[0]) {
        console.log("starts correctly");

        //COMPROBAR QUE EL FORMATO SEA EL CORRECTO
        let arrFormat, arrValue, arrValue2;
        let result;

        for (let index = 0; index < newArr2.length; index++) {
          arrFormat = newArr[index];
          arrValue = newArr2[index];
          arrValue2 = newArr3[index];

          console.log(arrFormat === arrValue, arrFormat, arrValue);

          if ((arrFormat === arrValue) === false) {
            console.log('no match', arrFormat, arrValue);
            result = "Ingrese un codigo correcto";
            break;
          } else {
            const element = arrValue2;
            const hasZero = /[1-9]/g.test(element);
            if (hasZero === false) {
              result = "Cuenta no tiene nivel superior";
              break;
            } else {
              console.log(actualValue)
              result = "Crear";
            }
            // result = "Crear";
          }
        }

        if (result === "Cuenta no tiene nivel superior") {
          alert("Cuenta no tiene nivel superior");
        } else if (result === "Ingrese un codigo correcto") {
          alert("Ingrese un codigo correcto");
        }


        if (result === "Crear") {
          const newCC = {
            centros_de_costos_cod: actualValue,
            centros_de_costos_des: this.state.centros_de_costos_des,
            centros_de_costos_status: this.state.centros_de_costos_status,
            empresa_separador_cc: this.state.empresa_separador_cc,
            database: this.state.database
          };

          // alert(result);
          console.log(newCC);
          createCC(newCC).then(res => {
            console.log('👉 Returned data:', res);
            window.location.reload();
          }).catch(error => {
            alert(`Axios request failed: ${error}`);
          });
        }
        return true;

      } else {
        alert("Ingrese un codigo correcto");
      }

    } else {
      alert("Ingrese un codigo correcto");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.checkFormat();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selected = (centros_de_costos_cod, centros_de_costos_des) => {
    console.log(centros_de_costos_cod, centros_de_costos_des)
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <CostDialog
          open={this.state.open}
          handleClose={this.handleClose}
          selected={this.selected}
          costCenter={this.state.costCenter}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitle}>Centros de Costo</h4>
              </CardHeader>
              <CardBody>
                <div>
                  <span>Mascara de centro de costos: {this.state.formato_cc} </span>
                </div>
                <CostCenter
                  centros_de_costos_des={this.state.centros_de_costos_des}
                  centros_de_costos_cod={this.state.centros_de_costos_cod}
                  centros_de_costos_movimiento={this.state.centros_de_costos_movimiento}
                  centros_de_costos_presupuesto={this.state.centros_de_costos_presupuesto}
                  centros_de_costos_status={this.state.centros_de_costos_status}
                  onChange={this.onChange}
                  numberValidator={this.numberValidator}
                  onHandleChange0={this.onHandleChange("centros_de_costos_movimiento")}
                  onHandleChange1={this.onHandleChange("centros_de_costos_presupuesto")}
                  onHandleChange={this.onHandleChange("centros_de_costos_status")}
                />
              </CardBody>
            </Card>
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
                      <IconButton aria-label="Save" onClick={this.onSubmit}>
                        <Save className={classes.save} />
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
                      <IconButton
                        aria-label="Cancel"
                        onClick={this.cancelCourse}
                      >
                        <Cancel className={classes.cancel} />
                      </IconButton>
                    </Tooltip>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Tooltip
                      id="tooltip-top"
                      title="Ver Centro de Costos"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Ver Centro de Costos"
                        onClick={this.handleClickOpen}
                      >
                        <List />
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

export default withStyles(styles)(CostCenters);
