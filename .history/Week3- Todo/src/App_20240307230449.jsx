import { useEffect, useState } from "react"
import "./styles.css"

export default function App(){
  const priority = ["CRITICAL", "Standard", "Flexible"]
  const [newItem, setNewItem] =  useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e){
    e.preventDefault()

    setTodos((currentTodos) => {
      return[
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed: false},
      ]
      
    })
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo =>{
        if (todo.id === id){
          return { ...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
  <form
    onSubmit={handleSubmit}
    className="item-form"
  >
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        type="text"
        id="item"
      />
    </div>
    <button className="btn">Add</button>
    <select className="prioSel"></select>
  </form>
  
  <h1 className="header">ToDo List</h1>
  <u1 className="list">
    {todos.length === 0 && "You have nothing to do!"}
    {todos.map(todo => {
      return (
        <li key={todo.id}>
          <d1>{priority[0]}</d1>
          <label>
            <input type="checkbox" checked={todo.completed}
              onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          
          <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
        </li> 
        
      )
    })}
    
  </u1>
  </>
)
}