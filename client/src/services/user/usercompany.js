import axios from 'axios';
import Promise from "promise";
import { serverUrl } from "variables/general";

export const createUser = (register) => {
  return new Promise((resolve, rej) => {
    axios.post(serverUrl + 'session/register', {
      user_username: register.user_username,
      user_password: register.user_password,
      user_company: register.user_company,
      user_sucursal: register.user_sucursal
    }).then(res => {
      console.log('Usuario registrado', res.data);
      // console.log(signIn.user_username, signIn.user_password)
      // localStorage.setItem('userToken', JSON.stringify(res.data));
      resolve(res.data)
      return res.data
    }).catch(err => {
      console.log('error', err.response.data);
        rej(err)
        return err
    });
  });
}

export const assignUser = (assign) => {
  return new Promise((resolve, rej) => {
    axios.post(serverUrl + 'users/assignDB', {
      user_username: assign.user_username
    }).then(res => {
      console.log('Usuario registrado', res.data);
      // console.log(signIn.user_username, signIn.user_password)
      // localStorage.setItem('userToken', JSON.stringify(res.data));
      resolve(res.data)
      return res.data
    }).catch(err => {
      console.log('error', err.response.data);
      rej(err)
      return err
    });
  });
}

export const dropDB = (username) => {
  return new Promise((resolve, reject) => {
    axios.get(serverUrl + "users/accUser", {
      user_username: username.user_username
    }).then(res => {
      console.log(res.data)
      console.log(username.user_username);
      resolve(res.data);
    }).catch(err => {
      console.log("error", err.response.data);
      reject(err);
    });
  });
};

export const deleteUser = userCompany => {
  return new Promise((resolve, reject) => {
    axios.delete(serverUrl + "users/deleteAcc", {
      userId: userCompany.userId
    }).then(res => {
      resolve(res.data);
      return res.data;
    }).catch(err => {
      console.log("error", err.response.data);
      reject(err);
      return err;
    });
  });
};