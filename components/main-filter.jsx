import React, { useState} from "react";

const Filters = ({ medias, setFilteredMedia ,mediaCategory,city}) => {
  const formData = {
    location: "",
    category: "",
    min_price: "",
    max_price: "",
    illumination: "",
    city: "",
    availability: "",
    available_date: new Date().toISOString().split("T")[0],
  };

  const [data, setData] = useState(formData);

  // store search form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // Perform filtering based on user's input
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = medias.filter((media) => {
      // Apply filters based on the user's input
      if (data.category && media.category !== data.category) {
        return false;
      }
      if (data.availability === "0" && media.booked !== 0) {
        return false;
      }
      if (data.availability === "1" && media.booked !== 1) {
        return false;
      }
      if (data.city && media.city !== data.city) {
        return false;
      }
      if (data.illumination && media.illumination !== data.illumination) {
        return false;
      }
      if (data.min_price && parseInt(media.price) < parseInt(data.min_price)) {
        return false;
      }
      if (data.max_price && parseInt(media.price) > parseInt(data.max_price)) {
        return false;
      }
      if (
        data.location &&
        !(
          media.location.toLowerCase().includes(data.location.toLowerCase()) ||
          media.state.toLowerCase().includes(data.location.toLowerCase()) ||
          media.city.toLowerCase().includes(data.location.toLowerCase())
        )
      ) {
        return false;
      } // Apply filter based on "Available From" input
      if (data.available_date) {
        // Parse the selected date from the input
        const selectedDate = new Date(data.available_date);
        selectedDate.setHours(0, 0, 0, 0);
        // Parse the media's available_date property
        const mediaAvailableDate = new Date(media.available_date);
        mediaAvailableDate.setHours(0, 0, 0, 0);
        // Check if media's available_date is on or after the selected date
        if (mediaAvailableDate < selectedDate) {
          return false;
        }
      }

      return true;
    });

    // Update the filteredMedia state with the filtered data
    setFilteredMedia(filteredData);
  };

  // Reset search logic here
  const handleReset = () => {
    setFilteredMedia(medias);
    setData(formData);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="form-group mb-2">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="location" className="control-label">
                  Search
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  placeholder="Search on basis of location,city,state"
                  value={data.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="status" className="control-label">
                  Media Category
                </label>
                <div>
                  <select
                    className="select-1 w-100 "
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled defaultValue>
                      Select
                    </option>
                    {mediaCategory.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="status" className="control-label">
                  City
                </label>
                <div>
                  <select
                    className="select-1 w-100 "
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                  >
                    <option value="" disabled defaultValue>
                      Select
                    </option>
                    {city.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="expectedbudgetfrom">Min. Price</label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <input
                      type="number"
                      id="expectedbudgetfrom"
                      min="0"
                      className="form-control expectedbudget"
                      aria-invalid="true"
                      name="min_price"
                      value={data.min_price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="expectedbudgetto">Max. Price</label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <input
                      type="number"
                      id="expectedbudgetto"
                      min="0"
                      className="form-control expectedbudget"
                      aria-invalid="true"
                      name="max_price"
                      value={data.max_price}
                      onChange={handleChange}
                    />
           
          
                  </div>
                  {data.min_price>data.max_price && (
                  <div style={{fontSize:".6rem",color:"red"}}>
                     Max budget should have more value than Min budget
                  </div>
                )}
                </div>
              
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="illumination" style={{ marginBottom: "0px" }}>
                  Illumination
                </label>
                <br />

                <div className="radio radio-primary radio-inline cust_redio_search">
                  <input
                    type="radio"
                    name="illumination"
                    value="LED Screen"
                    id="ledscreen"
                    onChange={handleChange}
                  />
                  <label htmlFor="ledscreen" className="ms-1">
                    Led{" "}
                  </label>
                </div>
                <div className="radio radio-primary radio-inline cust_redio_search">
                  <input
                    type="radio"
                    name="illumination"
                    value="Ambi Lit"
                    id="ambilit"
                    onChange={handleChange}
                  />
                  <label htmlFor="ambilit" className="ms-1">
                    Ambi Lit
                  </label>
                </div>
                <br />
                <div className="radio radio-primary radio-inline cust_redio_search">
                  <input
                    type="radio"
                    name="illumination"
                    value="Non-lit"
                    id="nonlit"
                    onChange={handleChange}
                  />
                  <label htmlFor="nonlit" className="ms-1">
                    Non lit
                  </label>
                </div>
                <div className="radio radio-primary radio-inline cust_redio_search">
                  <input
                    type="radio"
                    name="illumination"
                    value="Front Lit"
                    id="frontlit"
                    onChange={handleChange}
                  />
                  <label htmlFor="frontlit" className="ms-1">
                    Front Lit
                  </label>
                </div>
                <div className="radio radio-primary radio-inline cust_redio_search">
                  <input
                    type="radio"
                    name="illumination"
                    value="Back Lit"
                    id="backlit"
                    onChange={handleChange}
                  />
                  <label htmlFor="backlit" className="ms-1">
                    Back Lit
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="availability" style={{ marginBottom: "0px" }}>
                  Availability
                </label>
                <br />
                <div className="radio radio-primary radio-inline pull-left cust_redio_search">
                  <input
                    type="radio"
                    name="availability"
                    value="0"
                    id="available"
                    className="cust_available"
                    onChange={handleChange}
                  />
                  <label htmlFor="available" className="ms-1">
                    Available
                  </label>
                </div>
                <br />
                <div
                  className="radio radio-primary radio-inline pull-left cust_redio_search"
                  style={{ marginRight: "5px" }}
                >
                  <input
                    type="radio"
                    name="availability"
                    value="all"
                    id="all"
                    className="cust_available"
                    onChange={handleChange}
                  />
                  <label htmlFor="all" className="ms-1">
                    All
                  </label>
                </div>
                <div
                  className="radio radio-primary radio-inline pull-left cust_redio_search"
                  style={{ marginRight: "5px" }}
                >
                  <input
                    type="radio"
                    name="availability"
                    value="1"
                    id="Booked"
                    className="cust_available"
                    onChange={handleChange}
                  />
                  <label htmlFor="Booked" className="ms-1">
                    Booked
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="owner">Available From</label>
              <div className="input-group date">
                <input
                  type="date"
                  id="available_date"
                  name="available_date"
                  className="form-control"
                  min={new Date().toISOString().split("T")[0]}
                  value={data.available_date}
                  autoComplete="off"
                  aria-invalid="false"
                  onChange={handleChange}
                />
                <div className="input-group-addon">
                  <i className="fa fa-calendar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="form-group" style={{ textAlign: "right" }}>
              <button
                type="submit"
                id="find_media"
                className="btn btn-create block"
                style={{ width: "150px" }}
              >
                <i className="fa fa-search"></i> Search{" "}
              </button>

              <button
                type="button"
                className="btn btn-default"
                onClick={handleReset}
              >
                <i className="fa fa-history"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </form>
      <style jsx>
        {`
     span{font-size: .8rem!important;}
     .radio-inline{
       position: relative;
       display: inline-block;
       // padding-left: 20px;
       margin-bottom: 0;
       font-weight: 400;
       vertical-align: middle;
       cursor: pointer;
   }
   .cust_redio_search {
     padding: 0px 0px 0px 10px !important;
     border-radius: 5px;
     margin-top: 2px !important;
 }
 .select-1 {

   height:34px;
   border-radius: 2px;

     `}
      </style>
    </>
  );
};

export default Filters;
