import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import {
  addImgeApi,
  allPermissionapi,
  editStaffApi,
  getAllRollesApi,
} from "../../../apis/apis";
const Edit_staff = ({ show, handleClose, selectRow, allData }) => {
  const [data, setData] = useState(selectRow);
  const [tblData, setTblData] = useState([]);
  const [permission, setpermission] = useState([]);
  const [profile, setProfile] = useState(true);
  const [defaultValueFile, setdefaultValueFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //store img upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setdefaultValueFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const change = async () => {
    const id = selectRow.staffid;
    const roleName = selectRow.role;
    const data = await allPermissionapi(id,roleName);
    setpermission(data);
    setProfile(!profile);
  };

  const allRoles = async () => {
    const data = await getAllRollesApi();
    setTblData(data);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //edit permission
  const handleCheckboxChange = (index, fieldName) => {
    const updatedPermissions = [...permission];
    const isChecked = updatedPermissions[index][fieldName] === 1;
    updatedPermissions[index][fieldName] = isChecked ? 0 : 1;
    setpermission(updatedPermissions);
  };

  //edit staff api
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      data.firstname !== "" &&
      data.email !== "" &&
      data.password.length >= 8 &&
      data.role !== "" &&
      data.phonenumber.length == 10
    ) {
      const values = await editStaffApi(data, permission);
      if (values.message == "Satff Member added Successfully") {
        const formData = new FormData();
        formData.append("file", defaultValueFile);
        formData.append("name", "staff");
        formData.append("staffid", data.staffid);
        const value = await addImgeApi(formData);
        if (value.message === "Success") {
          setdefaultValueFile(null);
          setPreviewImage(null);
        }
        toast.success("Updated successfully!");
        allData();
        handleClose();
      }
    } else {
      alert("Please fill all mandatory feild corectly");
    }
  };
  useEffect(() => {
    allRoles();
  }, [selectRow]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Satff</Modal.Title>
      </Modal.Header>
      {data && (
        <form onSubmit={handleSubmit} style={{ width: "56vw" }}>
          <Modal.Body>
            <div className="container p-0">
              <div className="row d-flex justify-content-center">
                <img
                  src={previewImage ? previewImage : data.profile_image}
                  alt="Preview"
                  className="mt-2"
                  style={{
                    width: "100px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="row">
                {profile ? (
                  <>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="mediaImage" className="control-label">
                          {" "}
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
                          name="firstname"
                          className="form-control "
                          value={data.firstname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="control-label">
                          <small className="req text-danger">* </small>Email
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="email"
                          className="form-control "
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password" className="control-label">
                          <small className="req text-danger">* </small>Password
                        </label>
                        <input
                          type="password"
                          id="name"
                          name="password"
                          className="form-control "
                          value={data.password}
                          placeholder="********"
                          onChange={handleChange}
                        />
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
                          name="linkedin"
                          className="form-control customvalidate invalid"
                          value={data.linkedin}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone_number" className="control-label">
                          Phone
                        </label>
                        <input
                          type="number"
                          id="name"
                          name="phonenumber"
                          className="form-control "
                          value={data.phonenumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="role" className="control-label">
                          <small className="req text-danger">* </small>Select
                          Role
                        </label>
                        <div>
                          <select
                            className="select-1 "
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                          >
                            <option value="">{data.role}</option>
                            {tblData.map((el) => (
                              <option value={el.name}>{el.name}</option>
                            ))}
                          </select>
                          <style jsx>{`
                            .select-1 {
                              width: 100%;
                              border-radius: 2px;
                              height: 34px;
                            }
                          `}</style>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-12">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Permission</th>
                            <th scope="col" className="text-center">
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
                          {permission.map((item, index) => (
                            <tr key={index}>
                              <td>{item.permissionnameName}</td>
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
                    </div>
                  </>
                )}
              </div>
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
      )}
    </Modal>
  );
};

export default Edit_staff;
