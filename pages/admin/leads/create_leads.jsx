import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';
import {
  countryListApi,
  createLeadsApi,
  getCityApi,
  getStateApi,
} from "../../../apis/apis";

const Leadsform = ({
  show,
  handleClose,
  allData,
  uniqueStatusNames,
  uniqueStaffNames,
  uniqueSourceNames,
  additionalFilters,
}) => {
  const formData = {
    status: "Open",
    source: "Chat",
    assigned: "saha enterprise",
    name: "",
    address: "",
    // position: "",
    city: "",
    email: "",
    state: "",
    website: "",
    country: "india",
    phone: "",
    zip: "",
    company: "",
  };

  const [data, setData] = useState(formData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the required fields are not empty
    if (
      data.name !== "" &&
      data.city !== "" &&
      data.email !== "" &&
      data.state !== "" &&
      data.zip.length == 6 &&
      data.phone.length == 10
    ) {
      const createLead = await createLeadsApi(data);

      allData();
      setData(formData);
      toast.success('Lead created successfully!');
      handleClose();

      setIsFormSubmitted(false);
      
    } else {
      setIsFormSubmitted(true);
    }
  };

  // Fetch country option
  const countryList = async () => {
    const data = await countryListApi();
    setCountry(data);
  };
  // Fetch state option
  const stateList = async () => {
    const data = await getStateApi();
    setState(data);
  };
  // Fetch city option
  const CityList = async () => {
    if (data.state !== "") {
      const datas = await getCityApi(data.state);
      setCity(datas);
    }
  };

  useEffect(() => {
    countryList();
    stateList();
  }, []);

  {
    data &&
      useEffect(() => {
        CityList();
      }, [data.state]);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new lead</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="filter">
              <div className="drop-filter">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="control-label">
                    <small className="req text-danger">* </small>Status
                  </label>
                  <div>
                    <select
                      className={`select-1 ${
                        isFormSubmitted && data.status === ""
                          ? "is-invalid"
                          : ""
                      }`}
                      name="status"
                      value={data.status}
                      onChange={handleChange}
                    >
                      <option value="Open">Open</option>
                      {uniqueStatusNames &&
                        uniqueStatusNames.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                    {isFormSubmitted && data.status === "" && (
                      <div className="invalid-feedback">
                        Please select a status.
                      </div>
                    )}
                  </div>
                </div>

                {/* Source */}
                <div className="ms-md-3 me-md-3">
                  <label htmlFor="source" className="control-label">
                    <small className="req text-danger">* </small>Source
                  </label>
                  <div>
                    <select
                      className={`select-1 ${
                        isFormSubmitted && data.source === ""
                          ? "is-invalid"
                          : ""
                      }`}
                      name="source"
                      value={data.source}
                      onChange={handleChange}
                    >
                      <option value="Chat">Chat</option>
                      {uniqueSourceNames &&
                        uniqueSourceNames
                          .filter((option) => option !== "Chat")
                          .map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                    </select>
                    {isFormSubmitted && data.source === "" && (
                      <div className="invalid-feedback">
                        Please select a source.
                      </div>
                    )}
                  </div>
                </div>

                {/* Assigned */}
                <div>
                  <label htmlFor="assigned" className="control-label">
                  <small className="req text-danger">* </small>  Assigned
                  </label>
                  <div>
                    <select
                      className="select-1"
                      name="assigned"
                      value={data.assigned}
                      onChange={handleChange}
                    >
                      {uniqueStaffNames &&
                        uniqueStaffNames.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container-fluid">
                <div className="row my-2">
                  <div className="col-md-6 ps-0">
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name" className="control-label">
                        <small className="req text-danger">* </small>Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.name === ""
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.name === "" && (
                        <div className="invalid-feedback">
                          Please enter a name.
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group" app-field-wrapper="email">
                      <label htmlFor="email" className="control-label">
                      <small className="req text-danger">* </small> Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          isFormSubmitted && data.email === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={data.email}
                        onChange={handleChange}
                      />
                      {isFormSubmitted && data.email === "" && (
                        <div className="invalid-feedback">
                          Please enter an email address.
                        </div>
                      )}
                    </div>
                    {/* Website */}
                    <div className="form-group" app-field-wrapper="website">
                      <label htmlFor="website" className="control-label">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        className="form-control"
                        value={data.website}
                        onChange={handleChange}
                      />
                      
                    </div>
                    {/* Phone */}
                    <div className="form-group" app-field-wrapper="phonenumber">
                      <label htmlFor="phonenumber" className="control-label">
                      <small className="req text-danger">* </small>   Phone
                      </label>
                      <input
                        type="number"
                        id="phonenumber"
                        name="phone"
                        className={`form-control ${
                          isFormSubmitted && data.phone.length !==10
                            ? "is-invalid"
                            : ""
                        }`}
                        value={data.phone}
                        onChange={handleChange}
                      />
                      {isFormSubmitted && data.phone.length !==10 && (
                        <div className="invalid-feedback">
                          Please enter number corectly.
                        </div>
                      )}
                    </div>

                    {/* Company */}
                    <div className="form-group" app-field-wrapper="company">
                      <label htmlFor="company" className="control-label">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-control"
                        value={data.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 pe-0">
                    {/* Address */}
                    <div className="form-group" app-field-wrapper="address">
                      <label htmlFor="address" className="control-label">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        className="form-control "
                        value={data.address}
                        onChange={handleChange}
                      />
                     
                    </div>

                    {/* Country */}
                    <div className="form-group" app-field-wrapper="country">
                      <label htmlFor="country" className="control-label">
                        Country
                      </label>
                      <div className="" style={{ width: "100%" }}>
                        <select
                          id="country"
                          name="country"
                          className={`select-f ${
                            isFormSubmitted && data.country === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          data-width="100%"
                          data-live-search="true"
                          tabIndex="-98"
                          value={data.country}
                          onChange={handleChange}
                          disabled="true"
                        >
                          <option value="India">India</option>
                          {country.map((option, i) => (
                            <option key={i} value={option.short_name}>
                              {option.short_name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && data.country === "" && (
                          <div className="invalid-feedback">
                            Please select a country.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* State */}
                    <div className="form-group" app-field-wrapper="state">
                      <label htmlFor="state" className="control-label">
                      <small className="req text-danger">* </small>State
                      </label>
                      <div className="" style={{ width: "100%" }}>
                        <select
                          id="state"
                          name="state"
                          className={`select-f ${
                            isFormSubmitted && data.state === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          data-width="100%"
                          data-live-search="true"
                          tabIndex="-98"
                          value={data.state}
                          onChange={handleChange}
                   
                        >
                          <option value="" disabled>
                          
                          </option>
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && data.state === "" && (
                          <div className="invalid-feedback">
                            Please select a state.
                          </div>
                        )}
                      </div>
                    </div>

                 
                    <div className="form-group" app-field-wrapper="city">
                      <label htmlFor="city" className="control-label">
                      <small className="req text-danger">* </small>     City
                      </label>
                      <div className="" style={{ width: "100%" }}>
                        <select
                          id="city"
                          name="city"
                          className={`select-f ${
                            isFormSubmitted && data.city === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          data-width="100%"
                          data-live-search="true"
                          tabIndex="-98"
                          value={data.city}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            
                          </option>
                          {city.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && data.city === "" && (
                          <div className="invalid-feedback">
                            Please select a city.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Zip Code */}
                    <div className="form-group" app-field-wrapper="zip">
                      <label htmlFor="zip" className="control-label">
                      <small className="req text-danger">* </small>   Zip Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        className={`form-control ${
                          isFormSubmitted && data.zip.length !==6 ? "is-invalid" : ""
                        }`}
                        value={data.zip}
                        onChange={handleChange}
                      />
                      {isFormSubmitted && data.zip.length !==6 && (
                        <div className="invalid-feedback">
                          Please enter a zip code corectly.
                        </div>
                      )}
                    </div>
                  </div>
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
    </>
  );
};

export default Leadsform;
