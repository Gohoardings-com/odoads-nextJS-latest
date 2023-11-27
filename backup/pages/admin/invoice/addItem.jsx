import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { alltaxApi } from "@/apis/apis";

const AddItem = ({
  showadd,
  handleCloseadd,
  onFormSubmit,
  transferAdditem,
}) => {
  const [posts, setPosts] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getData = {
    Description: "",
    long_description: "",
    rate: "",
    tax: "IGST(18%)",
    unit: "inch",
    item_group: "",
    total:0,
  };

  const [FormData, setFormData] = useState(getData);
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
    transferAdditem(FormData);
  };

  const allTax = async () => {
    const data = await alltaxApi();
    setPosts(data);
  };

  useEffect(() => {
    allTax();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const TableData = {
      Item: FormData.item_group,
      Description: FormData.Description,
      Rate: FormData.rate,
      Tax: FormData.tax,
      unit: FormData.unit,
      longDescription: FormData.long_description,
      total: parseFloat(FormData.rate) * parseFloat(FormData.item_group),
    };

    if (
      TableData.Item !== "" &&
      TableData.Description !== "" &&
      TableData.Rate !== "" &&
      TableData.Tax !== "" &&
      TableData.unit !== ""
    ) {
      onFormSubmit(TableData);
      setFormData(getData);
      handleCloseadd();
      setIsFormSubmitted(false);
    } else {
      setIsFormSubmitted(true);
    }
  };
  return (
    <>
      <Modal show={showadd} onHide={handleCloseadd}>
        <Modal.Header>
          <Modal.Title>ADD ITEM</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter " style={{ width: "55.5vw" }}>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label">
                    <small className="req text-danger">*</small>Item Name
                  </label>
                  <input
                    type="text"
                    name="Description"
                    value={FormData.Description}
                    onChange={handleChange}
                    className={`form-control ${
                      isFormSubmitted && FormData.Description === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && FormData.Description === "" && (
                    <div className="invalid-feedback">
                      Please write description.
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <label className="form-label">Description</label>
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
                    className={`form-control ${
                      isFormSubmitted && FormData.rate === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && FormData.rate === "" && (
                    <div className="invalid-feedback">Please write rate.</div>
                  )}
                </div>
                {/* <div className="col-md-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">*</small>Gst
                  </label>
                  <select
                    className={`select-1 ${
                      isFormSubmitted && FormData.tax === "" ? "is-invalid" : ""
                    }`}
                    name="tax"
                    value={FormData.tax}
                    onChange={handleChange}
                  
                  >
                    <option value="">18%</option>
                    {posts.map((el) => (
                      <option value={el.taxname}>{el.taxname}</option>
                    ))}
                  </select>
                  {isFormSubmitted && FormData.tax === "" && (
                    <div className="invalid-feedback">Please select tax.</div>
                  )}
                </div> */}
                <div className="col-md-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">*</small>Quantity
                  </label>
                  <input
                    value={FormData.item_group}
                    onChange={handleChange}
                    type="number"
                    name="item_group"
                    className={`form-control ${
                      isFormSubmitted && FormData.item_group === ""
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  {isFormSubmitted && FormData.item_group === "" && (
                    <div className="invalid-feedback">
                      Please write item group.
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    {" "}
                    <small className="req text-danger">*</small>Measuring units
                  </label>
                  <select
                    className={`select-1 ${
                      isFormSubmitted && FormData.unit === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    name="unit"
                    value={FormData.unit}
                    onChange={handleChange}
                  >
                    <option value="inch">Inch</option>
                    <option value="feet">Feet</option>
                    <option value="meter">Meter</option>
                  </select>
                  {isFormSubmitted && FormData.unit === "" && (
                    <div className="invalid-feedback">Please select unit.</div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-create float-end"
              variant="primary"
              type="submit"
            >
              Save
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
          .select-1 {
            width: 100%;
            border-radius: 2px;
            height: 34px;
          }
        `}
      </style>
    </>
  );
};

export default AddItem;
