import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'
import { deleteUser } from '../redux'
import './style.css'
import ReactPaginate  from 'react-paginate';
import Header from './Header';
import CreateNew from './CreateNew';
import Edit from './Edit'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PER_PAGE = 8;

function First(props){
  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete?")){
      props.deleteUser(id)
      toast.warning("Employee deleted !!!")
    }
  }
    
  const offset = currentPage * PER_PAGE;    
  const pageCount = Math.ceil(props.users.length / PER_PAGE);

	return(
		<div> 
      <Header />
      <div className="container-fluid">
      <CreateNew />
      <table className="table table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">NAME</th>
            <th scope="col">AGE</th>
            <th scope="col">SALARY</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {props.users.slice(offset, offset + PER_PAGE).map(emp => 
            <tr key={emp.id} >
              <td>{emp.eid}</td>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>{emp.salary}</td>
              <td><div style={{display:'inline-flex'}}> <Edit pid={emp.id}/>
              <button className="btn btn-danger" onClick={()=>{handleDelete(emp.id)}}>Delete</button> </div></td>
            </tr>
          )}
        </tbody>
      </table>
  <ToastContainer />
  <div className="float-end mypaginate">
      <ReactPaginate
        previousLabel={"←Previous"}
        nextLabel={"Next→"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
    </div>
		</div>
	)
}

const mapStateToProps = state => {
	return{
		loading:state.employee.loading,
	    users:state.employee.users,
	    error:state.employee.error, 
      delete:state.employee.delete
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers : () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(First);