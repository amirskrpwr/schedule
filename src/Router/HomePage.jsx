import React, { Component } from "react";
import Tasks from "../componets/Tasks";

class Home extends Component {
  render() {
    return (
      <div>
        <h3>All The Tasks:</h3>
        <Tasks coloring={true} row={false} edit={false} addTask={false} />
      </div>
    );
  }
}

export default Home;
