import axios from 'axios';
import Promise from "promise";
import { baseUrl } from "variables/general";

export const createCompany = async (newCompany) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + "companies/createCompany/" + newCompany.database + "/" + newCompany.table;

      const response = axios({
        method: "POST",
        url: `${url}`,
        data: {
          empresa_des: newCompany.empresa_des,
          empresa_direccion: newCompany.empresa_direccion,
          empresa_email: newCompany.empresa_email,
          empresa_contacto: newCompany.empresa_contacto,
          empresa_website: newCompany.empresa_website,
          empresa_rif: newCompany.empresa_rif,
          empresa_ciudad: newCompany.empresa_ciudad,
          empresa_telefono: newCompany.empresa_telefono,
          empresa_telefax: newCompany.empresa_telefax,
          empresa_status: newCompany.empresa_status,
          empresa_fecha_inicio: newCompany.empresa_fecha_inicio,
          empresa_fecha_fin: newCompany.empresa_fecha_fin,
          empresa_separador_pc: newCompany.empresa_separador_pc,
          empresa_mascara_pc: newCompany.empresa_mascara_pc,
          empresa_simbolo: newCompany.empresa_simbolo,
          empresa_separador_cc: newCompany.empresa_separador_cc,
          empresa_mascara_cc: newCompany.empresa_mascara_cc,
          empresa_fecha_mov: newCompany.empresa_fecha_mov,
          empresa_correlativo: newCompany.empresa_correlativo,
          empresa_centros_costos: newCompany.empresa_centros_costos,
          empresa_num_lineas: newCompany.empresa_num_lineas
        },
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const dropTable = async (no_taken) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + "companies/" + no_taken.database + "/" + no_taken.table2;

      const response = axios({
        method: "DELETE",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const createTable = async (taken) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/create/' + taken.database + '/' + taken.table3;

      const response = axios({
        method: "POST",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const dropTable2 = async (taken) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/' + taken.database + '/' + taken.table;

      const response = axios({
        method: "DELETE",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const deleteCompany = async (deleteComp) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/delete/' + deleteComp.database + '/' + deleteComp.table;

      const response = axios({
        method: "DELETE",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const createTable2 = async (no_taken) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/create/' + no_taken.database + '/' + no_taken.table;

      const response = axios({
        method: "POST",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const updateComp = async (updateCompany) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/' + updateCompany.database + '/' + updateCompany.table;

      const response = axios({
        method: "PUT",
        url: `${url}`,
        data: {
          empresa_des: updateCompany.empresa_des,
          empresa_direccion: updateCompany.empresa_direccion,
          empresa_email: updateCompany.empresa_email,
          empresa_contacto: updateCompany.empresa_contacto,
          empresa_website: updateCompany.empresa_website,
          empresa_rif: updateCompany.empresa_rif,
          empresa_ciudad: updateCompany.empresa_ciudad,
          empresa_telefono: updateCompany.empresa_telefono,
          empresa_telefax: updateCompany.empresa_telefax,
          empresa_status: updateCompany.empresa_status,
          empresa_fecha_inicio: updateCompany.empresa_fecha_inicio,
          empresa_fecha_fin: updateCompany.empresa_fecha_fin,
          empresa_separador_pc: updateCompany.empresa_separador_pc,
          empresa_mascara_pc: updateCompany.empresa_mascara_pc,
          empresa_simbolo: updateCompany.empresa_simbolo,
          empresa_separador_cc: updateCompany.empresa_separador_cc,
          empresa_mascara_cc: updateCompany.empresa_mascara_cc,
          empresa_fecha_mov: updateCompany.empresa_fecha_mov,
          empresa_correlativo: updateCompany.empresa_correlativo,
          empresa_centros_costos: updateCompany.empresa_centros_costos,
          empresa_num_lineas: updateCompany.empresa_num_lineas
        },
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const getCompanies = async (company) => {
  return new Promise((resolve, reject) => {
    try {
      const url = baseUrl + 'companies/' + company.database + '/' + company.table;

      const response = axios({
        method: "GET",
        url: `${url}`,
        data: null,
        headers: { "Content-Type": "application/json" }
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
}

export const companiesTaken = async (data) => {
  return new Promise((resolve, reject) => {

    const url = baseUrl + `companies/databases/taken`;

    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      const databases = response.data.databases;
      const filtered = databases.filter(p =>
        String(p.TABLE_SCHEMA).startsWith("empresa" + data.userId + "_")
      );
      resolve(filtered);
    }).catch(error =>{
      reject(error);
      console.log(error.response);
    })

  });
}

export const companyData = async (data) => {
  return new Promise ((resolve, reject) => {

    const url = baseUrl + `companies/` + data.databases + `/` + data.table;

    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: { "Content-Type": "application/json" }
    }).then(response =>{
      resolve(response.data.result[0]);
      // console.log(response.data)
    }).catch(error => {
      reject(error);
      console.log(error.response);
    })
  })
}






