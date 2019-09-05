import axios from 'axios';
import Promise from "promise";
import { baseUrl } from "variables/general";

export const createChart = async newChart => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "chart_accounts/create/" + newChart.database;
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        plan_de_cuentas_cod: newChart.plan_de_cuentas_cod,
        plan_de_cuentas_des: newChart.plan_de_cuentas_des,
        plan_de_cuentas_actv: newChart.plan_de_cuentas_actv,
        empresa_separador_pc: newChart.empresa_separador_pc
      },
      headers: { "Content-Type": "application/json" }
    }).then(response =>{
      resolve(response.data);
      console.log(response);
    }).catch(error => {
      reject(error.response.data.message);
      console.log(error.response.data.message);
    })
  });
};

// export const createChart = async (newChart) => {
//   return new Promise ((resolve, reject) =>{
//     axios.post(serverUrl + 'chart_accounts/create/' + newChart.database, {
      // plan_de_cuentas_cod: newChart.plan_de_cuentas_cod,
      // plan_de_cuentas_des: newChart.plan_de_cuentas_des,
      // plan_de_cuentas_actv: newChart.plan_de_cuentas_actv,
      // empresa_separador_pc: newChart.empresa_separador_pc
//     }).then(res => {
//       resolve(res);
//       console.log(res);
//       alert('Creada');
//     }).catch(error => {
//       reject(error);
//       alert(JSON.stringify(error.response.data.message))
//       console.log(error);
//     })
//   })
// }
