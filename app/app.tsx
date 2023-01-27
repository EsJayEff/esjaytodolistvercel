"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";


async function getDate() {
let ts = Date.now();
let date_ob = new Date(ts);
let date:number = date_ob.getDate();
let month:number = date_ob.getMonth() + 1;
let year:number = date_ob.getFullYear();
let hour:number =date_ob.getHours();
let min:number =date_ob.getMinutes();
let sec:number =date_ob.getSeconds();
let nowDate= `[${date}-${month}-${year}]`;
return nowDate;
}

async function addTodo(toDo, newTask, setToDo, setNewTask) {
  if (newTask) {
    let num = toDo.length + 1;
    let dateNow=await getDate();
    let newEntry = { id: num, title: newTask, status: false, dateAsOf:dateNow };
    setToDo([...toDo, newEntry]);
    setNewTask("");
  }
}

async function deleteTask(toDo, id, setToDo) {
  let newTasks = toDo.filter((task) => task.id !== id);
  setToDo(newTasks);
}

async function markDone(toDo, id, setToDo) {
  let dateNow=await getDate();
  let newTask = toDo.map((task) => {
    if (task.id === id) {
      return { ...task, status: !task.status,dateAsOf:dateNow };
    }
    return task;
  });
  setToDo(newTask);
}

async function updateTask(toDo, updateData, setToDo, setUpdateData) {
  let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData];
  setToDo(updatedObject);
  setUpdateData("");
}

async function changeTask(e, setUpdateData, updateData) {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false,
    dateAsOf: await getDate(),
  };
  setUpdateData(newEntry);
}

async function cancelUpdate(setUpdateData) {
  setUpdateData("");
}

async function SetUpdateData(id,title,status,setUpdateData)
{
  let newEntry={
  id: id,
  title: title,
  status: status ? true : false,
}
setUpdateData(newEntry);
};

function CatchTitle(updateData)
{
let newEntry=updateData.title;
return newEntry;
};


export default function DisplayToDos() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  

  return (
    <div>
      {/*Update Task*/}
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                maxLength={30}
                onChange={(e) => changeTask(e, setUpdateData, updateData)}
                value={updateData && CatchTitle(updateData)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={async () =>
                  await updateTask(toDo, updateData, setToDo, setUpdateData)
                }
                className="btn btn-lg btn-success mr-20"
              >
                Update
              </button>
              <button
                onClick={async () => await cancelUpdate(setUpdateData)}
                className="btn btn-lg btn-warning"
              >
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* // Add Task ////////////////////////////////*/}
          <div className="row">
            <div className="col">
              <input maxLength={30}
              placeholder="Add your todo here ...."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={async () => {
                  await addTodo(toDo, newTask, setToDo, setNewTask);
                }}
                className="btn btn-lg btn-success"
              >
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Display toDos //////////////////////////////// */}
      {toDo && toDo.length ? "" : "No Tasks ....."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <div className="col tskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}  <br/>Date : {task.dateAsOf} </span>
                                  
                </div>
                <div className="iconWrap">
                  <span
                    title="Completed / Not Completed"
                    onClick={(e) => markDone(toDo, task.id, setToDo)}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? null : (
                    <span
                      title="Edit"
                      onClick={() =>
                        SetUpdateData(task.id,task.title,task.status,setUpdateData)}
                      >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span
                    title="Delete"
                    onClick={async () =>
                      await deleteTask(toDo, task.id, setToDo)
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
}
