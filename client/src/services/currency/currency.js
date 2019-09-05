import axios from 'axios';
import Promise from "promise";
import { baseUrl } from "variables/general";

export const getCurencies = async (data) =>{
  return new Promise((resolve, reject) =>{
    const url = baseUrl + "currency/"+ data.databases;
    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response =>{
      resolve(response.data.result);
    }).catch(error =>{
      reject(error.response);
      console.log(error.response.data.message)
    })
  });
}

export const createCurrency = async (data) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "currency/" + data.databases;
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        monedas_des: data.monedas_des,
        monedas_simbolo: data.monedas_simbolo,
        monedas_factor: data.monedas_factor,
        monedas_status: data.monedas_status
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
}

export const updateCurrency = async (data) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "currency/" + data.databases + "/"+ data.monedas_id;
    axios({
      method: "PUT",
      url: `${url}`,
      data: {
        monedas_des: data.monedas_des,
        monedas_simbolo: data.monedas_simbolo,
        monedas_factor: data.monedas_factor,
        monedas_status: data.monedas_status
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
}


export const deleteCurrency = async (data) => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "currency/" + data.databases + "/"+ data.monedas_id;
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
}