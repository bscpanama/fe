import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LOAD_INVOICES, LOAD_STATS, LOAD_USERS, LOAD_USER, CHANGE_MENU_STATUS, SUCCESFUL_USER_CREATED, SETTINGS_UPDATED, SETTINGS_UPDATE_ERROR, FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_RESET_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR, CREATE_USER_ERROR, MODIFY_USER_ERROR } from './types';


const qs = require('qs');

export const SITE_URL = 'https://factura.nanoapp.io';

export const signin = ({ email, password }, callback) => async dispatch => {
  const url = `${SITE_URL}/auth/login?email=${email}&password=${password}`;
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      // do someting on errir
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );
  try {
    const response = await axios.post(url);
    dispatch({
      type: AUTH_USER,
      payload: response.data
    });
    localStorage.setItem('bsctoken', response.data.auth_token);
    localStorage.setItem('bscID', response.data.user_id);
    localStorage.setItem('bscName', response.data.user_name);
    localStorage.setItem('bscType', response.data.user_type);
    localStorage.setItem('bscAvatar', response.data.avatar_url);
    callback();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: e.message
    });
  }
};

export const signout = (callback) => {
  localStorage.removeItem('bsctoken');
  localStorage.removeItem('bsctoken');
  localStorage.removeItem('bscID');
  localStorage.removeItem('bscName');
  localStorage.removeItem('bscType');
  localStorage.removeItem('bscAvatar');

  callback();
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const loadInvoices = (values) => async dispatch => {
  const url = `${SITE_URL}/documents`;
  const token = localStorage.getItem("bsctoken");
  let params = {
    'page' : values.page
  };

  if(typeof values.status !== 'undefined'){
    if(values.status != 'todos') {
      params.by_status = values.status;
    }
  }

  if(typeof values.date !== 'undefined'){
    if(values.date != 'todo') {
      params.by_days = values.date;
    }
  }

  if(typeof values.datebegin !== 'undefined' && typeof values.dateend !== 'undefined' ){
    params.by_period = {};
    params.by_period.started_at = values.datebegin;
    params.by_period.ended_at = values.dateend;
  }

  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json'
    },
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'brackets'})
    }
  };

  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_INVOICES,
      payload: response.data
    });
  } catch (e) {
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const loadStats = (query) => async dispatch => {
  const url = `${SITE_URL}/stats?query=${query}`;
  const token = localStorage.getItem("bsctoken");
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
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const loadUsers = (values) => async dispatch => {
  const url = `${SITE_URL}/user_accounts`;
  const token = localStorage.getItem("bsctoken");
  let params = {
    'page' : values.page
  };

  if(typeof values.status !== 'undefined'){
    if(values.status != 'todos') {
      params.by_status = values.status;
    }
  }

  if(typeof values.date !== 'undefined'){
    if(values.date != 'todo') {
      params.by_days = values.date;
    }
  }

  if(typeof values.datebegin !== 'undefined' && typeof values.dateend !== 'undefined' ){
    params.by_period = {};
    params.by_period.started_at = values.datebegin;
    params.by_period.ended_at = values.dateend;
  }

  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json'
    },
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'brackets'})
    }
  };

  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_USERS,
      payload: response.data
    });
  } catch (e) {
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

export const createUserAccount = (values, callback) => async dispatch => {
  const url = `${SITE_URL}/user_accounts`;
  const token = localStorage.getItem("bsctoken");
  let formData = new FormData();
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );
  try {
    const config = {
      headers: {
        'Authorization': token,
        'Accept': 'application/vnd.factura.v1+json',
        'Content-Type': 'multipart/form-data'
      }      
    }

    formData.append('email',values.email);
    if(typeof  values.avatar !== 'undefined') {
      formData.append('account_attributes[avatar]',values.avatar);
    }

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
    dispatch({
      type: CREATE_USER_ERROR,
      payload: e.message
    });
  }
};

