import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getRelatedUser, updateTasksApi } from "../../../apis/apis";
import { toast } from "react-toastify";

const Edit_task = ({ show, handleClose, selectRow, getAllTask }) => {
  const [data, setData] = useState(selectRow);
  const [relatedData, setrelatedData] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //edit task
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.startdate !== "" &&
      data.name !== "" &&
      data.duedate !== "" &&
      data.priorities !== "" &&
      data.red_id_name !== "" &&
      data.assign !== "" &&
      data.status !== ""
    ) {
      const datas = await updateTasksApi(data);
      if (datas.message == "Success") {
        getAllTask();
        toast.success("Updated successfully!");
        handleClose();
      }
    } else {
      setIsFormSubmitted(true);
      alert("Please fill all mandatory feild corectly");
    }
  };

  const getUserS = async () => {
    if (data.red_id_name) {
      const user = data.red_id_name;
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
      setData({ ...data, assign: "" }); // Set assign to empty string
    }
  };


  {
    data &&
      useEffect(() => {
        getUserS();
      }, [data.red_id_name]);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        {data && (
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
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small> Start date
                  </label>
                  <div className="form-floating">
                    <input
                      type="date"
                      name="startdate"
                      min={data.startdate}
                      value={data.startdate}
                      onChange={handleChange}
                      className="form-control"
                    />{" "}
                  </div>
                </div>
                <div className="col-lg-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small> Due date
                  </label>
                  <div className="form-floating">
                    <input
                      type="date"
                      name="duedate"
                      min={data.startdate}
                      value={data.duedate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <small className="req text-danger">* </small>
                    Priority
                  </label>
                  <div>
                    <select
                      className="select-1"
                      value={data.priorities}
                      onChange={handleChange}
                      name="priorities"
                    >
                      <option value=""></option>
                      <option value="High">High</option>
                      <option value="Medium">Mid</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    <small className="req text-danger">* </small>
                    Status
                  </label>
                  <div>
                    <select
                      className="select-1"
                      value={data.status}
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
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    <small className="req text-danger">* </small>
                    Related to
                  </label>
                  <div>
                    <select
                      className="select-1"
                      value={data.red_id_name}
                      onChange={handleChange}
                      name="red_id_name"
                    >
                      <option value="campaign">Campaign</option>
                      <option value="invoices">Invoice</option>
                      <option value="customers">Customer</option>
                      <option value="lead">Lead</option>
                      <option value="clientWorkship">Contract</option>
                      <option value="tradeLandload">Traded By</option>
                    </select>
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
                        isFormSubmitted && data.assign === ""
                          ? "is-invalid"
                          : ""
                      }`}
                      value={data.assign}
                      onChange={handleChange}
                      name="assign"
                    >
                    <option value="" disabled></option>;
                      {relatedData.map((el) => {
                        return <option value={el}>{el}</option>;
                      })}
                    </select>
                    {isFormSubmitted && data.assign === "" && (
                      <div className="invalid-feedback">
                        Please select Related specifics.
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <label className="form-label">Task description</label>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={handleChange}
                      value={data.description}
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
        )}
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

export default Edit_task;
