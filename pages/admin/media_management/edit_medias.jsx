import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  addImgeApi,
  editMediasApi,
  getCityApi,
  getStateApi,
  getSubCategoryApi,
} from "../../../apis/apis";
const Edit_media = ({ show, handleClose, rowData, allMedia }) => {
  const [data, setData] = useState(rowData);
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

  //edit new medias
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.medianame !== "" &&
      data.category !== "" &&
      data.subcategory !== "" &&
      data.illumination !== "" &&
      data.height !== "" &&
      data.width !== "" &&
      data.heightunit !== "" &&
      data.price !== "" &&
      data.state !== "" &&
      data.ftf !== "" &&
      data.location !== "" &&
      data.geolocation !== "" &&
      data.available_date !== "" &&
      data.city !== ""
    ) {
      const update = await editMediasApi(data);
      if (update == "Media Updated Successfully") {
     
        if (defaultValueFile !=="") {
          const formData = new FormData();
          formData.append("file", defaultValueFile);
          formData.append("name", "media");
          formData.append("staffid", data.id);
          const value = await addImgeApi(formData);
          // if (value.message == "Success") {
          // } else {
          //   alert(value.message);
          // }
        }

        allMedia();
        toast.success("Media updated successfully!");
        handleClose();
      }
    } else {
      alert("please fill all mandatory feild");
    }
  };

  //media category
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

  {
    data &&
      useEffect(() => {
        CityList();
      }, [data.state]);
  }

  {
    data &&
      data.category &&
      useEffect(() => {
        getSubCategory();
      }, [data.category]);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Media</Modal.Title>
        </Modal.Header>
        {data && (
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

                          <select
                            className="select-1"
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                          >
                            {state &&
                              state.map((option, i) => (
                                <option key={i} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                          </select>
                          <div></div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="status" className="control-label">
                            <small className="req text-danger">* </small>Select
                            City
                          </label>
                          <div>
                            <select
                              className="select-1"
                              name="city"
                              value={data.city}
                              onChange={handleChange}
                            >
                              {city &&
                                city.map((option, i) => (
                                  <option key={i} value={option.name}>
                                    {option.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label
                              htmlFor="medianame"
                              className="control-label"
                            >
                              {" "}
                              District
                            </label>
                            <input
                              type="text"
                              id="medianame"
                              name="district"
                              className="form-control"
                              value={data.district}
                              onChange={handleChange}
                            />
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group my-md-1">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <label
                              htmlFor="medianame"
                              className="control-label"
                            >
                              <small className="req text-danger">* </small>
                              Location
                            </label>
                            <input
                              type="text"
                              id="medianame"
                              name="location"
                              className="form-control customvalidate invalid"
                              value={data.location}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="saleasbunch">
                              <small className="req text-danger">* </small> Foot
                              Fall
                            </label>
                          </div>
                          <input
                            type="text"
                            id="totalno"
                            name="ftf"
                            min="0"
                            className={`form-control `}
                            value={data.ftf}
                            onChange={handleChange}
                          />
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
                            name="geolocation"
                           
                            className={`form-control ${
                              data.geolocation === "" ? "is-invalid" : ""
                            }`}
                            value={data.geolocation}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group my-md-1">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="owner">
                              <small className="req text-danger">* </small>
                              Available Date
                            </label>
                            <div className="input-group date">
                              <input
                                type="date"
                                id="available_date"
                                name="available_date"
                                className="form-control"
                                min={data.available_date.split(" ")[0]}
                                autoComplete="off"
                                aria-invalid="false"
                                value={data.available_date.split(" ")[0]}
                                onChange={handleChange}
                              />
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
                            <label
                              htmlFor="medianame"
                              className="control-label"
                            >
                              <small className="req text-danger">* </small>Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="medianame"
                              className="form-control customvalidate invalid"
                              value={data.medianame}
                              onChange={handleChange}
                            />
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
                            name="totalno"
                            min="0"
                            className="form-control cust_check_neg_val"
                            value={data.totalno}
                            onChange={handleChange}
                          />
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
                              className="select-1"
                              name="category"
                              value={data.category}
                              onChange={handleChange}
                            >
                              {category &&
                                category.map((option, i) => (
                                  <option key={i} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="ms-md-3 me-md-3">
                          <label htmlFor="status" className="control-label">
                            <small className="req text-danger">* </small>Select
                            Sub Category
                          </label>
                          <div>
                            <select
                              className="select-1"
                              name="subcategory"
                              value={data.subcategory}
                              onChange={handleChange}
                            >
                              {subCategory &&
                                subCategory.map((option, i) => (
                                  <option key={i} value={option.name}>
                                    {option.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="status" className="control-label">
                            <small className="req text-danger">* </small>{" "}
                            Illumination
                          </label>
                          <div>
                            <select
                              className="select-1"
                              name="illumination"
                              value={data.illumination}
                              onChange={handleChange}
                            >
                              {illumination &&
                                illumination.map((option, i) => (
                                  <option key={i} value={option.value}>
                                    {option.value}
                                  </option>
                                ))}
                            </select>
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
                            className="form-control cust_check_neg_val w-100"
                            value={data.height}
                            onChange={handleChange}
                          />
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
                            className="form-control cust_check_neg_val"
                            value={data.width}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="status" className="control-label">
                            <small className="req text-danger">* </small>{" "}
                            Measuring units
                          </label>
                          <div>
                            <select
                              className="select-1"
                              name="heightunit"
                              value={data.heightunit}
                              onChange={handleChange}
                            >
                              <option value="feet">Feet</option>{" "}
                              <option value="inche">Inche</option>{" "}
                              <option value="meter">Meter</option>
                            </select>
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
                                  * Use an image with 960 width and 520 height
                                  for the best PPT/website view
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <img
                                src={
                                  previewImage ? previewImage : data.thumbnail
                                }
                                alt="Preview"
                                style={{ maxWidth: "100%", maxHeight: "160px" }}
                              />
                            </div>
                            <div className="col-md-8">
                              <label htmlFor="saleasbunch">
                                {" "}
                                <small className="req text-danger">
                                  *{" "}
                                </small>{" "}
                                Upload Image
                              </label>
                              <input
                                type="file"
                                id="fileupload"
                                name="mediaImage"
                                onChange={handleFileChange}
                                className="form-control"
                                accept="image/jpg,image/jpeg,image/png"
                                aria-describedby="name-error"
                                aria-invalid="true"
                                style={{ width: "100%" }}
                              />
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
                                  name="price"
                                  min="0"
                                  className="form-control cust_check_neg_val"
                                  value={data.price}
                                  onChange={handleChange}
                                />
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
                    Next
                  </Button>
                </Modal.Footer>
              </>
            )}
          </form>
        )}
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

export default Edit_media;
