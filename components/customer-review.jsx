import React from "react";
import Slider from "react-slick";

const testimonials = [
  {
    customer: "Kaushik Outdoors",
    rating: "4 out of 5 stars",
    feedback:
      "I was hatred of ignoring phone calls of the customers upon promising them to send the ppt. of their required sites as it takes a long time to select and edit all the required sites and sending it. ODO’s one-click feature lets me send the ppt.",
  },
  {
    customer: "Woohoo Ads",
    rating: "4 out of 5 stars",
    feedback:
      "To build trust with customers, it is very important to provide the status of the campaign. The advanced features of the campaign in this software let me record every progress made in their campaign and provide them precise information.",
  },
  {
    customer: "Naks Creators Pvt. Ltd.",
    rating: "5 out of 5 stars",
    feedback:
      "Wow kind of experience with this software. Nothing could be more helpful than ODO for a media owner to manage all their operations, ranging from deal to payment.",
  },
  {
    customer: "Skywalker lifestyle Pvt. Ltd.",
    rating: "5 out of 5 stars",
    feedback:
      "I was really impressed with the Campaign Management feature. It let me tag my sites with block, book, and available tags, which lets me easily convey the availability of my sites.",
  },
  {
    customer: "RS Media Pro",
    rating: "5 out of 5 stars",
    feedback:
      "It was really cumbersome to handle all my media. My ownership was increasing exponentially, but ODO erased the line of difficulty. Great time management and user-friendly.",
  },
];

const Review = () => {
  {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplay: false,
      speed: 3500,
      pauseOnHover: true,

      responsive: [
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // initialSlide: 0,
          },
        },
      ],
    };
  }

  let slider = settings;
  return (
    <>
      <div className="testimonial-slider  my-4 hide-arrow">
        <Slider {...slider}>
          {testimonials.map((e, i) => (
            <div className=" p-3" key={i}>
              <div className="card border-0 testimonial">
                <div className="card-body">
                  <div className="row">
                    <div className="col-auto mr-auto">
                      <h6
                        style={{
                          fontWeight: 500,
                          fontFamily: "Dosis,sans-serif",
                          color: "#323d47",
                        }}
                      >
                        {e.customer}
                      </h6>
                    </div>
                  </div>

                  <p className="fw-light ">{e.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx>
        {`
          p {
            font-size: 0.86rem;
            line-height: 1.6;
            color: #757575;
            letter-spacing: 0.6px;
          }
          .testimonial {
            background-image: linear-gradient(#dbdbdb, #ffffff);
          }
        `}
      </style>
    </>
  );
};

export default Review;
