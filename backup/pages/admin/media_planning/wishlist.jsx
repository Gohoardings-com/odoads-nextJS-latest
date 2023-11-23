import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MaterialTable from "@material-table/core";
import { bookMediaApi } from "../../../apis/apis";
import { toast } from 'react-toastify';


const Wishlist = ({ show, handleClose, checkedCardData, allMedia }) => {
  const [dates, setDates] = useState({});

  const handleDateChange = (id, field, value) => {
    setDates((prevDates) => ({
      ...prevDates,
      [id]: {
        ...prevDates[id],
        id: id, // Add the 'id' property to the nested object
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dates.allocate_start_date !== "" && dates.allocate_end_date !== "") {
      await bookMediaApi(dates);
      allMedia();
      toast.success('Media booked successfully!');
    }
    handleClose();
    setDates({});
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booked media</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="filter" style={{ width: "58vw" }}>
              <MaterialTable
                data={checkedCardData}
                columns={[
                  { title: "ID", field: "id" },
                  { title: "Name", field: "medianame" },
                  { title: "Category", field: "category" },
                  { title: "City", field: "city" },
                  {
                    title: "Start date",
                    render: (rowData) => (
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="form-control"
                        value={
                          dates[rowData.id]?.startDate ||
                          (rowData.allocate_start_date &&
                            rowData.allocate_start_date.split(" ")[0])
                        }
                        onChange={(e) =>
                          handleDateChange(
                            rowData.id,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: "End date",
                    render: (rowData) => (
                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="form-control"
                        value={
                          dates[rowData.id]?.endDate ||
                          (rowData.allocate_end_date &&
                            rowData.allocate_end_date.split(" ")[0])
                        }
                        onChange={(e) =>
                          handleDateChange(
                            rowData.id,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    ),
                  },
                ]}
                options={{
                  headerStyle: {
                    backgroundColor: "#caf0ec",
                    color: "#14877c",
                    padding: ".2em .7em",
                    margin: "0px",
                  },
                  rowStyle: {
                    backgroundColor: "#FFFFFF",
                    fontSize: ".72rem",
                  },
                }}
                title=""
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className=" btn btn-create" type="submit">
              BOOK MEDIA
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <style jsx>{``}</style>
    </>
  );
};

export default Wishlist;
