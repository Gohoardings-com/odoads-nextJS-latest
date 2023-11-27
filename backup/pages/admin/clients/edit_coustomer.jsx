import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import {
  countryListApi,
  getCityApi,
  getStateApi,
  updateCustomer,
} from "../../../apis/apis";

const Edit_customer = ({ show, handleClose, selectRow, getData }) => {
  const [customerVisible, setCostomervisible] = useState(true);
  const [billingVisible, setBillingvisible] = useState(false);
  const [FormData, setFormData] = useState(selectRow);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [billingCity, setBillingCity] = useState([]);
  const [shippingCity, setShippingCity] = useState([]);

  const style = { fontSize: "20px", marginRight: "4px" };

  const TobillingPage = () => {
    setCostomervisible(!customerVisible);
    setBillingvisible(!billingVisible);
  };
  const backCustomer = () => {
    setCostomervisible(!customerVisible);
    setBillingvisible(!billingVisible);
  };
  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
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
    if (FormData.state !== "") {
      const datas = await getCityApi(FormData.state);
      setCity(datas);
    }
    if (FormData.billing_state !== "") {
      const billingCityData = await getCityApi(FormData.billing_state);
      setBillingCity(billingCityData);
    }

    if (FormData.shiping_state !== "") {
      const shippingCityData = await getCityApi(FormData.shipping_state);
      setShippingCity(shippingCityData);
    }
  };

  useEffect(() => {
    countryList();
    stateList();
  }, []);

  {
    FormData &&
      useEffect(() => {
        CityList();
      }, [FormData.state, FormData.billing_state, FormData.shipping_state]);
  }

  const Edit_coustomer = async () => {
    if (
      FormData.company !== "" &&
      FormData.city !== "" &&
      FormData.state !== "" &&
      FormData.phonenumber.length  == 10 &&
      FormData.pan !== "" &&
      FormData.zip.length  == 6 &&
      FormData.address !== "" &&
      FormData.billing_street !== "" &&
      FormData.billing_city !== "" &&
      FormData.billing_state !== "" &&
      FormData.billing_zip.length  == 6 &&
      FormData.shipping_street !== "" &&
      FormData.shipping_city !== "" &&
      FormData.shipping_state !== "" &&
      FormData.shipping_zip.length == 6
    ) {
      const data = await updateCustomer(FormData);
      if (data.message == "Customer Updated Successfully") {
        handleClose();
        getData();
        setCostomervisible(false);
        setCostomervisible(false);
        toast.success('Coustomer updated successfully!');
      }
    } else {
      alert("Please fill all mandatory feild corectly");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coustomer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {FormData && (
            <div className="filter" style={{ width: "55vw" }}>
              {customerVisible && (
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <form className="modal_form">
                      <div className="row g-3">
                        <div className="col-md-12">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small>{" "}
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={FormData.company}
                            name="company"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> State
                          </label>
                          <select
                            className="select-1"
                            aria-label="Default select example"
                            onChange={handleChange}
                            name="state"
                            value={FormData.state}
                          >
                            <option value="" disabled>
                              Not selected
                            </option>
                            {/* Default defaultValue option */}
                            {state.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> City
                          </label>
                          <select
                            className="select-1"
                            aria-label="Default select example"
                            onChange={handleChange}
                            name="city"
                            value={FormData.city}
                          >
                            <option value={FormData.city} disabled>
                              {FormData.city}
                            </option>
                            {/* Default defaultValue option */}
                            {city.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> Phone
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={FormData.phonenumber}
                            name="phonenumber"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> PAN
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={FormData.vat}
                            name="vat"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> Zip
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={FormData.zip}
                            name="zip"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label"> Website</label>
                          <input
                            type="text"
                            className="form-control"
                            value={FormData.website}
                            name="website"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">
                            {" "}
                            <small className="req text-danger">* </small> Addres
                          </label>
                          <div className="form-floating">
                            <textarea
                              value={FormData.address}
                              className="form-control"
                              placeholder="Adress here...."
                              name="address"
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {billingVisible && (
                <div className="row">
                  <h5 className="profile_h5">Billing & Shipping</h5>
                  <hr />
                  <div className="col-lg-6 mt-2">
                    <div className="row">
                      <p>
                        {" "}
                        <BsFillQuestionCircleFill style={style} />
                        Billing Address
                      </p>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">
                          {" "}
                          <small className="req text-danger">* </small> Street
                        </label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            name="billing_street"
                            value={FormData.billing_street}
                            onChange={handleChange}
                            placeholder="Adress here...."
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <label className="form-label">
                          {" "}
                          <small className="req text-danger">* </small> State
                        </label>

                        <div>
                          <select
                            name="billing_state"
                            value={FormData.billing_state}
                            className="select-1"
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Not selected
                            </option>
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
                          {" "}
                          <small className="req text-danger">* </small> City
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="billing_city"
                            value={FormData.billing_city}
                            onChange={handleChange}
                          >
                            {billingCity.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">
                          {" "}
                          <small className="req text-danger">* </small> Zip Code
                        </label>
                        <input
                          type="number"
                          name="billing_zip"
                          value={FormData.billing_zip}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <div className="row">
                      <div className="col-lg-6">
                        <p>
                          <BsFillQuestionCircleFill style={style} />
                          Shipping Address
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">
                          {" "}
                          <small className="req text-danger">* </small> Street
                        </label>
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            name="shipping_street"
                            value={FormData.shipping_street}
                            onChange={handleChange}
                            placeholder="Adress here...."
                            id="floatingTextarea"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">
                          {" "}
                          <small className="req text-danger">* </small> State
                        </label>
                        <div>
                          <select
                            name="shipping_state"
                            value={FormData.shipping_state}
                            className="select-1"
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Not selected
                            </option>
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
                          {" "}
                          <small className="req text-danger">* </small> City
                        </label>
                        <div>
                          <select
                            className="select-1"
                            name="shipping_city"
                            value={FormData.shipping_city}
                            onChange={handleChange}
                          >
                            {shippingCity.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">
                          <small className="req text-danger">* </small> Zip Code
                        </label>
                        <input
                          type="number"
                          name="shipping_zip"
                          value={FormData.shipping_zip}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {customerVisible && (
            <Button
              variant="light"
              onClick={TobillingPage}
              className="btn btn-create float-right"
            >
              Next
            </Button>
          )}
          {billingVisible && (
            <>
              <Button
                variant="light"
                onClick={backCustomer}
                className="btn btn-create float-right"
              >
                Previous
              </Button>
              <Button
                className=" btn-create float-right"
                type="submit"
                onClick={Edit_coustomer}
              >
                Save
              </Button>
            </>
          )}
        </Modal.Footer>
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

export default Edit_customer;
