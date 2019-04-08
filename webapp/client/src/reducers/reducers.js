import { LOAD_INVOICES, LOAD_STATS, LOAD_USERS, LOAD_USER, CHANGE_MENU_STATUS, SUCCESFUL_USER_CREATED, SETTINGS_UPDATED, FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_RESET_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR, SETTINGS_UPDATE_ERROR, CREATE_USER_ERROR, MODIFY_USER_ERROR } from '../actions/types';

const INITIAL_STATE = {
  invoices : '',
  stats: '',
  users: '',
  user: '',
  menustatus: 'open',
  usercreated: '',
  userCreateErrorMessage: '',
  userModifyErrorMessage: '',
  settings_updated_message: '',
  settingsUpdateErrorMessage: '',
  forgotMessage: '',
  forgotMessageError: '',
  resetMessage: '',
  resetMessageError: '',
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
    case SETTINGS_UPDATE_ERROR:
     return { ...state, settingsUpdateErrorMessage: action.payload };
    case FORGOT_PASSWORD_RESET: 
     return { ...state, forgotMessage: action.payload };
     case FORGOT_PASSWORD_RESET_ERROR: 
     return { ...state, forgotMessageError: action.payload };
    case RESET_PASSWORD:
     return { ...state, resetMessage: action.payload };
     case RESET_PASSWORD_ERROR:
     return { ...state, resetMessageError: action.payload };
    case CREATE_USER_ERROR:
     return { ...state, userCreateErrorMessage: action.payload };
    case MODIFY_USER_ERROR:
     return { ...state, userModifyErrorMessage: action.payload };
    default:
      return state;
  }
}
