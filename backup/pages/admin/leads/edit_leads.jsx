import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  countryListApi,
  getCityApi,
  getStateApi,
  updateLeadsApi,
} from "../../../apis/apis";

const Editleads = ({
  show,
  handleClose,
  allData,
  selectRow,
  uniqueStatusNames,
  uniqueStaffNames,
  uniqueSourceNames,
}) => {
  const [data, setData] = useState(selectRow);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.name !== "" &&
      data.city !== "" &&
      data.email !== "" &&
      data.state !== "" &&
      data.zip.length == 6 &&
      data.phonenumber.length == 10
    ) {
      const update = await updateLeadsApi(data);
      if (update.message === "Lead Update Successfully") {
        handleClose();
        toast.success("Lead updated successfully!");
        allData();
      }
    } else {
      alert("please fill all madetory feild corectly");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit lead</Modal.Title>
        </Modal.Header>
        {data && (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="filter">
                <div className="drop-filter">
                  <div>
                    <label htmlFor="status" className="control-label">
                      <small className="req text-danger">* </small>Status
                    </label>

                    <div>
                      <select
                        className="select-1"
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                      >
                        <option value={selectRow.status} defaultValue>
                          {selectRow.status}
                        </option>{" "}
                        {/* Default defaultValue option */}
                        {uniqueStatusNames.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="ms-md-3 me-md-3">
                    <label htmlFor="status" className="control-label">
                      <small className="req text-danger">* </small>Source
                    </label>
                    <div>
                      <select
                        className="select-1"
                        name="source"
                        value={data.source}
                        onChange={handleChange}
                      >
                        <option value={selectRow.assignfirst} defaultValue>
                          {selectRow.assignfirst}
                        </option>
                        {uniqueSourceNames.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="status" className="control-label">
                      <small className="req text-danger">* </small> Assigned
                    </label>
                    <div>
                      <select
                        className="select-1"
                        name="assigned"
                        value={data.assigned}
                        onChange={handleChange}
                      >
                        <option
                          value={selectRow.assignfirst}
                          disabled
                          defaultValue
                        >
                          {selectRow.assignfirst}
                        </option>
                        {uniqueStaffNames.map((option, i) => (
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
                      <div className="form-group">
                        <label htmlFor="name" className="control-label">
                          <small className="req text-danger">* </small>Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group" app-field-wrapper="email">
                        <label htmlFor="email" className="control-label">
                          <small className="req text-danger">* </small> Email
                          Address
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>
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
                      <div
                        className="form-group"
                        app-field-wrapper="phonenumber"
                      >
                        <label htmlFor="phonenumber" className="control-label">
                          <small className="req text-danger">* </small> Phone
                        </label>
                        <input
                          type="text"
                          id="phonenumber"
                          name="phonenumber"
                          className="form-control"
                          value={data.phonenumber}
                          onChange={handleChange}
                        />
                      </div>
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
                      <div className="form-group" app-field-wrapper="address">
                        <label htmlFor="address" className="control-label">
                          Address
                        </label>
                        <input
                          id="address"
                          name="address"
                          className="form-control"
                          value={data.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group" app-field-wrapper="country">
                        <label htmlFor="country" className="control-label">
                          Country
                        </label>
                        <div className="" style={{ width: "100%" }}>
                          <select
                            id="country"
                            name="country"
                            className="select-f"
                            data-width="100%"
                            disabled={true}
                            value={data.country}
                            onChange={handleChange}
                          >
                            {/* <option value="India" defaultValue="India">
                              India
                            </option> */}
                            {country
                              // .filter((option) => option.short_name !== "India")
                              .map((option, i) => (
                                <option key={i} value={option.short_name}>
                                  {option.short_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group" app-field-wrapper="state">
                        <label htmlFor="state" className="control-label">
                          <small className="req text-danger">* </small> State
                        </label>
                        <div className="" style={{ width: "100%" }}>
                          <select
                            id="state"
                            name="state"
                            className="select-f"
                            tabIndex="-98"
                            value={data.state}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Not defaultValue
                            </option>
                            {state.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group" app-field-wrapper="city">
                        <label htmlFor="city" className="control-label">
                          <small className="req text-danger">* </small> City
                        </label>
                        <div className="" style={{ width: "100%" }}>
                          <select
                            id="city"
                            name="city"
                            className="select-f"
                            data-none-defaultValue-text="Nothing defaultValue"
                            data-width="100%"
                            data-live-search="true"
                            tabIndex="-98"
                            value={data.city}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Not defaultValue
                            </option>
                            {city.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group" app-field-wrapper="zip">
                        <label htmlFor="zip" className="control-label">
                          <small className="req text-danger">* </small> Zip Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          className="form-control"
                          value={data.zip}
                          onChange={handleChange}
                        />
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
        )}
      </Modal>
    </>
  );
};

export default Editleads;
