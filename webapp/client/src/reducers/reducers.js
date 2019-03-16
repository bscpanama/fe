import { LOAD_INVOICES, LOAD_STATS, LOAD_USERS, CHANGE_MENU_STATUS, SUCCESFUL_USER_CREATED } from '../actions/types';

const INITIAL_STATE = {
  invoices : '',
  stats: '',
  users: '',
  menustatus: 'open',
  usercreated: ''
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
    case CHANGE_MENU_STATUS:
      return { ...state, menustatus: action.payload };
      break;
    case SUCCESFUL_USER_CREATED:
      return { ...state, usercreated: action.payload };
      break;
    default:
      return state;
  }
}
