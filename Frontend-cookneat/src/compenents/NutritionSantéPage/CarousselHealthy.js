import React from "react";
import Slider from "react-slick";
import './CarousselHealthy.css';
// Importation des styles de Slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import vegan from '../../assets/ImageNutritionSantéPage/vegan.jpg';
import nogluten from '../../assets/ImageNutritionSantéPage/nogluten.jpeg';
import proteine from '../../assets/ImageNutritionSantéPage/proteine.webp';
import detox from '../../assets/ImageNutritionSantéPage/detox.jpg';


function MyCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-color">
    <div className="carousel">
      
        <div style={{ marginBottom: "100px" }}>

        </div>
      <Slider {...settings}>
         <div className="slide">
         <a href="./Vegan"><img src={vegan} alt="Slide 1" style={{ width: "480px", height: "200px", objectFit: "cover" }} /></a> 
          <div className="text-overlay">VEGAN</div>
        </div>

         <div className="slide">
         <a href="./Nogluten"><img src={nogluten} alt="Slide 1" style={{ width: "480px", height: "200px", objectFit: "cover" }} /></a>
         <div className="text-overlay">SANS GLUTEN</div>
        </div>

         <div className="slide">
         <a href="/detox"><img src={detox} alt="Slide 1" style={{ width: "480px", height: "200px", objectFit: "cover" }} /></a>
         <div className="text-overlay">DETOX</div>
        </div>

         <div className="slide">
         <a href="./Proteine"><img src={proteine} alt="Slide 1" style={{ width: "480px", height: "200px", objectFit: "cover" }} /></a>
         <div className="text-overlay">PROTEINE</div>
        </div>

      </Slider>
        <div style={{ marginBottom: "100px" }}>

</div>
    </div>
    </div>
  );
}



export default MyCarousel;
