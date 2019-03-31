import { LOAD_INVOICES, LOAD_STATS, LOAD_USERS, LOAD_USER, CHANGE_MENU_STATUS, SUCCESFUL_USER_CREATED, SETTINGS_UPDATED, FORGOT_PASSWORD_RESET, RESET_PASSWORD } from '../actions/types';

const INITIAL_STATE = {
  invoices : '',
  stats: '',
  users: '',
  user: '',
  menustatus: 'open',
  usercreated: '',
  settings_updated_message: '',
  forgotMessage: '',
  resetMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_INVOICES:
      return { ...state, invoices: action.payload };
      break;
    case LOAD_STATS:
      return { ...state, stats: action.payload };
      break;
    case LOAD_USERS:
      return { ...state, users: action.payload };
      break;
    case LOAD_USER:
      return { ...state, user: action.payload };
      break;
    case CHANGE_MENU_STATUS:
      return { ...state, menustatus: action.payload };
      break;
    case SUCCESFUL_USER_CREATED:
      return { ...state, usercreated: action.payload };
      break;
    case SETTINGS_UPDATED:
      return { ...state, settings_updated_message: action.payload };
      break;
    case FORGOT_PASSWORD_RESET: 
     return { ...state, forgotMessage: action.payload };
    case RESET_PASSWORD:
     return { ...state, resetMessage: action.payload };
    default:
      return state;
  }
}
