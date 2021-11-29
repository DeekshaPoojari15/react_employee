import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SET_LOGOUT } from './actionType';
const data=require('C:/Users/admin/react_workspace/employee/src/data.json')

const setLoginPending = (isLoginPending) => {
	return {
	  type: SET_LOGIN_PENDING,
	  isLoginPending
	};
}
  
const setLoginSuccess = (isLoginSuccess) => {
	return {
	  type: SET_LOGIN_SUCCESS,
	  isLoginSuccess
	};
}
  
const setLoginError = (loginError) => {
	return {
	  type: SET_LOGIN_ERROR,
	  loginError
	}
}
  
function callLoginApi(username, password, callback) {	
	  if (username === data[0].user && password === data[0].pass) {
		return callback(null);
	  } else {
		return callback(new Error('Invalid email and password'));
	  }
}

export const login = (username, password) => {
	return dispatch => {
	  dispatch(setLoginPending(true));
	  dispatch(setLoginSuccess(false));
	  dispatch(setLoginError(null));
  
	  callLoginApi(username, password, error => {
		dispatch(setLoginPending(false));
		if (!error) {
		  dispatch(setLoginSuccess(true));
		} else {
		  dispatch(setLoginError(error));
		}
	  });
	}
}

const setLogout = (isLogoutSuccess) => {
	return {
	  type: SET_LOGOUT,
	  isLogoutSuccess
	}
}

export const logout = () => {
	return dispatch =>{
		dispatch(setLogout(true));
		dispatch(setLoginPending(false));
		dispatch(setLoginSuccess(false));
	  	dispatch(setLoginError(null));
	}
}

