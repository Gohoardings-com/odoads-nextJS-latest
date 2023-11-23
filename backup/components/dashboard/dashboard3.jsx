import React from "react";

const Dashboard3 = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="card rounded-3 p-2"></div>
        </div>
        <div className="col-md-4">
          <div className="card rounded-3 p-2">
            <h6>My Staff</h6>

            <div className="row my-2">
              <div className="col-md-10 d-flex  p-2 py-3">
                <img
                  src={"../../imgs/man.png"}
                  alt="Preview"
                  // className="mt-2"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />

                <div className="text-start ps-3 pt-3">
                  <h5 className="">Welcome</h5>
                  <p className="text-muted">It's nice to see you again</p>
                </div>
              </div>
              <div className="col-md-2">
                <div className="card">
                  <img
                    src={"../../imgs/call.png"}
                    alt="Preview"
                    // className="mt-2"
                    style={{ width: "35px", height: "35px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;
