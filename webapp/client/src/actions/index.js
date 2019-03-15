import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LOAD_INVOICES, LOAD_STATS, LOAD_USERS, CHANGE_MENU_STATUS } from './types';

const SITE_URL = 'https://factura.nanoapp.io';

export const signup = ({ name, email, password }, callback) => async dispatch => {
  const url = `${SITE_URL}/signup?email=${email}&password=${password}&password_confirmation=${password}`;
  try {
    const response = await axios.post(url);
    dispatch({
      type: AUTH_USER,
      payload: response.data.auth_token
    });    
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });
  }
};

export const signin = ({ email, password }, callback) => async dispatch => {
  const url = `${SITE_URL}/auth/login?email=${email}&password=${password}`;
  try {
    const response = await axios.post(url);
    dispatch({
      type: AUTH_USER,
      payload: response.data
    });
    console.log(response.data);
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    console.log(e);
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const loadInvoices = () => async dispatch => {
  const url = `${SITE_URL}/documents`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json',
    }
  }
  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_INVOICES,
      payload: response.data
    });
  } catch (e) {
    console.log(e);
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const loadStats = (query) => async dispatch => {
  const url = `${SITE_URL}/stats?query=${query}`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json',
    }
  }
  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_STATS,
      payload: response.data
    });
  } catch (e) {
    console.log(e);
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const loadUsers = () => async dispatch => {
  const url = `${SITE_URL}/user_accounts`;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json',
    }
  }
  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_USERS,
      payload: response.data
    });
  } catch (e) {
    console.log(e);
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const changeMenuStatus = (status) => dispatch => {
  const menuStatus = status == 'open' ? 'closed' : 'open';
  dispatch({
    type: CHANGE_MENU_STATUS,
    payload: menuStatus
  });
};