import React from "react";

function PageHero({ icon, title, subtitle, sub2, sub3, sub4, sub5, name }) {
  const scrollTo = () => {
    document.querySelector(`${name}`).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="ad-page">
      {/* <img src="../../images/leaves.jpg" /> */}
      <article>
        <h1>{title}</h1>
        <h4>
          {subtitle}
          <span className="underline-text"> {sub2}</span> {sub3}
        </h4>
        <h4>
          {sub4}
          <span className="underline-text"> {sub5}</span>
        </h4>
        <button type="button" className="box bounce-5" onClick={scrollTo}>
          {icon}
        </button>
      </article>
    </div>
  );
}

export default PageHero;
