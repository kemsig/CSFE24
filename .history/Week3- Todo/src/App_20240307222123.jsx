import { useState } from "react"
import "./styles.css"

export default function App(){
  const [newItem, setNewItem] =  useState("")

  return (
  <>
  <form className="item-form">
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
  </form>
  
  <h1 className="header">ToDo List</h1>
  <u1 className="list">
    <li>
      <label>
        <input type="checkbox"/>
        Item 1
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
  </u1>
  </>
)
}