export const loadUser = (id) => async dispatch => {
  const url = `${SITE_URL}/user_accounts/${id}`;
  const token = localStorage.getItem('bsctoken');
  const config = {
    headers: {
      'Authorization': token,
      'Accept': 'application/vnd.factura.v1+json',
    }
  }
  try {
    const response = await axios.get(url, config);
    dispatch({
      type: LOAD_USER,
      payload: response.data
    });
  } catch (e) {
    /*dispatch({
      type: AUTH_ERROR,
      payload: e.data.message
    });*/
  }
};

export const modifyUserAccount = (values, callback) => async dispatch => {
  const url = `${SITE_URL}/user_accounts/${values.id}`;
  const token = localStorage.getItem("bsctoken");
  let formData = new FormData();
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );
  try {
    const config = {
      headers: {
        'Authorization': token,
        'Accept': 'application/vnd.factura.v1+json',
        'Content-Type': 'multipart/form-data'
      }      
    }

    formData.append('email',values.email);
    if(typeof  values.avatar !== 'undefined') {
      formData.append('account_attributes[avatar]',values.avatar);
    }
    formData.append('account_attributes[id]',values.account_id);
    formData.append('account_attributes[name]',values.name);
    formData.append('account_attributes[last_name]',values.lastname);
    formData.append('account_attributes[mobile_number]',values.mobile);
    formData.append('account_attributes[phone_number]',values.phone);
    formData.append('account_attributes[plan_id]',values.plans);
    formData.append('account_attributes[company]',values.company);
    formData.append('account_attributes[status]',values.status);

    const response = await axios.put(url, formData, config);
    dispatch({
      type: SUCCESFUL_USER_CREATED,
      payload: response.data
    });    
    callback();
  } catch (e) {
    dispatch({
      type: MODIFY_USER_ERROR,
      payload: e.message
    });
  }

};

export const updateSettings = (values) => async dispatch => {
  const uid = localStorage.getItem("bscID");
  const url = `${SITE_URL}/user_accounts/${uid}`;
  const token = localStorage.getItem("bsctoken");
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );

  const data = {
    password: values.password,
    password_confirmation: values.passwordconfirmation
  };

  try {
    const config = {
      headers: {
        'Authorization': token,
        'Accept': 'application/vnd.factura.v1+json'
      }      
    }
    const response = await axios.put(url, data, config);
    dispatch({
      type: SETTINGS_UPDATED,
      payload: 'Su contraseña ha sido actualizada. Por favor haga ingreso otra vez.'
    });

    localStorage.removeItem('bsctoken');
    localStorage.removeItem('bsctoken');
    localStorage.removeItem('bscID');
    localStorage.removeItem('bscName');
    localStorage.removeItem('bscType');
    localStorage.removeItem('bscAvatar');

    return {
      type: AUTH_USER,
      payload: ''
    }; 
  } catch (e) {
    dispatch({
      type: SETTINGS_UPDATE_ERROR,
      payload: e.message
    });
  }
};

export const forgot = ({email}) => async dispatch => {
  const url = `${SITE_URL}/passwords/forgot?email=${email}`;
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );

  try {
    const response = await axios.post(url);
    dispatch({
      type: FORGOT_PASSWORD_RESET,
      payload: 'Se le ha enviado un correo'
    });    
  } catch (e) {
    dispatch({
      type: FORGOT_PASSWORD_RESET_ERROR,
      payload: e.message
    });
  }
};

export const resetPass = ({password, password_confirmation, token}) => async dispatch => {  
  const url = `${SITE_URL}/passwords/reset?password=${password}&token=${token}`;
  axios.interceptors.response.use(
    response => {
      // do someting on response
      return response
    },
    error => {
      if(typeof error.response !== 'undefined') {
        return Promise.reject(error.response.data); // => gives me the server resonse
      } else {
        return Promise.reject(error);
      }
    }
  );

  try {
    const response = await axios.post(url);
    dispatch({
      type: RESET_PASSWORD,
      payload: 'Su contraseña ha sido cambiada con exito'
    });    
  } catch (e) {
    dispatch({
      type: RESET_PASSWORD_ERROR,
      payload: e.message
    });
  }
};