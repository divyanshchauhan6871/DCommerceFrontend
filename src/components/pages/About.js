import React from "react";
import Layout from "../layout/Layout";
import aboutphoto from "../../assets/about-photo.jpg";

const About = () => {
  return (
    <Layout title="About D commerce">
      <div className="container p-4 height-inherit">
        <div className="row p-3 height-inherit">
          <div className="col-5 d-flex align-items-center justify-content-center side-content-container">
            <div className="aboutphoto">
              <img width="100%" src={aboutphoto} />
            </div>
          </div>
          <div className="col-7 d-flex align-items-center justify-content-center side-content-container">
            <div className="text-center">
              <h1 className="berkshire-swash-regular">D Commerce</h1>
              <p style={{ fontStyle: "italic" }}>
                Welcome to D commerce, your trusted partner in bringing quality
                products to your doorstep. Founded with the mission to simplify
                online shopping, we offer an extensive range of
                categories/products you specialize in, e.g., fashion,
                electronics, home essentials, and more, ensuring there's
                something for everyone. Our goal is to create a shopping
                experience that is seamless, enjoyable, and rewarding. From
                discovering the latest trends to finding everyday essentials, we
                are dedicated to curating a collection that combines quality,
                affordability, and style. Every product in our store is
                carefully selected to meet the diverse needs of our customers.
                At D commerce, customer satisfaction is the cornerstone of our
                business. We prioritize delivering exceptional value, timely
                delivery, and unmatched support. Our easy-to-navigate platform,
                secure payment options, and fast shipping ensure you shop with
                confidence. What sets us apart is our commitment to
                sustainability and community. By partnering with ethical brands
                and suppliers, we aim to make a positive impact on the
                environment while supporting local businesses. We are more than
                just an online store—we are a community that thrives on trust
                and excellence. Thank you for making D commerce your preferred
                shopping destination. We promise to continue innovating and
                exceeding your expectations. Discover the joy of shopping with
                us. Happy shopping!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
