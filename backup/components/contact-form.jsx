import React, { useState } from "react";

function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any necessary form submission logic here
    // For simplicity, let's just set the success state to true
    setSuccess(true);
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
          <div className="col-12">
            {success && (
              <div className="alert alert-success d-on-success">
                We received your message and will contact you back soon.
              </div>
            )}
          </div>
          <div className="row my-3">
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
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group col-12 my-3">
            <textarea
              className="form-control "
              rows="4"
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 text-center  ">
            <button className="btn  w-100  btn-primary " type="submit">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
        .lea{
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
          .form-control{
            border-radius: 3px;
            font-size: .9rem;
          }
          .form-control:focus{
            box-shadow: none;
          border:1px solid #2a665f ;

          }
          .lead_let{
            font-size: 2.5rem;
            font-weight: 200;
            line-height: 1.5;
            font-family: Dosis,sans-serif;
          }
        `}
      </style>
    </section>
  );
}

export default ContactForm;
