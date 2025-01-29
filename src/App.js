import { useState } from "react";
import "./App.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editTimeValue, setEditTimeValue] = useState("");

  function inputHandler(e) {
    setInputValue(e.target.value);
  }

  function timeHandler(e) {
    setTimeValue(e.target.value);
  }

  function addHandler() {
    if (inputValue.trim() === "" || timeValue === "") return; // Prevent adding empty tasks
    setTodoList([...todoList, { text: inputValue, time: timeValue, completed: false }]);
    setInputValue("");
    setTimeValue("");
  }

  function deleteHandler(index) {
    setTodoList(todoList.filter((_, i) => i !== index));
  }

  function editHandler(index) {
    setEditIndex(index);
    setEditValue(todoList[index].text);
    setEditTimeValue(todoList[index].time);
  }

  function saveHandler(index) {
    const updatedList = [...todoList];
    updatedList[index].text = editValue;
    updatedList[index].time = editTimeValue;
    setTodoList(updatedList);
    setEditIndex(null);
    setEditValue("");
    setEditTimeValue("");
  }

  function editInputHandler(e) {
    setEditValue(e.target.value);
  }

  function editTimeHandler(e) {
    setEditTimeValue(e.target.value);
  }

  function completeHandler(index) {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
  }

  return (
    <div className="container-fluid p-5 form-control">
      <h4 className="text-center pb-3 text-decoration-underline text-white fs-2">Task Management App</h4>
      <label className="ms-5 text-white fs-3">Enter Activity:</label>
      <input type="text" onChange={inputHandler} value={inputValue} className="col-4 ms-2" />
      <input type="time" onChange={timeHandler} value={timeValue} className="col-2 ms-2"/>
      <button onClick={addHandler} className="btn btn-primary ms-2">Add</button>
      <ol>
        {
          todoList.map((item, index) => {
            if (editIndex === index) {
              return (
                <li key={index} className="mt-2 form-control d-flex align-items-center">
                  <input type="text" value={editValue} onChange={editInputHandler} className="me-2"/>
                  <input type="time" value={editTimeValue} onChange={editTimeHandler} className="me-2"/>
                  <button onClick={() => saveHandler(index)} className="btn btn-success">Save</button>
                </li>
              );
            } else {
              return (
                <li key={index} className={`mt-2 form-control d-flex justify-content-between align-items-center ${item.completed ? "text-decoration-line-through" : ""}`}>
                  <span>{item.text} <span className="text-muted ms-3">({item.time})</span></span>
                  <div>
                    <button onClick={() => completeHandler(index)} className="btn btn-secondary ms-2">{item.completed ? "Undo" : "Complete"}</button>
                    <button onClick={() => editHandler(index)} className="btn btn-warning ms-2">Edit</button>
                    <button onClick={() => deleteHandler(index)} className="btn btn-danger ms-2">Delete</button>
                  </div>
                </li>
              );
            }
          })
        }
      </ol>
    </div>
  );
}
