import React from "react";
import Tasks from "./Tasks";

function EditTask() {
  return (
    <div>
      <h3>Edit Tasks:</h3>
      <Tasks coloring={false} row={true} edit={true} />
    </div>
  );
}

export default EditTask;
