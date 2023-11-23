import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { alltaxApi, editItemInvoice } from "@/apis/apis";

const EditItem = ({ showe, handleClosee, singleItem, allData }) => {
  const [posts, setPosts] = useState([]);

  const [FormData, setFormData] = useState(singleItem);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const allTax = async () => {
    const data = await alltaxApi();
    setPosts(data);
  };

  useEffect(() => {
    allTax();
  }, []);

  //update invoice item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await editItemInvoice(FormData);
    if (data.message == "Success") {
      handleClosee();
      allData();
    }
  };
  return (
    <>
      <Modal show={showe} onHide={handleClosee}>
        <Modal.Header closeButton>
          <Modal.Title>ADD ITEM</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter " style={{ width: "55.5vw" }}>
              {FormData && (
                <div className="row">
                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">*</small>Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={FormData.description}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Long Description</label>
                    <div className="form-floating">
                      <textarea
                        className="form-control ddd"
                        name="long_description"
                        value={FormData.long_description}
                        onChange={handleChange}
                        placeholder="Adress here...."
                        id="floatingTextarea"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">*</small> Rate - INR
                      (Base Currency)
                    </label>
                    <input
                      type="number"
                      name="rate"
                      value={FormData.rate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
              
                  <div className="col-md-6">
                    <label className="form-label">Quantity</label>
                    <input
                      value={FormData.qty}
                      onChange={handleChange}
                      type="number"
                      name="qty"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Unit</label>
                    <select
                      className="form-select form-control"
                      name="unit"
                      value={FormData.unit}
                      onChange={handleChange}
                    >
                      <option value="feet">Feet</option>{" "}
                      <option value="inche">Inche</option>{" "}
                      <option value="meter">Meter</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-create float-end"
              variant="primary"
              type="submit"
            >
              Update Item
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <style jsx>
        {`
          .same_p {
            font-size: 11px;
            color: #b5afaf;
          }
          .ddd {
            height: 80px !important ;
          }
        `}
      </style>
    </>
  );
};

export default EditItem;
