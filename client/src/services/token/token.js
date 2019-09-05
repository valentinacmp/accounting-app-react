let token = "";

export const getToken = (tokenName) => {
  token = JSON.parse(localStorage.getItem(tokenName));
  return token;
};

export const removeToken = tokenName => {
  token = JSON.parse(localStorage.removeItem(tokenName));
  return token;
};