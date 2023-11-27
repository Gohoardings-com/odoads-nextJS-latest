import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { addLandlordsApi, getCityApi, getStateApi } from "../../../apis/apis";
import { toast } from 'react-toastify';

const Create_landlord = ({ show, handleClose, allLanlord }) => {
  const formDta = {
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(formDta);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //add landlord
  const handelClick = async (event) => {
    event.preventDefault();
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.phone.length == 10 &&
      formData.address !== "" &&
      formData.state !== "" &&
      formData.city !== "" &&
      formData.zip.length == 6
    ) {
      const value = await addLandlordsApi(formData);
      if (value.message == "landlord Added Successfully") {
        allLanlord();
        toast.success('Added successfully!');
        handleClose();
        setFormData(formDta);
        setIsFormSubmitted(false);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  // Fetch state option
  const stateList = async () => {
    const data = await getStateApi();
    setState(data);
  };

  // Fetch city option
  const CityList = async () => {
    if (formData.state !== "") {
      const datas = await getCityApi(formData.state);
      setCity(datas);
    }
  };

  useEffect(() => {
    stateList();
  }, []);

  useEffect(() => {
    CityList();
  }, [formData.state]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Landlord</Modal.Title>
        </Modal.Header>
        <form onSubmit={handelClick}>
          <ModalBody>
            <div className="filter" style={{ width: "54.5vw" }}>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label">
                    <small className="req text-danger">* </small>
                    Name
                  </label>
                  <div className="form-floating">
                    <input
                      type="text"
                      name="name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`form-control ${
                        isFormSubmitted && formData.name === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && formData.name === "" && (
                      <div className="invalid-feedback">
                        Please enter a Name.
                      </div>
                    )}
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">* </small>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${
                        isFormSubmitted && formData.email === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && formData.email === "" && (
                      <div className="invalid-feedback">
                        Please enter email.
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">* </small>
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control ${
                        isFormSubmitted && formData.phone.length !== 10
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && formData.phone.length !== 10 && (
                      <div className="invalid-feedback">
                        Please enter phone number correctly.
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">* </small>
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`form-control ${
                        isFormSubmitted && formData.address === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && formData.address === "" && (
                      <div className="invalid-feedback">
                        Please enter address.
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">
                        <small className="req text-danger">* </small>
                        State
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formData.state === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {/* Default defaultValue option */}
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && formData.state === "" && (
                          <div className="invalid-feedback">
                            Please select state.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        <small className="req text-danger">* </small>
                        City
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && formData.city === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {city.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && formData.city === "" && (
                          <div className="invalid-feedback">
                            Please select city.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">
                      <small className="req text-danger">* </small>
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`form-control ${
                        isFormSubmitted && formData.zip.length !== 6
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && formData.zip.length !== 6 && (
                      <div className="invalid-feedback">Please enter zip correctly.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" className="btn btn-create float-end">
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <style jsx>
        {`
          hr {
            margin: 0px;
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

export default Create_landlord;
