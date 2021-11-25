import api from "../api/tasks";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import { uuid } from "uuidv4";
import AddTask from "./AddTask";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const retrieveTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) setTasks(allTasks);
    };
    getAllTasks();
  }, []);

  const deleteTaskHandler = async (id) => {
    let res = await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
    res.status === 200
      ? console.log("Deleting data is successful")
      : console.log("Deleting data failed.");
  };

  const addTaskHandler = async (task) => {
    const res = await api.post("/tasks", {
      id: uuid(),
      ...task,
    });
    setTasks([...tasks, res.data]);
    res.status === 201
      ? console.log("Adding Task was successful.", res.data)
      : console.log("Adding data failed.");
    return res.status;
  };

  const updateTaskHandler = async (task) => {
    const res = await api.put(`/tasks/${task.id}`, task);
    const id = res.data["id"];
    setTasks(
      tasks.map((task) => {
        return task.id === id ? { ...res.data } : task;
      })
    );
    res.status === 200
      ? console.log("Update was successful.", res.data)
      : console.log("update failed.");
  };

  return (
    <div>
      {!props.addTask ? (
        <div>
          <form className="form pt-5 pb-5">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="Search ..."
              className="form-control"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="row">
            {tasks
              .filter((task) => {
                if (searchTerm == "") {
                  return task;
                } else if (
                  task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return task;
                }
              })
              .map((task) => (
                <div
                  className={`${
                    props.row
                      ? "col-lg-4 col-md-6 col-sm-12"
                      : "col-sm-12 col-md-6"
                  }`}
                >
                  <Task
                    key={task.id}
                    task={task}
                    coloring={props.coloring}
                    deleteTaskHandler={deleteTaskHandler}
                    updateTaskHandler={updateTaskHandler}
                    edit={props.edit}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <AddTask addTaskHandler={addTaskHandler} />
      )}
    </div>
  );
}

export default Tasks;
