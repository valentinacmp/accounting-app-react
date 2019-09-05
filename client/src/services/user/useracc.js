import axios from "axios";
import Promise from "promise";
import { baseUrl } from "variables/general";

export const userAcc = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/" + data.databases;
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
        console.log(error.response);
        reject(error.response);
      });
  });
};

//CREAR USUARIO EN WEBSUARIO (CONECTA2)
export const createUser = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/create/";
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        usuario_nombre: data.usuario_nombre,
        usuario_clave: data.usuario_clave,
        creador_id: data.creador_id
      },
      headers: { "Content-Type": "application/json" }
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

//CREAR USUARIO EN LA BASE DE DATO ASIGNADA
export const createUserAcc = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/create/" + data.databases;
    axios({
      method: "POST",
      url: `${url}`,
      data: {
        usuario_nombre: data.usuario_nombre,
        usuario_des: data.usuario_des,
        usuario_clave: data.usuario_clave,
        usuario_ubicacion: data.usuario_ubicacion,
        usuario_expiration_date: data.usuario_expiration_date,
        usuario_status: data.usuario_status,
        usuario_email: data.usuario_email,
        usuario_acceso_empresa: data.usuario_acceso_empresa,
        usuarios_accesos: data.usuarios_accesos
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        console.log(error.respons);
        reject(error.response);
      });
  });
};


export const updateUserAcc = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/" + data.databases +"/"+ data.user_id;
    axios({
      method: "PUT",
      url: `${url}`,
      data: {
        usuario_nombre: data.usuario_nombre,
        usuario_des: data.usuario_des,
        usuario_clave: data.usuario_clave,
        usuario_ubicacion: data.usuario_ubicacion,
        usuario_expiration_date: data.usuario_expiration_date,
        usuario_status: data.usuario_status,
        usuario_email: data.usuario_email,
        usuario_acceso_empresa: data.usuario_acceso_empresa,
        usuarios_accesos: data.usuarios_accesos
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

export const deleteUserAcc = async data => {
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/" + data.databases + "/"+ data.usuario_nombre;
    axios({
      method: "DELETE",
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
        console.log(error.response);
        reject(error.response);
      });
  });
};

//ELIMINAR USUARIO EN WEBUSUARIO
export const deleteUser = async data =>{
  return new Promise((resolve, reject) => {
    const url = baseUrl + "usersAcc/" + data.usuario_nombre;
    axios({
      method: "DELETE",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response =>{
      resolve(response.data.result);
    }).catch(error => {
      console.log(error.response);
      reject(error.response);
    })
  })
}

//ELIMINAR TODOS LOS USUARIOS EN EMPRESA_N
export const deleteAllUsers = async data => {
  return new Promise((resolve, reject) =>{
    const url = baseUrl + "usersAcc/"+ data.databases;
    axios({
      method: "DELETE",
      url: `${url}`,
      data: null,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
      resolve(response.data.result);
    }).catch(error => {
      console.log(error.response);
      reject(error.response);
    })
  })
}