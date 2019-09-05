import axios from "axios";
import Promise from "promise";
import { serverUrl }from "variables/general";

export const createUser = async newUser => {
  axios
    .post(serverUrl + "session/signup", {
      user_name: newUser.user_name,
      user_lastname: newUser.user_lastname,
      user_username: newUser.user_username,
      user_address: newUser.user_address,
      user_password: newUser.user_password,
      user_email: newUser.user_email,
      user_role: newUser.user_role,
      user_status: newUser.user_status,
      user_expiration_date: newUser.user_expiration_date
    })
    .then(res => {
      alert("Usuario creado!");
    })
    .catch(err => {
      alert(err.response.data.message);
      console.log("ERROR POST -> ", err.response.data.message);
    });
};

export const login = signIn => {
  return new Promise((resolve, reject) => {
    axios
      .post(serverUrl + "session/login", {
        // auth: {
        //   user_username: signIn.user_username,
        //   user_password: signIn.user_password
        // }
        user_username: signIn.user_username,
        user_password: signIn.user_password
      })
      .then(res => {
        console.log("Logged", res);
        localStorage.setItem("userToken", JSON.stringify(res.data));
        // localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        resolve(res.data);
        return res.data;
      })
      .catch(err => {
        console.log("error", err);
        console.log(
          "serverurl",
          signIn.user_username,
          signIn.user_password
        );
        reject(err);
        return err;
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(serverUrl + "session/logout")
      .then(res => {
        resolve(res);
        console.log(res);
        axios.defaults.headers.common["Authorization"] = null;
      })
      .catch(error => {
        // Authentication failed
        reject(error);
        alert("you are trespassing");
      });
  });
};
