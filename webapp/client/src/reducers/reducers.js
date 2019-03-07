import { LOAD_INVOICES, LOAD_STATS, LOAD_USERS } from '../actions/types';

const INITIAL_STATE = {
  invoices : '',
  stats: '',
  users: ''
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
    default:
      return state;
  }
}
