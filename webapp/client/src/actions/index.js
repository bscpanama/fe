import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LOAD_INVOICES, LOAD_STATS, LOAD_USERS, CHANGE_MENU_STATUS, SUCCESFUL_USER_CREATED } from './types';

const SITE_URL = 'https://factura.nanoapp.io';

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

export const createUserAcount = (values, callback) => async dispatch => {
  const url = `${SITE_URL}/user_accounts`;
  const token = localStorage.getItem("token");
  let formData = new FormData();
  try {
    const config = {
      headers: {
        'Authorization': token,
        'Accept': 'application/vnd.factura.v1+json',
        'Content-Type': 'multipart/form-data'
      }      
    }

    formData.append('email',values.email);
    formData.append('password',values.password);
    formData.append('password_confirmation',values.confirmpassword);
    formData.append('account_attributes[avatar]',values.avatar);
    formData.append('account_attributes[name]',values.name);
    formData.append('account_attributes[last_name]',values.lastname);
    formData.append('account_attributes[mobile_number]',values.mobile);
    formData.append('account_attributes[phone_number]',values.phone);
    formData.append('account_attributes[plan_id]',values.plans);
    formData.append('account_attributes[company]',values.company);

    /*const params = {
        "email": values.email,
        "password": values.password,
        "password_confirmation": values.confirmpassword,
        "account_attributes": {
        "avatar": values.avatar,
        "name": values.name,
        "last_name": values.lastname,
        "mobile_number": values.mobile,
        "phone_number": values.phone,
        "plan_id": values.plans,
        "company": values.company
        }
    };*/
    const response = await axios.post(url, formData, config);
    dispatch({
      type: SUCCESFUL_USER_CREATED,
      payload: response.data
    });    
    callback();
  } catch (e) {
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
  console.log(values);
};