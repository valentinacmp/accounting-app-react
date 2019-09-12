import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//material-dashboard components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import List from "@material-ui/icons/List";

//Components
import GeneralData from "../../components/ChartOfAccounts/GeneralData/GeneralData";
import Notes from "../../components/ChartOfAccounts/Notes/Notes";
import Rules from "../../components/ChartOfAccounts/Rules/Rules";
import { createChart } from "../../services/chartOfAccounts/chartOfAccounts";
import ChartDialog from "../../components/Dialogs/ChartDialog/ChartDialog";
import { serverUrl } from "variables/general";

import axios from "axios";

const styles = theme => ({
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

class ChartOfAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      plan_de_cuentas_cod: "",
      plan_de_cuentas_des: "",
      plan_de_cuentas_actv: "",
      plan_de_cuentas_actv_notes: "",
      numberFormat: "",
      formato: "",
      formato_cc: "",
      mascara: "",
      mascara_cc: "",
      database: "",
      empresa_separador_pc: "",
      empresa_separador_cc: "",
      open: false,
      answer: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  componentDidMount() {
    axios.defaults.withCredentials = false;
    
    const company = localStorage.getItem("company");
    const db = localStorage.getItem("db");
    const jsonComp = JSON.parse(company);

    const format = jsonComp.empresa_mascara_pc;
    const mask = "#";
    const res = format.replace(/9/g, `${mask}`);

    this.setState({
      formato: jsonComp.empresa_mascara_pc,
      mascara: jsonComp.empresa_separador_pc,
      empresa_separador_pc: jsonComp.empresa_separador_pc,
      formato_cc: jsonComp.empresa_mascara_cc,
      mascara_cc: jsonComp.empresa_separador_cc,
      empresa_separador_cc: jsonComp.empresa_separador_cc,
      numberFormat: res,
      database: db
    });

    console.log(
      jsonComp.empresa_mascara_pc,
      res,
      jsonComp.empresa_separador_pc,
      db,
      jsonComp.empresa_mascara_cc,
      jsonComp.empresa_separador_cc,
    );

    axios
      .get(serverUrl + `chart_accounts/` + db, {
        withCredentials: false
      })
      .then(res => {
        const plans = res.data.result;
        console.log(plans);
        this.setState({ plans: plans });
      })
      .catch(error => {
        console.log(error);
      });
  }


  level(answer) {
    const str = this.state.plan_de_cuentas_cod;
    const array = str.split(this.state.empresa_separador_pc);
    const newArr = array.slice(0, array.length-1);

    answer = this.state.answer;

    for (let i = 0; i < newArr.length; i++) {
      const element = newArr[i];
      const isZero = /[1-9]/g.test(element);
      if (isZero === false) {
        return answer;
      }
    }
  }

  checkFormat(answer) {

    answer = this.state.answer;

    //CHECK IF ENDS WITH --> empresa_separador_pc

    const code = this.state.plan_de_cuentas_cod.endsWith(
      this.state.empresa_separador_pc
    );
    console.log("endswith", code);

    let plan_de_cuentas_cod;

    if (code === false) {
      plan_de_cuentas_cod = this.state.plan_de_cuentas_cod.concat(
        this.state.empresa_separador_pc
      );
    } else {
      plan_de_cuentas_cod = this.state.plan_de_cuentas_cod;
    }

    //CHECK IF STARTS WITH --> empresa_separador_pc

    const startsWith = plan_de_cuentas_cod.startsWith(this.state.empresa_separador_pc);
    console.log("startsWith", startsWith);

    if (startsWith === false) {

      const format = this.state.formato; //FORMATO
      const array = format.split(this.state.empresa_separador_pc); //SPLIT CON EL SEPARADOR DEL FORMATO
      const newArr = array.slice(0, array.length - 1); //PARA QUITAR EL SEPARADOR AL FINAL DEL FORMATO Y PODER COMPARAR BIEN

      const actualValue = plan_de_cuentas_cod; //VALOR DEL INPUT ACTUAL
      const transformedValue = actualValue.replace(/[0-9]/g, 9);
      const array2 = transformedValue.split(this.state.empresa_separador_pc); //SPLIT CON EL SEPARADOR DEL FORMATO
      const newArr2 = array2.slice(0, array2.length - 1);

      const array3 = actualValue.split("."); //SPLIT CON EL SEPARADOR DEL FORMATO
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
          }
        }

        if (result === "Cuenta no tiene nivel superior"){
          alert("Cuenta no tiene nivel superior");
        } else if (result === "Ingrese un codigo correcto"){
          alert("Ingrese un codigo correcto");
        }

        if(result === "Crear"){
          const newChart = {
            plan_de_cuentas_cod: actualValue,
            plan_de_cuentas_des: this.state.plan_de_cuentas_des,
            plan_de_cuentas_actv: this.state.plan_de_cuentas_actv,
            empresa_separador_pc: this.state.empresa_separador_pc,
            database: this.state.database
          };

          createChart(newChart).then(res => {
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

  onSubmit(e, answer) {
    e.preventDefault();
    this.checkFormat();
  }

  numberValidator = e => {

    const arr = this.state.plan_de_cuentas_cod;

    if (arr.includes('.') || arr.includes('/') || arr.includes('-') || arr.includes('_')) {
      const replace = this.state.plan_de_cuentas_cod.replace(/[.|_|-]/g, this.state.empresa_separador_pc);
      console.log(replace)
      this.setState({ plan_de_cuentas_cod: replace });
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

    window.oncontextmenu = function() {
      return false;
    };
  };

  //--------------DIALOG-----------------//

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    var mask = (
      <div>
        <span>Mascara de cuenta contable: {this.state.formato} </span>
      </div>
    );

    return (
      <div>
        <ChartDialog
          open={this.state.open}
          handleClose={this.handleClose}
          plans={this.state.plans}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={11}>
            <CustomTabs
              title="Plan de cuentas"
              headerColor="info"
              tabs={[
                {
                  tabName: "Datos Generales",
                  tabContent: (
                    <div>
                      {mask}
                      <GeneralData
                        plan_de_cuentas_cod={this.state.plan_de_cuentas_cod}
                        plan_de_cuentas_des={this.state.plan_de_cuentas_des}
                        plan_de_cuentas_actv={this.state.plan_de_cuentas_actv}
                        formato={this.state.formato}
                        mascara={this.state.mascara}
                        numberFormat={this.state.numberFormat}
                        numberValidator={this.numberValidator}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                      />
                    </div>
                  )
                },
                {
                  tabName: "Notas",
                  tabContent: (
                    <div>
                      {mask}
                      <Notes 
                        onChange={this.onChange}
                        plan_de_cuentas_actv_notes={this.state.plan_de_cuentas_actv_notes}
                      />
                    </div>
                  )
                },
                {
                  tabName: "Normas VEN-NIF PYME",
                  tabContent: (
                    <div>
                      {mask}
                      <Rules />
                    </div>
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
                      title="Ver Plan"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Ver Plan"
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

export default withStyles(styles)(ChartOfAccounts);
