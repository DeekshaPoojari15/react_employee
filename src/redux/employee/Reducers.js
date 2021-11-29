import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, EDIT_USER} from './actionType'
import { DELETE_USER, ADD_USER } from './actionType'

const initialState ={
	loading:false,
	users:[],
	error:'',
	delete:false
}

const Reducers = (state = initialState, action) => {
	switch(action.type){
		case FETCH_USERS_REQUEST: return {
			...state,
			loading: true
		}
		case FETCH_USERS_SUCCESS: return {
			...state,
			loading: false,
			users: action.payload,
			error: ''
		}
		case FETCH_USERS_FAILURE: return {
			...state,
			loading: false,
			users: [],
			error: action.payload
		}
		case DELETE_USER: return {
			...state,
			loading: false,
			delete:true
		}
		case ADD_USER: return {
			...state,
			loading: false
		}
		case EDIT_USER: return {
			...state,
			loading: false
		}
		default: return state
	}
}

export default Reducers;
