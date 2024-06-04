import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const savetoLS = (e) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

    savetoLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

    savetoLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

    savetoLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  return (
    <>
      <Navbar />
      <div className=" mx-auto min-h-[87vh] bg-sky-100 my-5 rounded-xl p-5 md:w-1/2 w-[90%]">
        <h1 className='text-center font-bold text-2xl'>iTask - Manage Your Todos at One Place.</h1>
        <div className="addtodo my-5">
          <h1 className='font-bold text-xl my-3'>Add a Todo</h1>
          <div className="flex items-center">
            <input onChange={handleChange} value={todo} type="text" className="w-full rounded-md py-1 px-3" />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-sky-300 hover:bg-sky-400 text-white px-3 py-1 mx-2 font-bold rounded-md disabled:bg-sky-400 '>Save</button>
          </div>
        </div>


        <h1 className='text-xl font-bold'>Your Todos</h1>
        <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] opacity-70 bg-black w-[90%] mt-2 mb-4 mx-auto"></div>

        <div className="todos">
          {
            todos.length === 0 && <div className='m-5'>No Todos to Display !</div>
          }
          {
            todos.map((item) => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-2">
                <div className="flex gap-4">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-sky-300 hover:bg-sky-400 text-white px-3 py-1 mx-1 font-bold rounded-md '> <FaEdit /> </button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-sky-300 hover:bg-sky-400 text-white px-3 py-1 mx-1 font-bold rounded-md '> <MdDelete /> </button>
                </div>

              </div>
            })
          }

        </div>

      </div>
    </>
  )
}

export default App
