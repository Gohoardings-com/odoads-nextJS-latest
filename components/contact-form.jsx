import { enquiryApi } from "@/apis/apis";
import { toast } from "react-toastify";
import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.Phone ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.Phone.length !== 10) {
      toast.error("Phone number should be 10 digits");
      return;
    }
    const { name, email, Phone, message } = formData;
    const data = await enquiryApi(name, email, Phone, message);
    if (data.success == true) {
      toast.success(data.message);
      setFormData({
        name: "",
        email: "",
        Phone: "",
        message: "",
      });
    }
  };

  return (
    <section className="section bg-gray pt-8">
      <div className="container">
        <header className="section-header text-center">
          {/* <small>Contact</small> */}
          <h2 className="lead_let">Let's Talk</h2>
          <hr style={{ borderTopColor: "#919191", marginTop: "10px" }} />
          <p className="lea">
            They original on mountains, drew the support time. The of to
            graduate. Into to is the to she.
          </p>
        </header>

        <form className="form-row input-border" onSubmit={handleSubmit}>
          <div className="row my-4">
            <div className="form-group  col-md-4">
              <input
                className="form-control "
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group  col-md-4">
              <input
                className="form-control "
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group  col-md-4">
              <input
                className="form-control "
                type="number"
                name="Phone"
                placeholder="Phone number"
                value={formData.Phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group col-12 my-4">
            <textarea
              className="form-control-textarea w-100"
              rows="5"
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 text-center  my-4">
            <button className="btn  w-100  btn-primary " type="submit">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .lea {
            color: #757575;
            font-weight: 300;
            margin-bottom: 2rem;
            font-size: 1.125rem;
          }
          .btn-primary {
            background-color: #2a665f;
            transition: 0.6s ease-in;
            border-radius: 3px;
            border: none;
          }
          .btn-primary:hover {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
          }
          .form-control {
            border-radius: 3px;
            font-size: 0.9rem;
          }
          .form-control:focus {
            box-shadow: none;
            border: 1px solid #2a665f;
          }
          .lead_let {
            font-size: 2.5rem;
            font-weight: 200;
            line-height: 1.5;
            font-family: Dosis, sans-serif;
          }
        `}
      </style>
    </section>
  );
}

export default ContactForm;
