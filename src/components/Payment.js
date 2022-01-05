import React, { useState, useEffect } from "react";

function Payment() {
  const [showText, setShowtext] = useState(true);
  const hidetext = () => {
    setTimeout(() => {
      setShowtext(false);
    }, 5000);
  };
  useEffect(() => {
    hidetext();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        {showText && (
          <h4
            style={{
              maxWidth: "80%",
              color: "green",
            }}
          >
            Thank you! We have recived your ad content!
          </h4>
        )}
      </div>
      <div>
        step1 send img step 2 pay
        <a
          href="mailto:adcontent@zanzihome.com?subject=123=message=test message"
          target="_blank"
          style={{ color: "blue" }}
        >
          send images
        </a>
      </div>
    </>
  );
}

export default Payment;
