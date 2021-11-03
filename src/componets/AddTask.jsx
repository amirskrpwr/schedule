import React, { Component } from "react";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      time: "",
      date: "",
      description: "",
      isDone: null,
      isEnable: null,
    };
  }

  isSuccess = null;
  add = (e) => {
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.name === " " ||
      this.state.time === "" ||
      this.state.date === "" ||
      this.state.description === ""
    ) {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.addTaskHandler(this.state) === 201
      ? (this.isSuccess = false)
      : (this.isSuccess = true);
    this.setState({
      name: "",
      time: "",
      date: "",
      description: "",
      isDone: null,
      isEnable: null,
    });
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("description").value = "";
  };

  render() {
    return (
      <div>
        <h3>Adding A new Task</h3>
        <form onSubmit={this.add} className="form mt-4 mb-4" action="">
          <input
            className="input form-control"
            type="text"
            name="name"
            placeholder="Name..."
            onChange={(e) => this.setState({ name: e.target.value })}
            id="name"
          />
          <div className="row mt-3 mb-3">
            <div className="col-lg-6 col-sm-12 mb-3">
              <input
                className="form-control"
                type="date"
                id="date"
                onChange={(e) => {
                  this.setState({
                    date: e.target.value,
                  });
                }}
                name="date"
              />
            </div>
            <div className="col-lg-6 col-sm-12">
              <input
                className="form-control mb-3"
                type="time"
                onChange={(e) => this.setState({ time: e.target.value })}
                name="time"
                id="time"
              />
            </div>
          </div>
          <textarea
            placeholder="Enter your Description..."
            rows="5"
            style={{ width: "100%" }}
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
            className="form-control mb-3"
            id="description"
          ></textarea>
          <div className="row">
            <div className="col-lg-6 col-sm-12 mb-3">
              <input
                type="submit"
                className="form-control btn btn-success"
                value="Submit"
              />
            </div>
            <div className="col-lg-6 col-sm-12 mb-3">
              <input
                type="reset"
                className="form-control btn btn-danger"
                value="Cancel"
              />
            </div>
          </div>
        </form>
        <div className="container mt-3">
          <div
            className={`alert alert-${
              this.isSuccess ? "success" : "danger"
            } alert-dismissible fade ${
              this.isSuccess !== null ? "show" : "hide"
            }`}
          >
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
            ></button>
            <strong>
              Adding a new Task was {!this.isSuccess ? " not" : null}{" "}
              Successful!
            </strong>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
