import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {
  const initialValues = {
    task : "",
    priority : ""
  }
  const [response, setResponse] = useState()
  const [allTodos, setAllTodos] = useState([])
  const [modelData, setModelData] = useState(initialValues)
  const [todo , setTodo] = useState(initialValues)

  const addTodo = async ()=>{
     try {
       const {data} = await axios.post("http://localhost:5000/todo/add-todo" , todo) 
       console.log(data)
       setResponse(data.message)
     } catch (error) {
       console.log(error);
     }
  }
  const getAllTodos = async ()=>{
    try {
      const {data} = await axios.get(`http://localhost:5000/todo`) 
      setAllTodos(data.result)
      setResponse("Data Fetched Success fully")
    } catch (error) {
      setResponse("Somthing went Wrong " ,  error.message)
    }
  }
  const handleDelte =  async(id)=>{
         try {
          const {data} = await axios.delete(`http://localhost:5000/todo/destroy/${id}`)
          setResponse(data.message)
         } catch (error) {
            setResponse("Somthing Went wrong while Delete" , error.message)
         }
  }
  const handleUpdate = async ()=>{
     try {
       const {data} = await axios.put(`http://localhost:5000/todo/modity/${modelData._id}` , modelData)
       setResponse(data.message)
     } catch (error) {
       console.log("somthing went wrong ");
     }
  }
  useEffect(() => {getAllTodos()}, [response])
  // console.log(allTodos);

  return <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            {
              response && <div class="alert alert-primary">
               {response}
              </div>
            }
            <div className="card">
              <div className="card-header">Todo</div>
              <div className="card-body">
                <div>
                  <label for="task" className="form-label">First task</label>
                  <input
                  value={todo.task}
                  onChange={e=>setTodo({...todo, task : e.target.value})}
                    type="text"
                    className="form-control"
                    id="task"
                    placeholder="Enter Your task"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Please add task.</div>
                </div>
                <div className="mt-2">
                  <label for="priority"> Priority</label>
                  <select 
                   value={todo.priority}
                   onChange={e=>setTodo({...todo, priority : e.target.value})}
                  className="form-select" id="priority">
                    <option selected>Select Priority</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <button onClick={addTodo} type="button" className="btn btn-primary w-100 mt-3">
                  Add Todo
                </button>
              </div>
            </div>


           {
            allTodos.map(item=> <div className="card mt-4" key={item._id}>
            <div
              className="card-header d-flex justify-content-between"
              data-bs-toggle="collapse"
              data-bs-target="#task1"
            >
              {item.task && item.task}
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-warning"
                  data-bs-target="#editModal"
                  data-bs-toggle="modal"
                  onClick={e=>setModelData(item)}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  // data-bs-target="#deleteModal"
                  // data-bs-toggle="modal"
                  onClick={e=>handleDelte(item._id)}
                >
                  delete
                </button>
              </div>
            </div>
            <div className="collapse" id="task1">
              <div className="card-body">task 1 description</div>
            </div>
          </div>)
           }
          </div>
        </div>
      </div>
      <div className="modal fade" id="editModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModal">Edit Todo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label for="mtask" className="form-label">First task</label>
                <input
       value={modelData.task}
       onChange={e=>setModelData({...modelData, task : e.target.value})}

                  type="text"
                  className="form-control"
                  id="mtask"
                  placeholder="Enter Your task" 
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please add task.</div>
              </div>
              <div className="mt-2">
                <label for="mpriority"> Priority</label>
                <select
                       value={modelData.priority}
                       onChange={e=>setModelData({...modelData, priority : e.target.value})}
                className="form-select" id="mpriority">
                  <option selected>Select Priority</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <button onClick={handleUpdate} type="button" className="btn btn-primary w-100 mt-3">
                Update Todo
              </button>
              <button
                type="button"
                className="btn mt-2 w-100 btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="deleteModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">
                Are you sure you want delete this todo ?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-danger">
              <p className="text-center text-muted mb-5">
                You can delete this todo at any time. If you change your mind, you
                might not be able to recover it
              </p>
              <div className="btn-group w-100">
                <button type="button" className="btn btn-outline-danger">Yes</button>
                <button type="button" className="btn btn-success">NO</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </>
}

export default App