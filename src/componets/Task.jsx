import moment from "moment";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

function Task(props) {
  const [task, setTask] = useState(props.task);

  useEffect(() => {
    var d = new Date();
    var today = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    );

    var mydate = new Date(task.date + " " + task.time);
    if (task.isEnable !== today < mydate) {
      setTask((task.isEnable = today < mydate));
      props.updateTaskHandler(task);
    }
  }, []);

  const timeLeft = () => {
    var today = new Date();
    var mydate = new Date(task.date + " " + task.time);

    const sign = mydate - today > 0 ? 1 : -1;

    const startDate = moment(today);
    const timeEnd = moment(mydate);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);

    const years = Math.abs(diffDuration.years());
    const months = Math.abs(diffDuration.months());
    const days = Math.abs(diffDuration.days());
    const hours = Math.abs(diffDuration.hours());
    const minutes = Math.abs(diffDuration.minutes());

    var difDate =
      (years > 0 ? years + " year(s), " : "") +
      (months > 0 ? months + " month(s), " : "") +
      (days > 0 ? days + " day(s), " : "") +
      (hours > 0 ? hours + " hour(s), " : "") +
      (minutes > 0 ? minutes + " minute(s) " : "") +
      (sign > 0
        ? "of the time remained."
        : "from the delivering time have passed.");

    const output = (
      <div class="container mt-5">
        <div
          class={`alert alert-${
            sign > 0 ? "success" : "danger"
          } alert-dismissible fade show`}
        >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <strong>{sign > 0 ? "You have time!" : "Your Time is over!"}</strong>
          <br />
          {difDate}
        </div>
      </div>
    );

    return output;
  };

  return (
    <div className="mb-4">
      <div className="card">
        <h3
          style={{
            height: "50px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className={`card-header text-center ${
            props.coloring
              ? props.task.isEnable
                ? "bg-success"
                : "bg-danger"
              : null
          }`}
        >
          {props.task.name}
        </h3>
        <div className="card-body">
          <p>
            <b>Date & Time: </b>
            {props.task.date} , {props.task.time}
            <br />
          </p>
          <p>
            <b>This Task is {task.isDone ? "not " : null} Done.</b>
          </p>
          <p
            style={{
              height: "30px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <b>Description: </b>
            {props.task.description}
          </p>
          {!props.coloring ? (
            <p>
              <b>
                This Task is {!props.task.isEnable ? "not" : null} Enable
                {!props.task.isEnable ? " any more" : null}.
              </b>
            </p>
          ) : null}
          {props.edit ? (
            <div>
              <Modal
                key={"check " + task.id}
                type="Edit"
                task={props.task}
                updateTaskHandler={props.updateTaskHandler}
              />
              <Modal
                type="Delete"
                task={props.task}
                deleteTaskHandler={props.deleteTaskHandler}
              />
            </div>
          ) : (
            <Modal
              type="View"
              timeLeft={timeLeft}
              task={props.task}
              updateTaskHandler={props.updateTaskHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
