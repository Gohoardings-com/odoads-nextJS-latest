import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsFillPencilFill } from "react-icons/bs";
import { RiDeleteBin3Fill } from "react-icons/ri";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskDone, setUpdateTaskDone] = useState({});

  //stored input value
  const handleInputChange = (event) => {
    const { value } = event.target;
    setTaskName(value);
  };

  //submit form and create the task
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if taskName is empty
    if (taskName.trim() === "") {
      return; // Return early if taskName is empty
    }

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const newTask = {
      id: task.length + 1,
      name: taskName,
      createDate: currentDate,
      createTime: currentTime,
      done: false,
    };

    setTask([...task, newTask]);
    setTaskName("");
  };

  //delet any perticular task
  const handleDelete = (taskId) => {
    const updatedTasks = task.filter((item) => item.id !== taskId);
    setTask(updatedTasks);
  };

  //stored value for new name
  const handleUpdateInputChange = (event) => {
    const { value } = event.target;
    setUpdateTaskName(value);
  };

  //update any perticular task with new name
  const handleUpdate = (taskId) => {
    const updatedTasks = task.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          name: updateTaskName,
          // createDate: new Date().toLocaleDateString(),
          // createTime: new Date().toLocaleTimeString(),
        };
      }
      return item;
    });

    setTask(updatedTasks);
    setUpdateTaskId(null);
    setUpdateTaskName("");
  };

  //update task status with checkbox
  const handleUpdateCheckboxChange = (taskId) => {
    const updatedTasks = task.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
    setTask(updatedTasks);
  };

  //cancle update
  const handleUpdateCancel = () => {
    setUpdateTaskId(null);
    setUpdateTaskName("");
  };

  //for create modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for update modal
  const [showU, setShowU] = useState(false);
  const handleCloseU = () => setShowU(false);
  const handleShowU = () => setShowU(true);

  return (
    <div className="task-panel">
      <p>
        My To Do Items{" "}
        <span className="float-end">
          <button className="n-btn me-1" onClick={handleShow}>
            New To Do
          </button>
          <button className="n-btn ">View All</button>
        </span>
      </p>
      <hr />

      {task.map((item) => (
        <div key={item.id}>
          <Modal show={showU} onHide={handleCloseU}>
            <Modal.Header closeButton>
              <Modal.Title>Edit todo item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="form-control"
                value={updateTaskName}
                onChange={handleUpdateInputChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseU}>
                Close
              </Button>
              <Button
                className="btn-create"
                type="submit"
                onClick={() => {
                  handleUpdate(item.id);
                  handleCloseU();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <div>
            <span>
              <p className="mb-0">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  checked={item.done} // Updated line
                  onChange={() => handleUpdateCheckboxChange(item.id)}
                  className="me-2"
                />
                {item.name}
                <span className="float-end">
                  <BsFillPencilFill
                    className="n-btn me-2 text-secondary"
                    onClick={() => {
                      setUpdateTaskId(item.id);
                      setUpdateTaskName(item.name);
                      setUpdateTaskDone(item.done);
                      handleShowU();
                    }}
                  />
                  <RiDeleteBin3Fill
                    className="n-btn text-secondary"
                    onClick={() => handleDelete(item.id)}
                  />
                </span>
              </p>

              <p className="text-small">
                {item.createDate} {item.createTime}
              </p>
            </span>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="taskName" className="control-label my-1">
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                className="form-control"
                autoFocus={true}
                value={taskName}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-create" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <style jsx>{`
        .form-control {
          width: 40vw;
        }
        .n-btn {
          border: 0px;
          font-size: smaller;
        }
      `}</style>
    </div>
  );
};

export default Todo;
