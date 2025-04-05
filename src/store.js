// store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  username:localStorage.getItem('username')? localStorage.getItem('username'):"",
  email:localStorage.getItem('email')? localStorage.getItem('email'): "",
  token:'',
  token_expires_in:'',
  type:localStorage.getItem('type'),
  darkTheme:false,
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'EMAIL':
      return {
        ...state,
        email: action.payload     // we can access payload value like this
      };
    case 'TOKEN':
      return{
        ...state,
        token: action.payload
      };
    case 'TOKEN_EXPIRES_IN':
      return{
        ...state,
        token_expires_in: action.payload
      };
      case 'THEME':
        return {
          ...state,
          darkTheme:localStorage.getItem('theme')
        }
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
