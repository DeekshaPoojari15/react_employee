import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_LOGOUT } from './actionType'

const initialState = {
	isLoginSuccess: false,
	isLoginPending: false,
	loginError: null,
	isLogoutSuccess:false
}

export default function Reducer(state = initialState, action) {
	switch (action.type) {
	  case SET_LOGIN_PENDING:
		return Object.assign({}, state, {
		  isLoginPending: action.isLoginPending
		});
  
	  case SET_LOGIN_SUCCESS:
		return Object.assign({}, state, {
		  isLoginSuccess: action.isLoginSuccess
		});
  
	  case SET_LOGIN_ERROR:
		return Object.assign({}, state, {
		  loginError: action.loginError
		});

	case SET_LOGOUT:
		return Object.assign({}, state, {
		  isLogoutSuccess: true
		});
  
	  default:
		return state;
	}
  }