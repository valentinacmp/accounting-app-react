import axios from 'axios';
import Promise from "promise";
import { serverUrl } from "variables/general";

export const createCompany = (register) => {
  return new Promise((resolve, rej) => {
    axios.post(serverUrl + 'userCompany/company', {
      company_name: register.company_name,
      company_rif: register.company_rif,
      company_days: register.company_days,
      company_start_date: register.company_start_date,
      company_end_date: register.company_end_date,
      company_status: register.company_status,
    }).then(res => {
      console.log('Emperesa registrada', res.data);
      console.log(register.company_name, register.company_rif,register.company_days,
       register.company_start_date,register.company_end_date,register.company_status)
      localStorage.setItem('companyToken', JSON.stringify(res.data));
      resolve(res.data)
      return res.data
    }).catch(err => {
      console.log('error', err.response.data);
      rej(err)
      return err
    });
  });
}

export const createSucursal = (registerSuc) => {
  return new Promise((resolve, rej) => {
    axios.post(serverUrl + 'userCompany/sucursal/' + registerSuc.user_company, {
      sucursal_name: registerSuc.sucursal_name,
      sucursal: registerSuc.sucursal,
      sucursal_status: registerSuc.company_status,
      user_company: registerSuc.user_company
    }).then(res => {
      console.log('Sucursal registrada', res.data);
      localStorage.setItem('sucToken', JSON.stringify(res.data));
      resolve(res.data)
      return res.data
    }).catch(err => {
      console.log('error', err.response.data);
      rej(err)
      return err
    });
  });
}

