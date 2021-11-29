import React, { Component } from 'react'
import  ReactModal from 'react-modal'
import { editUser, fetchUsers } from '../redux'
import { connect } from 'react-redux'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class  Edit extends Component{
  constructor (props) {
    super(props);
    this.state = {
        id:'',
      eid:'',
      name:'',
      age:'',
      salary:'',
      showModal: false
    }
  }
  
  handleOpenModal = () => {
    this.props.fetchUsers()
    const user=this.props.users.filter((obj) => obj.id=== this.props.pid);
    this.setState({ showModal: true, id:user[0].id, eid:user[0].eid, name:user[0].name, age:user[0].age, salary:user[0].salary  });
    console.log(this.state)
    console.log(user[0].name)
    console.log(user[0].age)
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  colorChange = (color) => {
    this.setState({ color: color.hex })
  };

  submitHandler = () => {
    let user={id:this.state.id, eid:this.state.eid, name:this.state.name, age:this.state.age, salary:this.state.salary}
    console.log(user)
    this.props.editUser(this.state.id,user)
    this.setState({ showModal: false })
    toast.success("Employee Modified!!!")
  }
  
  render () {
    
    return (
      <div>
        <button className="btn btn-primary" style={{marginRight:"40px",paddingLeft:"25px", paddingRight:"25px"}} onClick={this.handleOpenModal}>Edit</button>
        <ReactModal 
          isOpen={this.state.showModal}
          ariaHideApp={false}
        >        
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <form onSubmit={this.submitHandler}>
        <br/>
        <h1 className="text-center">Edit Employee</h1> 
        <br/>
        <br/>
        <div  className="mb-3">
        <label className="form-label" >Employee ID </label>
        <input type="text" className="form-control" name="eid" value={this.state.eid} onChange={this.changeHandler} disabled />
        </div>
        <div  className="mb-3">
        <label className="form-label" >Name </label>
        <input className="form-control" name="name" value={this.state.name} onChange={this.changeHandler} required/>
        </div>
        <div  className="mb-3">
        <label className="form-label" >Age </label>
        <input className="form-control" name="age" value={this.state.age} onChange={this.changeHandler} required/>
        </div>
        <div  className="mb-3">
        <label className="form-label" >Salary </label>
        <input className="form-control" name="salary" value={this.state.salary} onChange={this.changeHandler} required/>
        </div>       

        <div className="row">
        <div className="col-md-4 mt-6">
        </div>
        <div  className="col-md-2">
        <br/>
        <br/>
        <button className="btn btn-primary" type="submit" style={{paddingLeft:"20px", paddingRight:"20px"}}>Edit</button>
        </div>
        <div  className="col-md-1">
        <br/>
        <br/>
        <button className="btn btn-danger" onClick={this.handleCloseModal}>Close</button>
        </div>
        </div>
        </form>
        </div>
        </div>
        </div>
        </ReactModal>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
	return{
		users:state.employee.users
	}
}

const mapDispatchToProps = dispatch => {
	return {
	editUser:(id,user) => dispatch(editUser(id,user)),
    fetchUsers:() => dispatch(fetchUsers())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

