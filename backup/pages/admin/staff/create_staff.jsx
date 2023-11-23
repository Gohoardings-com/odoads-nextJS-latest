import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  addImgeApi,
  addStaffApi,
  getAllRollesApi,
  rolePermissions,
} from "../../../apis/apis";
import { toast } from "react-toastify";

const Create_staff = ({ show, handleClose, allData }) => {
  //form data
  const formdata = {
    name: "",
    email: "",
    password: "",
    facebook: "",
    linkdin: "",
    skype: "",
    phone_number: "",
    role_name: "",
    all_Permission: [],
  };
  const [defaultValueFile, setdefaultValueFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [data, setData] = useState(formdata);
  const [roleData, setRoleData] = useState([]);
  const [profile, setProfile] = useState(true);
  const [tblData, setTblData] = useState([]);
  const change = () => setProfile(!profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 //get all roles
  const allRoles = async () => {
    const data = await getAllRollesApi();
    setTblData(data);
  };

  //get permission based on select role 
  const getPermission = async () => {
    if (data.role_name) {
      const id = data.role_name;
      const alldata = await rolePermissions(id);
      setRoleData(alldata);
    }
  };


  //edit permission
  const handleCheckboxChange = (index, fieldName) => {
    const updatedPermissions = [...roleData];
    const isChecked = updatedPermissions[index][fieldName] === 1;
    updatedPermissions[index][fieldName] = isChecked ? 0 : 1;
    setRoleData(updatedPermissions);
  };

  //store img upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setdefaultValueFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  //add new staff api
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.name !== "" &&
      data.email !== "" &&
      data.password.length >= 8 &&
      data.role_name !== "" &&
      data.phone_number.length == 10
    ) {
      setData((prevData) => ({
        ...prevData,
        all_Permission: roleData,
      }));
      const value = await addStaffApi(data);
      if (value.message == "Satff Member added Successfully") {
        const formData = new FormData();
        formData.append("file", defaultValueFile);
        formData.append("name", "staff");
        const data = await addImgeApi(formData);
        if (data.message === "Success") {
          setPreviewImage(null);
          setdefaultValueFile(null);
        }
        allData();
        toast.success("Added successfully!");
        setData(formdata);
        handleClose();
        setIsFormSubmitted(false);
        setProfile(true);
      }
    } else {
      setIsFormSubmitted(true);
    }
  };


  useEffect(() => {
    allRoles();
  }, []);
  useEffect(() => {
    getPermission();
  }, [data.role_name]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Satff</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} style={{ width: "56vw" }}>
        <Modal.Body>
          <div className="container p-0">
            <div className="row d-flex justify-content-center">
              <img
                src={previewImage ? previewImage : "../../imgs/defaulUser.png"}
                alt="Preview"
                className="mt-2"
                style={{ width: "100px", height: "70px", borderRadius: "50%" }}
              />
            </div>
            <div className="row">
              {profile ? (
                <>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="mediaImage" className="control-label">
                        Profile image
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
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
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
                    <div className="form-group">
                      <label htmlFor="email" className="control-label">
                        <small className="req text-danger">* </small>Email
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.email === ""
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.email === "" && (
                        <div className="invalid-feedback">
                          Please enter a email.
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="control-label">
                        <small className="req text-danger">* </small>Password
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.password.length <= 7
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.password.length <= 7 && (
                        <div className="invalid-feedback">
                          password should be atleast 6 digit.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        Facebook
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="facebook"
                        className="form-control customvalidate invalid"
                        value={data.facebook}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="medianame" className="control-label">
                        Linkdin
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="linkdin"
                        className="form-control customvalidate invalid"
                        value={data.linkdin}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone_number" className="control-label">
                        <small className="req text-danger">* </small> Phone
                      </label>
                      <input
                        type="number"
                        id="name"
                        name="phone_number"
                        value={data.phone_number}
                        onChange={handleChange}
                        className={`form-control ${
                          isFormSubmitted && data.phone_number.length !== 10
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {isFormSubmitted && data.phone_number.length !== 10 && (
                        <div className="invalid-feedback">
                          Please enter phone number corectly.
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="role" className="control-label">
                        <small className="req text-danger">* </small>Select Role
                      </label>
                      <div>
                        <select
                          className={`select-1   ${
                            isFormSubmitted && data.role_name === ""
                              ? "is-invalid"
                              : ""
                          }`}
                          name="role_name"
                          value={data.role_name}
                          onChange={handleChange}
                        >
                          <option value=" " defaultValue></option>
                          {tblData.map((el) => (
                            <option value={el.roleid}>{el.name}</option>
                          ))}
                        </select>
                        {isFormSubmitted && data.role_name === "" && (
                          <div className="invalid-feedback">
                            Please select a role.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    {data.role_name !== "" ? (
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Permission</th>
                            <th scope="col" className="text-center ">
                              View
                            </th>
                            <th scope="col" className="text-center">
                              View (own)
                            </th>
                            <th scope="col" className="text-center">
                              Create
                            </th>
                            <th scope="col" className="text-center">
                              Edit
                            </th>
                            <th scope="col" className="text-center">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {roleData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.permissionname}</td>
                              {Object.keys(item).map((key, idx) => {
                                if (
                                  key == "can_view" ||
                                  key == "can_view_own" ||
                                  key == "can_edit" ||
                                  key == "can_create" ||
                                  key == "can_delete"
                                ) {
                                  return (
                                    <td key={idx} className="text-center">
                                      <input
                                        type="checkbox"
                                        checked={item[key] === 1}
                                        onChange={() =>
                                          handleCheckboxChange(index, key)
                                        }
                                      />
                                    </td>
                                  );
                                }
                                return null;
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="no_role text-center">
                        <p className="text-mute pt-5 my-5">
                          Select role first to see & edit all permission
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <style jsx>{`
              .select-1 {
                width: 100%;
                border-radius: 2px;
                height: 34px;
              }
              .no_role {
                height: 35vh;
              }
              .text-mute {
                color: #9aabc3;
                font-size: 13px;
              }
            `}</style>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {profile ? (
            <>
              <Button className=" btn btn-create" onClick={change}>
                Save & Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="light" onClick={change}>
                Previous
              </Button>
              <Button className="btn-create" type="submit">
                Save
              </Button>
            </>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create_staff;
