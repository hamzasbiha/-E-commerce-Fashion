import React, { useState } from "react";
import "./Slider.scss";
import img from "../../assets/img1.jpg";
import img1 from "../../assets/img2.jpg";
import img2 from "../../assets/img3.jpg";
import img3 from "../../assets/img4.jpg";
import img4 from "../../assets/img5.jpg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [img, img1, img2, img3, img4];
const prevSlide =()=>{
    setCurrentSlide(currentSlide ===0 ? 2 : (prev)=>prev-1 )
}
const nextSlide=()=>{
    setCurrentSlide(currentSlide ===2 ? 0 : (prev)=>prev+1 )
}
  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="0" />
        <img src={data[1]} alt="1" />
        <img src={data[2]} alt="2" />
      </div>
      <div className="icons">
        <div className="icon" >
          <svg fill="currentColor" viewBox="0 0 16 16" height="2em" width="2em" onClick={prevSlide}>
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 00-.5-.5H2.707l3.147-3.146a.5.5 0 10-.708-.708l-4 4a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708L2.707 8.5H14.5A.5.5 0 0015 8z"
            />
          </svg>
        </div>
        <div className="icon" >
          {" "}
          <svg fill="currentColor" viewBox="0 0 16 16" height="2em" width="2em" onClick={nextSlide}>
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Slider;
