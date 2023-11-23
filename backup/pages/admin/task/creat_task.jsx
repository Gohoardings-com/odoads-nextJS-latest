import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { createTaskApi, getRelatedUser } from "../../../apis/apis";
import { toast } from "react-toastify";

const Creat_task = ({ show, handleClose, getAllTask }) => {
  const formData = {
    subject: "",
    start_date: new Date().toISOString().split("T")[0],
    Due_date: new Date().toISOString().split("T")[0],
    Priority: "",
    status: "New",
    related_to: "",
    task_Description: "",
    assign: "",
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [posts, setData] = useState(formData);
  const [relatedData, setrelatedData] = useState([]);
  const handleChange = (e) => {
    setData({ ...posts, [e.target.name]: e.target.value });
  };

  const getUserS = async () => {
    if (posts.related_to) {
      const user = posts.related_to;
      const value = await getRelatedUser(user);
      let uniqueStatusNames = [];
      switch (user) {
        case "invoices":
          uniqueStatusNames = [
            ...new Set(value.map((item) =>item.number)),
          ];
          break;
        case "customers":
          uniqueStatusNames = [...new Set(value.map((item) => item.company))];
          break;
        case "lead":
          uniqueStatusNames = [...new Set(value.map((item) => item.name))];
          break;
        case "campaign":
          uniqueStatusNames = [...new Set(value.map((item) => item.name))];
          break;
        case "clientWorkship":
          uniqueStatusNames = [...new Set(value.map((item) => item.firstname))];
          break;
        case "tradeLandload":
          uniqueStatusNames = [...new Set(value.map((item) => item.name))];
          break;
        default:
          "Please select any related_to";
          break;
      }
      setrelatedData(uniqueStatusNames);
    }
  };

  useEffect(() => {
    getUserS();
  }, [posts.related_to]);

  //create new  task
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the required fields are not empty
    if (
      posts.start_date !== "" &&
      posts.subject !== "" &&
      posts.Due_date !== "" &&
      posts.Priority !== "" &&
      posts.related_to !== "" &&
      posts.assign !== "" &&
      posts.status !== ""
    ) {
      const value = await createTaskApi(posts);

      if (value.message == "Success") {
        getAllTask();
        toast.success("Created successfully!");
        handleClose();
        setData(formData);
        setIsFormSubmitted(false);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row" style={{ width: "55vw" }}>
              <div className="col-lg-12">
                <label className="form-label">
                  {" "}
                  <small className="req text-danger">* </small>Subject
                </label>
                <div className="form-floating">
                  <input
                    type="text"
                    name="subject"
                    value={posts.subject}
                    onChange={handleChange}
                    className={`form-control ${
                      isFormSubmitted && posts.subject === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && posts.subject === "" && (
                    <div className="invalid-feedback">
                      Please enter subject.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <label className="form-label">
                  {" "}
                  <small className="req text-danger">* </small>Start date
                </label>
                <div className="form-floating">
                  <input
                    type="date"
                    name="start_date"
                    value={posts.start_date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleChange}
                    className={`form-control ${
                      isFormSubmitted && posts.start_date === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && posts.start_date === "" && (
                    <div className="invalid-feedback">
                      Please enter Start date.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <label className="form-label">
                  {" "}
                  <small className="req text-danger">* </small>Due date
                </label>
                <div className="form-floating">
                  <input
                    type="date"
                    name="Due_date"
                    value={posts.Due_date}
                    min={
                      posts.start_date
                        ? posts.start_date
                        : new Date().toISOString().split("T")[0]
                    }
                    onChange={handleChange}
                    className={`form-control ${
                      isFormSubmitted && posts.Due_date === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && posts.Due_date === "" && (
                    <div className="invalid-feedback">
                      Please enter Due date.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <small className="req text-danger">* </small>
                  Priority
                </label>
                <div>
                  <select
                    value={posts.Priority}
                    onChange={handleChange}
                    name="Priority"
                    className={`select-1 ${
                      isFormSubmitted && posts.Priority === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value=""></option>
                    <option value="High">High</option>
                    <option value="Medium">Mid</option>
                    <option value="Low">Low</option>
                  </select>
                  {isFormSubmitted && posts.Priority === "" && (
                    <div className="invalid-feedback">
                      Please select Priority.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <small className="req text-danger">* </small>
                  Status
                </label>
                <div>
                  <select
                    className={`select-1 ${
                      isFormSubmitted && posts.status === "" ? "is-invalid" : ""
                    }`}
                    value={posts.status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value="New">New</option>
                    <option value="Processing">In Progress</option>
                    <option value="Hold">On Hold</option>
                    <option value="Trashed">Cancelled</option>
                    <option value="Completed">Finished</option>
                    <option value="OPEN">OPEN</option>
                  </select>
                  {isFormSubmitted && posts.status === "" && (
                    <div className="invalid-feedback">
                      Please select Status.
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <small className="req text-danger">* </small>
                  Related to
                </label>
                <div>
                  <select
                    className={`select-1 ${
                      isFormSubmitted && posts.related_to === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    value={posts.related_to}
                    onChange={handleChange}
                    name="related_to"
                  >
                    <option value=""></option>
                    <option value="campaign">Campaign</option>
                    <option value="invoices">Invoice</option>
                    <option value="customers">Customer</option>
                    <option value="lead">Lead</option>
                    <option value="clientWorkship">Contract</option>
                    <option value="tradeLandload">Traded By</option>
                  </select>
                  {isFormSubmitted && posts.related_to === "" && (
                    <div className="invalid-feedback">
                      Please select related to.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <small className="req text-danger">* </small>
                  Related specifics
                </label>
                <div>
                  <select
                    className={`select-1 ${
                      isFormSubmitted && posts.assign === "" ? "is-invalid" : ""
                    }`}
                    value={posts.assign}
                    onChange={handleChange}
                    name="assign"
                  >
                    <option value=""></option>
                    {relatedData.map((el) => {
                      return <option value={el}>{el}</option>;
                    })}
                  </select>
                  {isFormSubmitted && posts.assign === "" && (
                    <div className="invalid-feedback">
                      Please select Related specifics.
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-12">
                <label className="form-label">Task Description</label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    name="task_Description"
                    onChange={handleChange}
                    value={posts.task_Description}
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-create" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <style jsx>{`
        .select-1 {
          width: 100%;
          border-radius: 2px;
          height: 34px;
        }
      `}</style>
    </>
  );
};

export default Creat_task;
