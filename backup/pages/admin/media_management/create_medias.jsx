import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import {
  addImgeApi,
  createMediasApi,
  getCityApi,
  getStateApi,
  getSubCategoryApi,
} from "../../../apis/apis";
const Create_medias = ({ show, handleClose, allMedia }) => {
  const formData = {
    status: "",
    name: "",
    total: "1",
    mediaPrice: "",
    city: "",
    district: "",
    state: "",
    ftf: "",
    height: "",
    width: "",
    location: "",
    category: "",
    subcategory: "",
    illumination: "",
    measuring: "inch",
    geo_location: "",
    status: "",
    available_date: new Date().toISOString().split("T")[0],
  };
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [data, setData] = useState(formData);
  const [form2, setForm2] = useState(false);
  const [subCategory, setSubCategory] = useState([]);
  const [defaultValueFile, setdefaultValueFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //store form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //store img upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setdefaultValueFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  //create new medias api
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the required fields are not empty
    if (
      data.name !== "" &&
      data.category !== "" &&
      data.subcategory !== "" &&
      data.illumination !== "" &&
      data.height !== "" &&
      data.width !== "" &&
      data.measuring !== "" &&
      data.mediaPrice !== "" &&
      data.state !== "" &&
      data.ftf !== "" &&
      data.location !== "" &&
      data.geo_location !== "" &&
      data.available_date !== "" &&
      defaultValueFile !== null &&
      data.city !== ""
    ) {
      const value = await createMediasApi(data);
      if (value.message == "Success") {
        const formData = new FormData();
        formData.append("file", defaultValueFile);
        formData.append("name", "media");

        const data = await addImgeApi(formData);
        if (data.message == "Success") {
          allMedia();
          handleClose();
          setData(formData);
          setSubCategory([]);
          setIsFormSubmitted(false);
          setForm2(false);
          setCity([]);
          setdefaultValueFile(null);
          setPreviewImage(null);
          toast.success("Media created successfully!");
        } else {
          alert(data.message);
        }
      } else if (value.message === "MediaName already Exists") {
        alert(value.message);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };

  const category = [
    {
      label: "InFlight Branding",
      value: "In Flight Media",
    },
    {
      label: "Traditional OOH Media",
      value: "Traditional OOH Media",
    },
    {
      label: "Digital Media",
      value: "Digital OOH",
    },
    {
      label: "Mall Media",
      value: "Mall Media",
    },
    {
      label: "Office Branding",
      value: "Offices",
    },
    {
      label: "Transit Media",
      value: "Transit Media",
    },
    {
      label: "Airport Branding",
      value: "Airpot Media",
    },
  ];

  //get sub category list
  const getSubCategory = async () => {
    if (data.category) {
      const media = data.category;
      const value = await getSubCategoryApi(media);
      setSubCategory(value);
    }
  };

  //get illumination
  const illumination = [
    {
      value: "Non-lit",
    },
    {
      value: "Front Lit",
    },
    {
      value: "Back Lit",
    },
    {
      value: "Ambi Lit",
    },
    {
      value: "LED Screen",
    },
  ];

  const nextForm = () => {
    setForm2(true);
  };
  const prevForm = () => {
    setForm2(false);
  };

  useEffect(() => {
    getSubCategory();
  }, [data.category]);

  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
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
    stateList();
  }, []);

  useEffect(() => {
    CityList();
  }, [data.state]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Media</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          {form2 ? (
            <>
              <Modal.Body>
                <div className="filter" style={{ width: "54.5vw" }}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Select
                          State
                        </label>
                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.state === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="state"
                            value={data.state}
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
                          {isFormSubmitted && data.state === "" && (
                            <div className="invalid-feedback">
                              Please select a state.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Select
                          City
                        </label>
                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.city === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                          >
                            <option value="" disabled></option>
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
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="medianame" className="control-label">
                            District
                          </label>
                          <input
                            type="text"
                            id="medianame"
                            name="district"
                            className="form-control "
                            value={data.district}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="medianame" className="control-label">
                            <small className="req text-danger">* </small>
                            Location
                          </label>
                          <input
                            type="text"
                            id="medianame"
                            name="location"
                            className={`form-control customvalidate invalid ${
                              isFormSubmitted && data.location === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            value={data.location}
                            onChange={handleChange}
                          />
                          {isFormSubmitted && data.location === "" && (
                            <div className="invalid-feedback">
                              Please enter a location.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="saleasbunch">
                            {" "}
                            <small className="req text-danger">* </small> Foot
                            Fall
                          </label>
                        </div>
                        <input
                          type="text"
                          id="totalno"
                          name="ftf"
                          min="0"
                          className={`form-control cust_check_neg_val ${
                            isFormSubmitted && data.ftf === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={data.ftf}
                          onChange={handleChange}
                        />
                        {isFormSubmitted && data.ftf === "" && (
                          <div className="invalid-feedback">
                            Please enter a Foot Fall.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="medianame" className="control-label">
                          <small className="req text-danger">* </small> GEO
                          Location
                        </label>
                        <input
                          type="number"
                          id="medianame"
                          placeholder="Example (12,34,56 12,34,56)"
                          name="geo_location"
                          className={`form-control customvalidate invalid ${
                            isFormSubmitted && data.geo_location === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={data.geo_location}
                          onChange={handleChange}
                        />
                        {isFormSubmitted && data.geo_location === "" && (
                          <div className="invalid-feedback">
                            Please enter a geo_location.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="owner"> <small className="req text-danger">* </small>Available Date</label>
                          <div className="input-group date">
                            <input
                              type="date"
                              id="available_date"
                             
                              name="available_date"
                              className={`form-control ${
                                isFormSubmitted && data.available_date === ""
                                  ? "is-invalid"
                                  : ""
                              }`}
                              min={new Date().toISOString().split("T")[0]}
                              autoComplete="off"
                              aria-invalid="false"
                              value={data.available_date}
                              onChange={handleChange}
                            />
                            {isFormSubmitted && data.available_date === "" && (
                              <div className="invalid-feedback">
                                Please select a Available date.
                              </div>
                            )}
                            <div className="input-group-addon">
                              <i className="fa fa-calendar"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={prevForm}>
                  Previous
                </Button>

                <Button className="btn-create" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body>
                <div className="filter" style={{ width: "54.5vw" }}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="medianame" className="control-label">
                            <small className="req text-danger">* </small>Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${
                              isFormSubmitted && data.name === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            value={data.name}
                            onChange={handleChange}
                          />
                          {isFormSubmitted && data.name === "" && (
                            <div className="invalid-feedback">
                              Please enter a name.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="saleasbunch">
                            {" "}
                            Total number of media
                          </label>
                        </div>
                        <input
                          type="number"
                          id="totalno"
                          name="total"
                          min="1"
                          // className="form-control cust_check_neg_val"
                          className={`form-control cust_check_neg_val ${
                            isFormSubmitted && data.total === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={data.total}
                          onChange={handleChange}
                        />
                        {isFormSubmitted && data.total === "" && (
                          <div className="invalid-feedback">
                            Please enter a no of media.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="drop-filter">
                      <div>
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Select
                          Category
                        </label>

                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.category === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="category"
                            value={data.category}
                            onChange={handleChange}
                          >
                            <option value="" disabled defaultValue></option>
                            {category.map((option, i) => (
                              <option key={i} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {isFormSubmitted && data.category === "" && (
                            <div className="invalid-feedback">
                              Please select a category.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ms-md-3 me-md-3">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Select
                          Sub Category
                        </label>
                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.subcategory === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="subcategory"
                            value={data.subcategory}
                            onChange={handleChange}
                          >
                            <option value="" disabled defaultValue></option>
                            {subCategory.map((option, i) => (
                              <option key={i} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                          {isFormSubmitted && data.subcategory === "" && (
                            <div className="invalid-feedback">
                              Please select a subcategory.
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>{" "}
                          Illumination
                        </label>
                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.illumination === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="illumination"
                            value={data.illumination}
                            onChange={handleChange}
                          >
                            <option value="" disabled defaultValue></option>
                            {illumination.map((option, i) => (
                              <option key={i} value={option.value}>
                                {option.value}
                              </option>
                            ))}
                          </select>
                          {isFormSubmitted && data.illumination === "" && (
                            <div className="invalid-feedback">
                              Please select a illumination.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Height
                        </label>

                        <input
                          type="number"
                          id="totalno"
                          name="height"
                          min="0"
                          className={`form-control cust_check_neg_val w-100 ${
                            isFormSubmitted && data.height === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={data.height}
                          onChange={handleChange}
                        />
                        {isFormSubmitted && data.height === "" && (
                          <div className="invalid-feedback">
                            Please enter a height.
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>Width
                        </label>
                        <input
                          type="number"
                          id="totalno"
                          name="width"
                          min="0"
                          className={`form-control cust_check_neg_val ${
                            isFormSubmitted && data.width === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          value={data.width}
                          onChange={handleChange}
                        />
                        {isFormSubmitted && data.width === "" && (
                          <div className="invalid-feedback">
                            Please enter a width.
                          </div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="status" className="control-label">
                          <small className="req text-danger">* </small>{" "}
                          Measuring units
                        </label>
                        <div>
                          <select
                            className={`select-1 ${
                              isFormSubmitted && data.measuring === ""
                                ? "is-invalid"
                                : ""
                            }`}
                            name="measuring"
                            value={data.measuring}
                            onChange={handleChange}
                          >
                            <option value="feet">Feet</option>{" "}
                            <option value="inch">Inch</option>{" "}
                            <option value="meter">Meter</option>
                          </select>
                          {isFormSubmitted && data.measuring === "" && (
                            <div className="invalid-feedback">
                              Please select a measuring.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group my-md-1">
                    <div className="row mt-md-1">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-8">
                            <div>
                              <label
                                htmlFor="fileupload"
                                className="control-label"
                                style={{ fontWeight: "bold", margin: "0" }}
                              >
                                Primary Image
                              </label>
                              <br />
                              <label
                                htmlFor="fileupload"
                                className="control-label"
                                style={{ fontSize: "10px" }}
                              >
                                *Primary image will be used for PPT generation
                              </label>
                              <br />
                              <label
                                htmlFor="fileupload"
                                className="control-label"
                                style={{ fontSize: "10px" }}
                              >
                                * Use an image with 960 width and 520 height for
                                the best PPT/website view
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <img
                              src={
                                previewImage
                                  ? previewImage
                                  : "../imgs/defaultt.png"
                              }
                              alt="Preview"
                              style={{ maxWidth: "100%", maxHeight: "160px" }}
                            />
                          </div>
                          <div className="col-md-8">
                            <label htmlFor="saleasbunch">
                              {" "}
                              <small className="req text-danger">* </small>{" "}
                              Upload Image
                            </label>
                            <input
                              type="file"
                              id="fileupload"
                              name="mediaImage"
                              onChange={handleFileChange}
                              className={`form-control ${
                                isFormSubmitted && defaultValueFile === null
                                  ? "is-invalid"
                                  : ""
                              }`}
                              accept="image/jpg,image/jpeg,image/png"
                              aria-describedby="name-error"
                              aria-invalid="true"
                              style={{ width: "100%" }}
                            />
                            {isFormSubmitted && defaultValueFile === null && (
                              <div className="invalid-feedback">
                                Please upload media image.
                              </div>
                            )}
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="saleasbunch">
                                {" "}
                                <small className="req text-danger">
                                  *{" "}
                                </small>{" "}
                                Total Monthly Price
                              </label>
                              <input
                                type="number"
                                id="totalno"
                                name="mediaPrice"
                                min="0"
                                className={`form-control cust_check_neg_val ${
                                  isFormSubmitted && data.mediaPrice === ""
                                    ? "is-invalid"
                                    : ""
                                }`}
                                value={data.mediaPrice}
                                onChange={handleChange}
                              />
                              {isFormSubmitted && data.mediaPrice === "" && (
                                <div className="invalid-feedback">
                                  Please enter a mediaPrice.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn-create" onClick={nextForm}>
                  Save & Next
                </Button>
              </Modal.Footer>
            </>
          )}
        </form>
      </Modal>
      <style jsx>{`
        .select-1 {
          width: 17vw;
          border-radius: 2px;
          height: 34px;
        }
      `}</style>
    </>
  );
};

export default Create_medias;
