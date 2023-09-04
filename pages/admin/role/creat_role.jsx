import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addRolllesApi } from "../../../apis/apis";
import { toast } from "react-toastify";

const Create_user = ({ show, handleClose, allData }) => {
  const formData = {
    name: "",
    all_Permission: [
      {
        short_name: "customers",
        permission: "Customers",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },

      {
        short_name: "invoices",
        permission: "Invoices",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        short_name: "campaigns",
        permission: "Campaigns",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },

      {
        short_name: "leads",
        permission: "Leads",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        short_name: "roles",
        permission: "Roles",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },

      {
        short_name: "staff",
        permission: "Staff",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        short_name: "tasks",
        permission: "Tasks",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },

      {
        short_name: "media_inventory",
        permission: "Media Inventroy",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        short_name: "landlord_management",
        permission: "Landlord Management",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
      {
        short_name: "plan_block_book",
        permission: "Planning, Blocking, Booking",
        view: 0,
        view_own: 0,
        create: 0,
        edit: 0,
        delete: 0,
      },
    ],
  };
  const [roleData, setRoleData] = useState(formData);

  const handleRoleName = (event) => {
    const updatedRoleData = { ...roleData, name: event.target.value };
    setRoleData(updatedRoleData);
  };

  const handleCheckboxChange = (index, fieldName) => {
    const updatedPermissions = [...roleData.all_Permission];
    const isChecked = updatedPermissions[index][fieldName] === 1;
    updatedPermissions[index][fieldName] = isChecked ? 0 : 1;
    setRoleData((prevRoleData) => ({
      ...prevRoleData,
      all_Permission: updatedPermissions,
    }));
  };

  //creat role api
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await addRolllesApi(roleData);
    if (data.message == "Role Permission set") {
      allData();
      handleClose();
      toast.success("Added successfully!");
      setRoleData(formData);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Role</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} style={{ width: "56vw" }}>
        <Modal.Body>
          <div className="col-md-12">
            <label className="form-label">
              <small className="text-danger">*</small>Role Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={roleData.name}
              onChange={handleRoleName}
            />
          </div>
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
              {roleData.all_Permission.map((item, index) => (
                <tr key={index}>
                  <td>{item.permission}</td>
                  {Object.keys(item).map((key, idx) => {
                    if (key !== "permission" && key !== "short_name") {
                      return (
                        <td key={idx} className="text-center">
                          <input
                            type="checkbox"
                            checked={item[key] === 1}
                            onChange={() => handleCheckboxChange(index, key)}
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-create" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Create_user;
