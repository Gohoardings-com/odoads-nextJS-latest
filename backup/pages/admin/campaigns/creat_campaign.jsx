import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { creatCampaignApi, getCustomerApi } from "../../../apis/apis";
import { toast } from 'react-toastify';

const Creat_campaign = ({ show, handleClose, getAllCampaign }) => {
  const formData = {
    name: "",
    customer: "",
    start_date: new Date().toISOString().split("T")[0],
    date_finished: new Date().toISOString().split("T")[0],
    status: "",
    purchase_order: "",
    total_price: "",
  };

 

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [posts, setPosts] = useState(formData);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  //create new campaign
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      posts.name !== "" &&
      posts.customer !== "" &&
      posts.start_date !== "" &&
      posts.purchase_order !== "" &&
      posts.total_price !== "" &&
      posts.date_finished !== "" &&
      posts.status !== "" 
    ) {
      const value = await creatCampaignApi(posts);
      if (value.message == "Created") {
        getAllCampaign();
        handleClose();
        toast.success('Campaign created successfully!');
        setPosts(formData);
        setIsFormSubmitted(false);
      }
    }else{
      setIsFormSubmitted(true)
    }
  };
  const allCustomer = async () => {
    const value = await getCustomerApi();
    const uniqueStatusNames = [...new Set(value.map((item) => item.company))];
    setData(uniqueStatusNames);
  };
  useEffect(() => {
    allCustomer();
  }, []);
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Campaign</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row" style={{ width: "55vw" }}>
            <div className="col-lg-12">
              <label className="form-label">
                {" "}
                <small className="req text-danger">* </small>Campaign name
              </label>
              <div className="form-floating">
                <input
                  type="text"
                  name="name"
                  value={posts.name}
                  onChange={handleChange}
                  className={`form-control ${isFormSubmitted && posts.name === ""
                    ? "is-invalid"
                    : ""
                    }`}
                />
                {isFormSubmitted && posts.name === "" && (
                  <div className="invalid-feedback">
                    Please enter a Campaign  Name.
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12">
              <label className="form-label"> <small className="req text-danger">* </small>Purchase Order(PO)</label>
              <div className="form-floating">
                <input
                  type="text"
                  name="purchase_order"
                  value={posts.purchase_order}
                  onChange={handleChange}
                  className={`form-control ${isFormSubmitted && posts.purchase_order === ""
                  ? "is-invalid"
                  : ""
                  }`}
                />
                 {isFormSubmitted && posts.purchase_order === "" && (
                  <div className="invalid-feedback">
                    Please enter Purchase Order.
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {" "}
                <small className="req text-danger">* </small>Coustomer
              </label>
              <div>
                <select
                  className={`select-1 ${isFormSubmitted && posts.customer === ""
                    ? "is-invalid"
                    : ""
                    }`}
                  value={posts.customer}
                  onChange={handleChange}
                  name="customer"
                >
                  <option value=""></option>
                  {data.map((el) => {
                    return <option value={el}>{el}</option>;
                  })}
                </select>
                {isFormSubmitted && posts.customer === "" && (
                  <div className="invalid-feedback">
                    Please select a customer.
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                {" "}
                <small className="req text-danger">* </small>Status
              </label>
              <div>
                <select
                  className={`select-1 ${isFormSubmitted && posts.status === ""
                    ? "is-invalid"
                    : ""
                    }`}
                  value={posts.status}
                  onChange={handleChange}
                  name="status"
                ><option value="" ></option>
                  <option value="New">New</option>
                  <option value="Processing">In Progress</option>
                  <option value="Hold">On Hold</option>
                  <option value="Trashed">Cancelled</option>
                  <option value="Completed">Finished</option>
                  <option value="OPEN">OPEN</option>
                </select>
                {isFormSubmitted && posts.status === "" && (
                  <div className="invalid-feedback">
                    Please select a status.
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <label className="form-label"> <small className="req text-danger">* </small>Start Date</label>
              <div className="form-floating">
                <input
                  type="date"
                  name="start_date"
                  min={new Date().toISOString().split("T")[0]}
                  value={posts.start_date}
                  onChange={handleChange}
                  className={`form-control ${isFormSubmitted && posts.start_date === ""
                    ? "is-invalid"
                    : ""
                    }`}
                />{" "}
                {isFormSubmitted && posts.start_date === "" && (
                  <div className="invalid-feedback">
                    Please select a Start Date.
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <label className="form-label">
                {" "}
                <small className="req text-danger">* </small> End Date
              </label>
              <div className="form-floating">
                <input
                  type="date"
                  min={posts.start_date ? posts.start_date : new Date().toISOString().split("T")[0]}
                  name="date_finished"
                  value={posts.date_finished}
                  onChange={handleChange}
                  className={`form-control ${isFormSubmitted && posts.date_finished === ""
                    ? "is-invalid"
                    : ""
                    }`}
                />
                {isFormSubmitted && posts.date_finished === "" && (
                  <div className="invalid-feedback">
                    Please select a End Date.
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <label className="form-label"> <small className="req text-danger">* </small>Total Price</label>
              <div className="form-floating">
                <input
             
                  name="total_price"
                  onChange={handleChange}
                  type="number"
                  value={posts.total_price}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  className={`form-control ${isFormSubmitted && posts.total_price === ""
                  ? "is-invalid"
                  : ""
                  }`}
                />
                 {isFormSubmitted && posts.total_price === "" && (
                  <div className="invalid-feedback">
                    Please enter total price.
                  </div>
                )}
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

export default Creat_campaign;
