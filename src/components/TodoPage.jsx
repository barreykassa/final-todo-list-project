import React, { useState, useEffect } from "react";
import "./todo.css";
import { AiFillDelete } from "react-icons/ai";
import { AiFillCheckSquare } from "react-icons/ai";
import { MdSystemUpdateAlt } from "react-icons/md";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [update, setUpdate] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [todoLineThrough, setTodoLineThrough] = useState([]);

  const toogleVHandler = (i) => {
    const updatedTodoLineThrough = [...todoLineThrough];
    updatedTodoLineThrough[i] = !updatedTodoLineThrough[i];
    setTodoLineThrough(updatedTodoLineThrough);
  };

  const onchange = (e) => {
    setNewTodo(e.target.value);
  };
  const addHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]);
  };
  const updateHandler = (i) => {
    setUpdate(i);
    setNewTodo(todos[i]);
  };
  const saveTodo = (i) => {
    const updatedTodos = [...todos];
    updatedTodos[i] = newTodo;
    setTodos(updatedTodos);
    setUpdate(null);
    setNewTodo("");
  };
  const deleteHandler = (i) => {
    todos.splice(i, 1);
    setTodos([...todos]);
  };
  return (
    <div>
      <div className="todo-container">
        <h1>What's the Plan for Today?</h1>
        <form action="" className="form-container" onSubmit={addHandler}>
          <input type="text" onChange={onchange} value={newTodo} />
          <button type="submit">Add New Task</button>
        </form>
      </div>
      <div>
        <div className="todosIcons-container">
          {todos.map((todo, i) => {
            return (
              <div key={i} className="todos-container">
                <div
                  style={{
                    textDecoration: todoLineThrough[i] ? "line-through" : "",
                  }}
                  className='divIpt'
                >
                  <p>{todo}</p>
                  <input type="checkbox"></input>
                </div>
                <ul className="icons-container">
                  <li>
                    <AiFillCheckSquare id="check-icon" onClick={() => toogleVHandler(i)} />
                  </li>

                  <li onClick={() => updateHandler(i)}>
                    <MdSystemUpdateAlt  id="update-icon"/>
                  </li>
                  <li onClick={() => deleteHandler(i)}>
                    <AiFillDelete id="delete-icon" />
                  </li>
                </ul>
                {update === i ? (
                  <form onSubmit={() => saveTodo(i)}>
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit">save</button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
