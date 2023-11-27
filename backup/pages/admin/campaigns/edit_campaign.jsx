import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getCustomerApi, updateCampaignApi } from "../../../apis/apis";
import { toast } from 'react-toastify';

const Edit_campaign = ({ show, handleClose, getAllCampaign, selectRow }) => {
  const [posts, setPosts] = useState(selectRow);
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  //edit campaign
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      posts.name !== "" &&
      posts.customer !== "" &&
      posts.start_date !== "" &&
      posts.purchase_order !== "" &&
      posts.project_cost !== "" &&
      posts.date_finished !== "" &&
      posts.status !== ""
    ) {
      const value = await updateCampaignApi(posts);
      if (value.message == "Updated") {
        getAllCampaign();
        toast.success('Campaign updated successfully!');
        handleClose();
      }
    } else {
      alert("Please field all mandatory field corectly")
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
          <Modal.Title>Edit Campaign</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {posts && (
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
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small>Purchase
                    Order(PO)
                  </label>
                  <div className="form-floating">
                    <input
                      type="text"
                      name="purchase_order"
                      value={posts.purchase_order}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small>Coustomer
                  </label>
                  <div>
                    <select
                      className="select-1"
                      value={posts.customer}
                      onChange={handleChange}
                      name="customer"
                    >
                      {" "}
                      <option value={posts.customer}>{posts.customer}</option>
                      {data.map((el) => {
                        return <option value={el}>{el}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small>Status
                  </label>
                  <div>
                    <select
                      className="select-1"
                      value={posts.status}
                      onChange={handleChange}
                      name="status"
                    >
                      <option value={posts.status}>{posts.status}</option>
                      <option value="New">New</option>
                      <option value="Processing">In Progress</option>
                      <option value="Hold">On Hold</option>
                      <option value="Trashed">Cancelled</option>
                      <option value="Completed">Finished</option>
                      <option value="OPEN">OPEN</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small>Start Date
                  </label>
                  <div className="form-floating">
                    <input
                      type="date"
                      name="start_date"
                      min={posts.start_date.split(" ")[0]}
                      value={posts.start_date.split(" ")[0]}
                      onChange={handleChange}
                      className="form-control"
                    />{" "}
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
                      min={posts.start_date.split(" ")[0]}
                      name="date_finished"
                      value={posts.date_finished.split(" ")[0]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">* </small>Total Price
                  </label>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="project_cost"
                      onChange={handleChange}
                      type="number"
                      value={posts.project_cost}
                      id="exampleFormControlTextarea1"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}
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

export default Edit_campaign;
