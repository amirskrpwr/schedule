import React, { Component } from "react";

class Modal extends Component {
  state = {
    id: this.props.task.id,
    name: this.props.task.name,
    time: this.props.task.time,
    date: this.props.task.date,
    description: this.props.task.description,
    isDone: this.props.task.isDone,
    isEnable: this.props.task.isEnable,
  };

  reset = () => {
    this.setState({
      id: this.props.task.id,
      name: this.props.task.name,
      time: this.props.task.time,
      date: this.props.task.date,
      description: this.props.task.description,
      isDone: this.props.task.isDone,
      isEnable: !this.props.task.isEnable,
    });
  };

  update = (e) => {
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
    this.props.updateTaskHandler(this.state);
  };

  render() {
    return (
      <div>
        <button
          style={{ marginRight: "5px" }}
          className={`float-start mr-2 btn btn-${
            this.props.type !== "View"
              ? this.props.type === "Delete"
                ? "danger"
                : "primary"
              : "outline-warning"
          }`}
          data-bs-toggle="modal"
          data-bs-target={"#myModal" + this.props.type + this.state.id}
        >
          {this.props.type} task
        </button>

        <div
          className="modal fade"
          id={"myModal" + this.props.type + this.props.task.id}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.props.type} task</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body p-2">
                <div className="border p-2 rounded">
                  {this.props.type === "Delete" ? (
                    <form action="">
                      <h3>Are you sure?</h3>
                      <div className="row p-3">
                        <button
                          type="submit"
                          onClick={() =>
                            this.props.deleteTaskHandler(this.props.task.id)
                          }
                          data-bs-dismiss="modal"
                          className="btn btn-primary col-6"
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-secondary col-6"
                          data-bs-dismiss="modal"
                        >
                          No
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      {this.props.type === "Edit" ? (
                        <form id="updateForm" action="">
                          <input
                            type="text"
                            className="form-control input"
                            name="name"
                            placeholder="Name..."
                            defaultValue={this.state.name}
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />
                          <div className="row pt-3 pb-3">
                            <div className="col-6">
                              <input
                                className="input form-control"
                                type="date"
                                name="date"
                                defaultValue={this.state.date}
                                id=""
                                onChange={(e) =>
                                  this.setState({ date: e.target.value })
                                }
                              />
                            </div>
                            <div className="col-6">
                              <input
                                className="input form-control"
                                type="time"
                                name="time"
                                defaultValue={this.state.time}
                                id=""
                                onChange={(e) =>
                                  this.setState({ time: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div class="form-check mb-2">
                            <label class="form-check-label">Done </label>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="check1"
                              name="option1"
                              checked={this.state.isDone}
                              onChange={() =>
                                this.setState({ isDone: this.state.isDone })
                              }
                            />
                          </div>
                          <textarea
                            name="description"
                            className="form-control"
                            placeholder="Description..."
                            id="description"
                            rows="5"
                            style={{ width: "100%" }}
                            defaultValue={this.state.description}
                            onChange={(e) =>
                              this.setState({ description: e.target.value })
                            }
                          ></textarea>
                        </form>
                      ) : (
                        <div>
                          <p>
                            <div className="row">
                              <div className="col-4">
                                <b>Name:</b>
                              </div>
                              <div className="col-8">
                                {this.props.task.name}
                              </div>
                            </div>
                          </p>
                          <p>
                            <div className="row">
                              <div className="col-4">
                                <b>Date & Time: </b>
                              </div>
                              <div className="col-8">
                                {this.props.task.date} , {this.props.task.time}
                              </div>
                            </div>
                          </p>
                          <p>
                            <div className="row">
                              <div className="col-4">
                                <b>Is this Done? </b>
                              </div>
                              <div className="col-8">
                                <div class="form-check mb-2">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="check1"
                                    name="option1"
                                    defaultChecked={!this.state.isDone}
                                    onChange={() => {
                                      this.setState({
                                        isDone: !this.state.isDone,
                                      });
                                      this.props.updateTaskHandler(this.state);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </p>
                          <p>
                            <div className="row">
                              <div className="col-4">
                                <b>Description: </b>
                              </div>
                              <div className="col-8">
                                {this.props.task.description}
                              </div>
                            </div>
                          </p>
                          <p>{this.props.timeLeft()}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {this.props.type === "Edit" ? (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={this.reset}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={this.update}
                    className="btn btn-success"
                  >
                    Save
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
