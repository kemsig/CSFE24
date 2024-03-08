import { useEffect, useState } from "react"
import "./styles.css"

export default function App(){
  const priority = ["CRITICAL", "STANDARD", "flexible"]
  const [selectedPrio, setSelectedPrio] = useState("");
  const [newItem, setNewItem] =  useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    // Sort todos based on priority
    const sortedTodos = [...todos].sort((a, b) => {
      return priority.indexOf(a.priority) - priority.indexOf(b.priority);
    });
    setTodos(sortedTodos);

    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e){
    e.preventDefault()

    setTodos((currentTodos) => {
      return[
        ...currentTodos,
        {id: crypto.randomUUID(), title: newItem, completed: false, priority: selectedPrio},
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

  const handlePrioChange = (event) => {
    setSelectedPrio(event.target.value)
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
    <select value={selectedPrio} onChange={handlePrioChange}>
      <option value={priority[2]}>{priority[2]}</option>
      <option value={priority[1]}>{priority[1]}</option>
      <option value={priority[0]}>{priority[0]}</option>
    </select>
    <button className="btn">Add</button>
  </form>
  
  <h1 className="header">ToDo List</h1>
  <u1 className="list">
    {todos.length === 0 && "You have nothing to do!"}
    {todos.map(todo => {
      return (
        <li key={todo.id}>
          <d1>{todo.priority}</d1>
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