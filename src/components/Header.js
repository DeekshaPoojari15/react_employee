import React from 'react'
import logo from './logo.png'
import './style.css'
import { connect } from 'react-redux'
import { logout } from '../redux/'
import { Redirect } from 'react-router-dom'

function Header(props) {
    return(
        <div> 
        <nav className="navbar-expand-lg navbar-dark bg-dark">
        <div style={{display:'inline-flex',paddingTop:"10px", paddingBottom:"6px"}}>
        <img src={logo} alt="logo" height="60px" width="60px" />
        <h1  style={{fontSize:"50px",verticalAlign:"middle", color:"#ffc107",paddingLeft:"20px" }}>Employee Portal</h1>
        <button className="btn btn-link" style={{position:'absolute',top:"25px",right:"20px" }} onClick={props.logout} >Logout</button>
        {props.isLogoutSuccess &&  <Redirect to="/" />  } 
        </div>
        
        </nav>
        </div>
    )
}

const mapStateToProps = state => {
	return{
        isLogoutSuccess: state.login.isLogoutSuccess
	}
}

const mapDispatchToProps = dispatch => {
	return {
	   logout:() => dispatch(logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

