import axios from "axios";
import Promise from "promise";
import { baseUrl } from "variables/general";

export const createCC = async newCC => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "cost_center/create/" + newCC.database;

    axios({
      method: "POST",
      url: `${url}`,
      data: {
        centros_de_costos_cod: newCC.centros_de_costos_cod,
        centros_de_costos_des: newCC.centros_de_costos_des,
        centros_de_costos_status: newCC.centros_de_costos_status,
        empresa_separador_cc: newCC.empresa_separador_cc
      },
      headers: { "Content-Type": "application/json" }
    }).then(response =>{
      resolve(response.data);
    }).catch(error => {
      console.log(error.response.data);
      reject(error.response.data.message);
    })
  });
};

export const getCostCenters = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "cost_center/" + data.databases;
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
