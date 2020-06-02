import axios from 'axios';

const setSession = (security_token: string) => {
  window.localStorage.setItem("jwt", security_token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${security_token}`;
  axios.defaults.headers.post['Content-Type'] = "application/json";
}
const getSession = ():string|null => {
  let security_token:string|null = window.localStorage.getItem("jwt");
  axios.defaults.headers.common["Authorization"] = `Bearer ${security_token}`;
  axios.defaults.headers.post['Content-Type'] = "application/json";
  return security_token;
}
const clearSession = () => {
  window.localStorage.removeItem("jwt");
  axios.defaults.headers.common["Authorization"] = "";
}

getSession();

export default {
  setSession,
  getSession,
  clearSession
}