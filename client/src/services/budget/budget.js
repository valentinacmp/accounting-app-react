import axios from "axios";
import Promise from "promise";
import { baseUrl } from "variables/general";

export const getBudgets = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "budget/" + data.databases;
    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        reject(error.response);
        console.log(error.response.data.message);
      });
  });
};

export const getBudgetsCC = async data => {
  return new Promise((resolve, reject) => {
    const table = "partidas_presupuestarias_cc"
    const url = baseUrl + "budget/" + data.databases + "/" + table;
    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
      resolve(response.data.result);
    }).catch(error => {
      reject(error.response.data)
    })
  })
}

export const createBudget = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "budget/" + data.databases;
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        partidas_presupuestarias_cod: data.partidas_presupuestarias_cod,
        partidas_presupuestarias_des: data.partidas_presupuestarias_des,
        partidas_presupuestarias_espec: data.partidas_presupuestarias_espec,
        partidas_presupuestarias_responsable: data.partidas_presupuestarias_responsable,
        partidas_presupuestarias_partida: data.partidas_presupuestarias_partida,
        partidas_presupuestarias_cc: data.partidas_presupuestarias_cc,
        partidas_presupuestarias_cuentas: data.partidas_presupuestarias_cuentas,
        partidas_presupuestarias_mod: data.partidas_presupuestarias_mod,
        partidas_presupuestarias_total: data.partidas_presupuestarias_total,
        partidas_presupuestarias_fecha_inicio: data.partidas_presupuestarias_fecha_inicio,
        partidas_presupuestarias_fecha_fin: data.partidas_presupuestarias_fecha_fin,
        partidas_presupuestarias_status: data.partidas_presupuestarias_status,
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.log(error.response);
        reject(error.response.data);
      });
  });
};

export const createBudgetCC = async data_cc => {
  return new Promise((resolve, reject) => {
    const table = "partidas_presupuestarias_cc"
    const url = baseUrl + "budget/" + data_cc.databases + "/" + table;
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        partidas_presupuestarias_id: data_cc.partidas_presupuestarias_id,
        partidas_presupuestarias_cc_partida: data_cc.partidas_presupuestarias_cc_partida,
        partidas_presupuestarias_cc_total: data_cc.partidas_presupuestarias_cc_total,
        partidas_presupuestarias_cc_codigo: data_cc.partidas_presupuestarias_cc_codigo,
        partidas_presupuestarias_cc_des: data_cc.partidas_presupuestarias_cc_des,
        partidas_presupuestarias_cc_pres: data_cc.partidas_presupuestarias_cc_pres,
        partidas_presupuestarias_cc_asig: data_cc.partidas_presupuestarias_cc_asig,
        partidas_presupuestarias_cc_dif: data_cc.partidas_presupuestarias_cc_dif
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.log(error.response);
        reject(error.response.data);
      });
  });
};

export const updateBudget = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "budget/" + data.databases + "/" + data.partidas_presupuestarias_id;
    axios({
      method: "PUT",
      url: `${url}`,
      data: {
        partidas_presupuestarias_cod: data.partidas_presupuestarias_cod,
        partidas_presupuestarias_des: data.partidas_presupuestarias_des,
        partidas_presupuestarias_espec: data.partidas_presupuestarias_espec,
        partidas_presupuestarias_responsable: data.partidas_presupuestarias_responsable,
        partidas_presupuestarias_partida: data.partidas_presupuestarias_partida,
        partidas_presupuestarias_cc: data.partidas_presupuestarias_cc,
        partidas_presupuestarias_cuentas: data.partidas_presupuestarias_cuentas,
        partidas_presupuestarias_mod: data.partidas_presupuestarias_mod,
        partidas_presupuestarias_total: data.partidas_presupuestarias_total,
        partidas_presupuestarias_fecha_inicio: data.partidas_presupuestarias_fecha_inicio,
        partidas_presupuestarias_fecha_fin: data.partidas_presupuestarias_fecha_fin,
        partidas_presupuestarias_status: data.partidas_presupuestarias_status,
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.log(error.response);
        reject(error.response);
      });
  });
};

export const deleteBudget = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "budget/" + data.databases + "/" + data.partidas_presupuestarias_id;
    axios({
      method: "DELETE",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.log(error.response);
        reject(error.response);
      });
  });
};
