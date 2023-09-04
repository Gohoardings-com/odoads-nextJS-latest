import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { toast } from 'react-toastify';
import {
  getCityApi,
  getStateApi,
  updateLandlordsApi,
} from "../../../apis/apis";

const Edit_landlord = ({ show, handleClose, rowData, allLanlord }) => {
  const [formData, setFormData] = useState(rowData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //edit landlord
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
      const value = await updateLandlordsApi(formData);
      if (value.message == "Updated Data") {
        allLanlord();
        toast.success('Updated successfully!');
        handleClose();
      }
    } else {
      alert("Please fill all madatory feild corectly");
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

  {
    formData &&
      useEffect(() => {
        CityList();
      }, [formData.state]);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Landlord</Modal.Title>
        </Modal.Header>
        {formData && (
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
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control "
                      />
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
                        className="form-control"
                      />
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
                        className="form-control"
                      />
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
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">* </small>
                        State
                      </label>
                      <div>
                        <select
                          className="select-1"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          {/* Default defaultValue option */}
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">* </small>
                        City
                      </label>
                      <div>
                        <select
                          className="select-1"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          {city.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
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
                        className="form-control"
                        required
                      />
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
        )}
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

export default Edit_landlord;
