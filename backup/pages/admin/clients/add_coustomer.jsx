import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import {
  addClientApi,
  countryListApi,
  getCityApi,
  getStateApi,
} from "../../../apis/apis";

const Add_customer = ({ show, handleClose, getData }) => {
  const data = {
    company_name: "",
    customer_city: "",
    customer_state: "",
    phone: "",
    pan: "",
    zip: "",
    website: "",
    address: "",
    billing_street: "",
    billing_city: "",
    billing_state: "",
    billing_zip: "",
    billing_country: "",
    shiping_street: "",
    shiping_city: "",
    shiping_state: "",
    shiping_zip: "",
    shiping_country: "",
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [customerVisible, setCostomervisible] = useState(true);
  const [billingVisible, setBillingvisible] = useState(false);
  const [FormData, setFormData] = useState(data);
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
    if (FormData.customer_state !== "") {
      const datas = await getCityApi(FormData.customer_state);
      setCity(datas);
    }
    if (FormData.billing_state !== "") {
      const billingCityData = await getCityApi(FormData.billing_state);
      setBillingCity(billingCityData);
    }

    if (FormData.shiping_state !== "") {
      const shippingCityData = await getCityApi(FormData.shiping_state);
      setShippingCity(shippingCityData);
    }
  };

  useEffect(() => {
    countryList();
    stateList();
  }, []);

  useEffect(() => {
    CityList();
  }, [FormData.customer_state, FormData.billing_state, FormData.shiping_state]);

  //create coustomer
  const save_data = async (event) => {
    event.preventDefault();

    if (
      FormData.company_name !== "" &&
      FormData.customer_city !== "" &&
      FormData.customer_state !== "" &&
      FormData.phone.length == 10 &&
      FormData.pan !== "" &&
      FormData.zip.length == 6 &&
      FormData.address !== "" &&
      FormData.billing_street !== "" &&
      FormData.billing_city !== "" &&
      FormData.billing_state !== "" &&
      FormData.billing_zip.length == 6 &&
      FormData.shiping_street !== "" &&
      FormData.shiping_city !== "" &&
      FormData.shiping_state !== "" &&
      FormData.shiping_zip.length == 6
    ) {
      // All required fields are filled, proceed with saving data
      const response = await addClientApi(FormData);
      if (response.message === "Customer Added Successfully") {
        getData();
        setFormData(response);
        handleClose();
        setState([])
        setIsFormSubmitted(false);
        setCostomervisible(false);
        setCostomervisible(false);
        toast.success('Coustomer created successfully!');
      }
    } else {
      setIsFormSubmitted(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coustomer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="filter" style={{ width: "55vw" }}>
            {customerVisible && (
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <form className="modal_form">
                    <div className="row g-3">
                      <div className="col-md-12">
                        <label className="form-label">  <small className="req text-danger">* </small> Company Name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            isFormSubmitted && FormData.company_name === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={FormData.company_name}
                          name="company_name"
                          onChange={handleChange}
                        />
                        {isFormSubmitted && FormData.company_name === "" && (
                          <div className="invalid-feedback">
                            Please enter a Company Name.
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">  <small className="req text-danger">* </small> State</label>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && FormData.customer_state === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          aria-label="Default select example"
                          onChange={handleChange}
                          name="customer_state"
                          value={FormData.customer_state}
                        >
                          <option value="" disabled>
                          
                          </option>
                          {/* Default defaultValue option */}
                          {state.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.customer_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Customer State.
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">  <small className="req text-danger">* </small> City</label>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && FormData.customer_city === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          aria-label="Default select example"
                          onChange={handleChange}
                          name="customer_city"
                          value={FormData.customer_city}
                        >
                          <option value="" disabled>
                           
                          </option>
                          {/* Default defaultValue option */}
                          {city.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.customer_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Customer City.
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">  <small className="req text-danger">* </small> Phone</label>
                        <input
                          type="number"
                          className={`form-control ${
                            isFormSubmitted && FormData.phone.length !== 10
                              ? "is-invalid"
                              : ""
                          }`}
                          value={FormData.phone}
                          name="phone"
                          onChange={handleChange}
                        />
                        {isFormSubmitted && FormData.phone.length !== 10 && (
                          <div className="invalid-feedback">
                            Please enter number corectly.
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">  <small className="req text-danger">* </small> PAN</label>
                        <input
                          type="text"
                          className={`form-control ${
                            isFormSubmitted && FormData.pan === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={FormData.pan}
                          name="pan"
                          onChange={handleChange}
                        />
                        {isFormSubmitted && FormData.pan === "" && (
                          <div className="invalid-feedback">
                            Please enter a pan.
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">  <small className="req text-danger">* </small> Zip</label>
                        <input
                          type="number"
                          className={`form-control ${
                            isFormSubmitted && FormData.zip.length !== 6
                              ? "is-invalid"
                              : ""
                          }`}
                          value={FormData.zip}
                          name="zip"
                          onChange={handleChange}
                        />
                        {isFormSubmitted && FormData.zip.length !== 6 && (
                          <div className="invalid-feedback">
                            Please enter a zip corectly.
                          </div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">  Website</label>
                        <input
                          type="text"
                          className="form-control"
                          value={FormData.website}
                          name="website"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">  <small className="req text-danger">* </small> Addres</label>
                        <div className="form-floating">
                          <textarea
                            value={FormData.address}
                            className={`form-control ${
                              isFormSubmitted && FormData.address === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Adress here...."
                            name="address"
                            onChange={handleChange}
                          ></textarea>
                          {isFormSubmitted && FormData.address === "" && (
                            <div className="invalid-feedback">
                              Please enter a address.
                            </div>
                          )}
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
                      <label className="form-label">  <small className="req text-danger">* </small> Street</label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ${
                            isFormSubmitted && FormData.billing_street === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="billing_street"
                          value={FormData.billing_street}
                          onChange={handleChange}
                          placeholder="Adress here...."
                          id="floatingTextarea"
                        ></textarea>
                        {isFormSubmitted && FormData.billing_street === "" && (
                          <div className="invalid-feedback">
                            Please enter a Billing Street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> State</label>

                      <div>
                        <select
                          name="billing_state"
                          value={FormData.billing_state}
                          className={`select-1 ${
                            isFormSubmitted && FormData.billing_state === ""
                              ? "is-invalid"
                              : ""
                          }`}
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
                        {isFormSubmitted && FormData.billing_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Billing State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> City</label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && FormData.billing_city === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="billing_city"
                          value={FormData.billing_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            
                          </option>
                          {billingCity.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.billing_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Billing City.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> Zip Code</label>
                      <input
                        type="number"
                        name="billing_zip"
                        value={FormData.billing_zip}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && FormData.billing_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && FormData.billing_zip.length !== 6 && (
                        <div className="invalid-feedback">
                          Please enter a Billing Zip corectly.
                        </div>
                      )}
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
                      <label className="form-label">  <small className="req text-danger">* </small> Street</label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ${
                            isFormSubmitted && FormData.shiping_street === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="shiping_street"
                          value={FormData.shiping_street}
                          onChange={handleChange}
                          placeholder="Adress here...."
                          id="floatingTextarea"
                        ></textarea>
                        {isFormSubmitted && FormData.shiping_street === "" && (
                          <div className="invalid-feedback">
                            Please enter a Shiping Street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> State</label>

                      <div>
                        <select
                          name="shiping_state"
                          value={FormData.shiping_state}
                          className={`select-1 ${
                            isFormSubmitted && FormData.shiping_state === ""
                              ? "is-invalid"
                              : ""
                          }`}
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
                        {isFormSubmitted && FormData.shiping_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> City</label>
                      <div>
                        <select
                          className={`select-1 ${
                            isFormSubmitted && FormData.shiping_city === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="shiping_city"
                          value={FormData.shiping_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            
                          </option>
                          {shippingCity.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.shiping_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping City.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">  <small className="req text-danger">* </small> Zip Code</label>
                      <input
                        type="number"
                        name="shiping_zip"
                        value={FormData.shiping_zip}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && FormData.shiping_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && FormData.shiping_zip.length !== 6 && (
                        <div className="invalid-feedback">
                          Please enter a Shiping Zip corectly.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                onClick={save_data}
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

export default Add_customer;
