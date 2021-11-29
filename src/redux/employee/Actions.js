import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, EDIT_USER } from './actionType'
import { DELETE_USER, ADD_USER } from './actionType'
import axios from 'axios'

const fetchUsersRequest = () => {
	return{
		type: FETCH_USERS_REQUEST
	}
}

const fetchUsersSuccess = (users) => {
	return{
		type: FETCH_USERS_SUCCESS,
		payload:users
	}
}

const fetchUsersFailure = (error) => {
	return{
		type: FETCH_USERS_FAILURE,
		payload: error
	}
}

export const fetchUsers = () => {
	return function(dispatch){
		dispatch(fetchUsersRequest())
		axios.get('http://localhost:9000/employees')
		.then(response => {
			const users = response.data
			dispatch(fetchUsersSuccess(users))
		})
		.catch(error => {
			dispatch(fetchUsersFailure(error.message))
		})
	}
}

const userDelete = () => {
	return{
		type: DELETE_USER
	}
}

export const deleteUser = (id) => {
	return function(dispatch){
		axios.delete(`http://localhost:9000/employees/${id}`)
		.then(response => {
			console.log(response)
			dispatch(userDelete(id))
			dispatch(fetchUsers())
		})
		.catch(error => {
			dispatch(fetchUsersFailure(error.message))
		})
	}
}

const userAdd = () => {
	return{
		type: ADD_USER
	}
}

export const addUser = (user) => {
	return function(dispatch){
		axios.post(`http://localhost:9000/employees`,user)
		.then(response => {
			console.log(response)
			dispatch(userAdd())
			dispatch(fetchUsers())
		})
		.catch(error => {
			dispatch(fetchUsersFailure(error.message))
		})
	}
}

const userEdit = () => {
	return{
		type: EDIT_USER
	}
}

export const editUser = (id,user) => {
	return function(dispatch){
		axios.put(`http://localhost:9000/employees/${id}`,user)
		.then(response => {
			console.log(response)
			dispatch(userEdit())
			dispatch(fetchUsers())
		})
		.catch(error => {
			dispatch(fetchUsersFailure(error.message))
		})
	}
}