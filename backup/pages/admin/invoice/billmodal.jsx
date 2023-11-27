import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody, ModalFooter } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { getCityApi, getStateApi } from "../../../apis/apis";

const BillModal = ({
  showbill,
  handleClosebill,
  onTransferData,
  allAddress,
}) => {
  const [state, setState] = useState([]);
  const [billingCity, setBillingCity] = useState([]);
  const [shippingCity, setShippingCity] = useState([]);
  // Extract only the desired fields
  const {
    billing_street,
    billing_city,
    billing_state,
    billing_zip,
    shipping_street,
    shipping_city,
    shipping_state,
    shipping_zip,
  } = allAddress || {};

  const newObject = {
    billing_street,
    billing_city,
    billing_state,
    billing_zip,
    shipping_street,
    shipping_city,
    shipping_state,
    shipping_zip,
  };
  const [FormData, setFormData] = useState(newObject);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
    onTransferData(FormData);
  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      FormData.billing_street !== "" &&
      FormData.billing_city !== "" &&
      FormData.billing_state !== "" &&
      FormData.shipping_zip.length == 6 &&
      FormData.billing_zip.length == 6 &&
      FormData.shipping_city !== "" &&
      FormData.shipping_state !== "" &&
      FormData.shipping_street !== ""
    ) {
      onTransferData(FormData);
      handleClosebill();
    } else {
      setIsFormSubmitted(true);
    }
  };

  const stateList = async () => {
    const data = await getStateApi();
    setState(data);
  };

  // Fetch city option
  const CityList = async () => {
    if (FormData.customer_state !== "") {
      const datas = await getCityApi(FormData.customer_state);
      if (FormData.billing_state !== "") {
        const billingCityData = await getCityApi(FormData.billing_state);
        setBillingCity(billingCityData);
      }

      if (FormData.shipping_state !== "") {
        const shippingCityData = await getCityApi(FormData.shipping_state);
        setShippingCity(shippingCityData);
      }
    }
  };

  useEffect(() => {
    stateList();
  }, []);

  useEffect(() => {
    CityList();
  }, [FormData.billing_state, FormData.shipping_state]);

  return (
    <>
      <Modal show={showbill} onHide={handleClosebill}>
        <Modal.Header>
          <Modal.Title>Billing & Shipping Address</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="filter " style={{ width: "55.5vw" }}>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        <BsFillQuestionCircleFill className="icon" />
                        Billing Address
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Street
                      </label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ddd ${
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
                            Please write billing street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>State
                      </label>

                      <div>
                        <select
                          name="billing_state"
                          value={FormData.billing_state}
                          className={`select-1 ${
                            FormData.billing_state === "" ? "is-invalid" : ""
                          }`}
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
                        {isFormSubmitted && FormData.billing_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Billing State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>City
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            FormData.billing_city === "" ? "is-invalid" : ""
                          }`}
                          name="billing_city"
                          value={FormData.billing_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
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
                      <label className="form-label">
                        <small className="req text-danger">*</small>Zip Code
                      </label>
                      <input
                        type="number"
                        name="billing_zip"
                        value={FormData.billing_zip}
                        onChange={handleChange}
                        className={`form-control  ${
                          isFormSubmitted && FormData.billing_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && FormData.billing_zip.length !== 6 && (
                        <div className="invalid-feedback">
                          Please write billing zip corectly.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        <BsFillQuestionCircleFill className="icon" />
                        Shipping Address
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Street
                      </label>
                      <div className="form-floating">
                        <textarea
                          className={`form-control ddd ${
                            isFormSubmitted && FormData.shipping_street === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="shipping_street"
                          value={FormData.shipping_street}
                          onChange={handleChange}
                          placeholder="Adress here...."
                          id="floatingTextarea"
                        ></textarea>
                        {isFormSubmitted && FormData.shipping_street === "" && (
                          <div className="invalid-feedback">
                            Please write shiping street.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>State
                      </label>

                      <div>
                        <select
                          name="shipping_state"
                          value={FormData.shipping_state}
                          className={`select-1 ${
                            FormData.shipping_state === "" ? "is-invalid" : ""
                          }`}
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
                        {isFormSubmitted && FormData.shipping_state === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping State.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>City
                      </label>
                      <div>
                        <select
                          className={`select-1 ${
                            FormData.shipping_city === "" ? "is-invalid" : ""
                          }`}
                          name="shipping_city"
                          value={FormData.shipping_city}
                          onChange={handleChange}
                        >
                          <option value="" disabled></option>
                          {shippingCity.map((option, i) => (
                            <option key={i} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {isFormSubmitted && FormData.shipping_city === "" && (
                          <div className="invalid-feedback">
                            Please select a Shiping City.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        <small className="req text-danger">*</small>Zip Code
                      </label>
                      <input
                        type="number"
                        name="shipping_zip"
                        value={FormData.shipping_zip}
                        onChange={handleChange}
                        className={`form-control  ${
                          isFormSubmitted && FormData.shipping_zip.length !== 6
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted &&
                        FormData.shipping_zip.length !== 6 && (
                          <div className="invalid-feedback">
                            Please write shiping zip corectly.
                          </div>
                        )}
                    </div>
                  </div>
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
             Confirm
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
          .icon {
            font-size: 20px;
            margin-right: 4px;
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

export default BillModal;
