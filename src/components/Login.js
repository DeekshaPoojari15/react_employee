import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux'
import { fetchUsers } from '../redux'
import { Redirect } from 'react-router-dom'
import './style.css'
 

class Login extends Component {
    
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            usernameError:false,
            passwordError:false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    usernameBlur=()=>{
        if (!this.state.username.match(/^[a-zA-Z0-9]+$/)) {
            this.setState({usernameError:true})
        }
    }

    passwordBlur=()=>{
        if (!this.state.password.match(/^[a-zA-Z0-9]+$/)) {
            this.setState({passwordError:true})
        }
    }

    handleFocus=()=>{
        this.setState({usernameError:false, passwordError:false})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { username, password}=this.state;
        if(!this.state.usernameError && !this.state.passwordError){
            this.props.login(username, password)
        }
    }

    render() {
        let { isLoginPending, isLoginSuccess, loginError}=this.props;
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                <div className="mycard">
                <form onSubmit={this.handleSubmit} className="box">
                 <h1 className="text-center">LOGIN</h1>
                 <br/>
                    <div className="mb-3">
                        <input className="form-control" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} onBlur={this.usernameBlur} onFocus={this.handleFocus} required/>
                        {this.state.usernameError &&
                            <p className="warning">Username can contain only alphabets and numbers</p>
                        }
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} onBlur={this.passwordBlur} required/>
                        {this.state.passwordError &&
                            <p>Password can contain only alphabets and numbers </p>
                        }
                    </div>
                    <button type="submit" onClick={this.props.fetchUsers}>Submit</button>
                    <div className="message">
                        { isLoginPending && <div>Please wait...</div> }
                        { isLoginSuccess && <Redirect to="/employees" /> }
                        { loginError && <p>{loginError.message}</p> }
                    </div>
                </form>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return{
        isLoginPending: state.login.isLoginPending,
        isLoginSuccess: state.login.isLoginSuccess,
        loginError: state.login.loginError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login : (username, password) => dispatch(login(username, password)),
        fetchUsers:() => dispatch(fetchUsers())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);