import { Component } from "react";
import Navbar from "./componets/Navbar";
import HomePage from "./Router/HomePage";
import CreateTaskPage from "./Router/CreateTaskPage";
import EditTaskPage from "./Router/EditTaskPage";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container" style={{ marginTop: "70px" }}>
            <div className="mt-3 mb-3">
              <Switch>
                <Route key="1" path="/" exact component={HomePage} />{" "}
                <Route key="2" path="/create-task" component={CreateTaskPage} />{" "}
                <Route key="3" path="/Edit-task" component={EditTaskPage} />{" "}
              </Switch>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </Router>
    );
  }
}

export default App;
