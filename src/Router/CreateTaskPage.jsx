import React from "react";
import Tasks from "../componets/Tasks";

function CreateTask() {
  return (
    <div>
      <Tasks coloring={false} row={false} edit={false} addTask={true} />
    </div>
  );
}

export default CreateTask;
