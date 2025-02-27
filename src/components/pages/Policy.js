import React from "react";
import Layout from "../layout/Layout";
import policypic from "../../../src/assets/policy-photo.jpg";

function Policy() {
  return (
    <Layout title="About D commerce">
      <div className="container p-4 height-inherit">
        <div className="row p-3 height-inherit">
          <div className="col-5 d-flex align-items-center justify-content-center side-content-container">
            <div className="aboutphoto text-center">
              <img width="60%" src={policypic} />
            </div>
          </div>
          <div className="col-7 d-flex align-items-center justify-content-center side-content-container">
            <div className="text-center">
              <p style={{ fontStyle: "italic" }}>
                <div className="policy-section mb-5">
                  <h2 className="berkshire-swash-regular">Privacy Policy</h2>
                  <p>
                    At D commerce, we value your privacy and are committed to
                    protecting your personal information. We collect only the
                    data necessary to process your orders and enhance your
                    shopping experience. Your information is never shared or
                    sold to third parties without your consent. For more
                    details, please review our comprehensive Privacy Policy.
                  </p>
                </div>
                <div className="policy-section mb-5">
                  <h2 className="berkshire-swash-regular">
                    Terms and Conditions
                  </h2>
                  <p>
                    By using our website, you agree to abide by our Terms and
                    Conditions. These include guidelines for purchasing,
                    returns, and appropriate use of our platform. Please ensure
                    you read and understand our terms to make the most of your
                    experience with us.
                  </p>
                </div>
                <div className="policy-section mb-5">
                  <h2 className="berkshire-swash-regular">
                    Refund and Return Policy
                  </h2>
                  <p>
                    We strive to ensure your satisfaction with every purchase.
                    If you're not completely satisfied, our Refund and Return
                    Policy offers options to return items under specific
                    conditions. Please ensure that items are returned within the
                    stipulated time frame, in their original packaging, and with
                    all accompanying materials.
                  </p>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;
