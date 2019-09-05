import axios from 'axios';
import Promise from "promise";
import { serverUrl, baseUrl } from "variables/general";

export const createUser = async (newUser) => {

  axios.post(serverUrl + 'users/create', {
    user_name: newUser.user_name,
    user_lastname: newUser.user_lastname,
    user_username: newUser.user_username,
    user_address: newUser.user_address,
    user_password: newUser.user_password,
    user_email: newUser.user_email,
    user_role: newUser.user_role,
    user_status: newUser.user_status,
    user_expiration_date: newUser.user_expiration_date
  }).then(res => {
    alert('Usuario creado!');
  }).catch(err => {
    alert(err.response.data.message);
    console.log('ERROR POST -> ', err.response.data.message)
  })
}

export const login = async (user) => {
  return new Promise((resolve, reject) =>{
    
    const url = baseUrl + "session/login";
    const querystring = require("querystring");

    const data = {
      user_username: user.user_username,
      user_password: user.user_password
    };

    axios({
      method: "POST",
      url: `${url}`,
      data: querystring.stringify(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(res =>{
      console.log("👉 Returned data:", res);
      console.log(querystring.stringify(data));

      localStorage.setItem("userToken", JSON.stringify(res.data));

      resolve(res);
      }).catch(e => {
      reject(e);
      console.log(`😱 Axios request failed: ${e}`);
    })
  })
}

export const logout = async () => {
  return new Promise((resolve, reject) =>{
    
    const url = baseUrl + "session/logout";

    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(res =>{
      console.log("👉 Returned data:", res);

      localStorage.removeItem("userToken");
      localStorage.removeItem("compSelected");
      localStorage.removeItem("company");
      localStorage.removeItem("comp");
      localStorage.removeItem("selected");
      localStorage.removeItem("db");
      localStorage.removeItem("userCreator");
      resolve(res);

      }).catch(e => {

      reject(e);
      console.log(`😱 Axios request failed: ${e}`);

    })
  })
}

export const userCreator = async (data) =>{
  return new Promise((resolve, reject) =>{
    const url = baseUrl + "usersAcc/creator/" + data.userId
    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(response =>{
      resolve(response.data.result[0]);
    }).catch(error =>{
      reject(error.response);
      console.log(error.response);
    })
  })
}

export const userPermissions = async (data) =>{
  return new Promise((resolve, reject) =>{
    const url = baseUrl + "usersAcc/permissions/" + data.databases;
    axios({
      method: "GET",
      url: `${url}`,
      data: null,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(response =>{
      const filteredArr = response.data.result.find(item => item.usuario === data.usuario);
      if (!(filteredArr === undefined)){
        resolve(filteredArr);
      }
    }).catch(error =>{
      reject(error.response);
      console.log(error.response);
    })
  })
}