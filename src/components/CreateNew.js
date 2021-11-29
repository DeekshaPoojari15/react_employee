import React, { Component } from 'react'
import  ReactModal from 'react-modal'
import { addUser, fetchUsers } from '../redux/'
import { connect } from 'react-redux'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateNew extends Component{
  constructor () {
    super();
    this.state = {
      eid:'',
      name:'',
      age:'',
      salary:'',
      showModal: false,
        eidError:'',
        nameError:'',
        ageError:'',
        salaryError:''
      
    }
  }
  
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

 eidBlur = () => {
  if (!this.state.eid.match(/^[a-zA-Z0-9]+$/)) {
    this.setState({eidError:true})
  }
 }

 

  submitHandler = (e) => {
    let user={eid:this.state.eid, name:this.state.name, age:this.state.age, salary:this.state.salary}
    console.log(user)
    this.props.addUser(user)
    this.setState({ showModal: false })
    toast.info("New Employee created!!")
  }
  
  render () {
    return (
      <div>
        
        <button className="btn btn-success btn-lg float-end mybutton" onClick={this.handleOpenModal}>New Employee</button>
        <ReactModal 
           isOpen={this.state.showModal}
           ariaHideApp={false}
           style={{background:"black"}}
        >
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <form onSubmit={this.submitHandler}>
        <br/>
        <h1 className="text-center">Create New Employee</h1> 
        <br/>
        <br/>
        <div  className="mb-3">
        <label className="form-label" >Employee ID </label>
        <input type="text" className="form-control" name="eid" value={this.state.eid} onChange={this.changeHandler} onBlur={this.eidBlur}  required/>
        {this.state.eidError &&
          <p className="warning mywarning">Employee ID can contain only alphabets and numbers.</p>
        }
        </div>
        <div  className="mb-3">
        <label className="form-label" >Name </label>
        <input className="form-control" name="name" value={this.state.name} onChange={this.changeHandler} required/>
        {this.state.nameError &&
          <p className="warning mywarning">Name can contain only alphabets.</p>
        }
        </div>
        <div  className="mb-3">
        <label className="form-label" >Age </label>
        <input className="form-control" name="age" value={this.state.age} onChange={this.changeHandler} required/>
        {this.state.ageError &&
          <p className="warning mywarning">Age can contain only numbers.</p>
        }
        </div>
        <div  className="mb-3">
        <label className="form-label" >Salary </label>
        <input className="form-control" name="salary" value={this.state.salary} onChange={this.changeHandler} required/>
        {this.state.salaryError &&
          <p className="warning mywarning">Salary can contain only numbers</p>
        }
        </div>       

        <div className="row">
        <div className="col-md-4 mt-6">
        </div>
        <div  className="col-md-2 ">
        <br/>
        <br/>
        <button className="btn btn-primary" type="submit">Create</button>
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


const mapDispatchToProps = dispatch => {
	return {
		addUser:(user) => dispatch(addUser(user)),
    fetchUsers:() => dispatch(fetchUsers())
	}
}

export default connect(null, mapDispatchToProps)(CreateNew);

