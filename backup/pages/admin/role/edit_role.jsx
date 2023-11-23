import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { rolePermissions, updateRoles } from "@/apis/apis";
import { toast } from 'react-toastify';

const Edit_user = ({ show, handleClose, allData, selectRow }) => {
  const [roleData, setRoleData] = useState([]);
  const change = async () => {
    if (selectRow) {
      const id = selectRow.roleid;
      const data = await rolePermissions(id);
      setRoleData(data);
    }
  };

  const handleCheckboxChange = (index, fieldName) => {
    const updatedPermissions = [...roleData];
    const isChecked = updatedPermissions[index][fieldName] === 1;
    updatedPermissions[index][fieldName] = isChecked ? 0 : 1;
    setRoleData(updatedPermissions);
  };

  //Edit role api
  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = selectRow.roleid;
    const data = await updateRoles(roleData, id);
    if (data.message == "Role Permission set") {
      handleClose();
      toast.success('Updated successfully!');
    }
  };
  useEffect(() => {
    change();
  }, [selectRow]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Role</Modal.Title>
      </Modal.Header>
      {selectRow &&
         <form onSubmit={handleSubmit} style={{ width: "56vw" }}>
         <Modal.Body>
           
           <div className="col-md-12">
            <label className="form-label"><small className="text-danger">*</small>Role Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={selectRow.name}
              disabled={true}
              style={{cursor:"not-allowed"}}
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
                   create
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
      }
   
    </Modal>
  );
};

export default Edit_user;
