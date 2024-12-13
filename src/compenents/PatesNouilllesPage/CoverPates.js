import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css'; // Style de base
import 'swiper/css/navigation'; // Style pour la navigation
import 'swiper/css/pagination'; // Style pour la pagination

import './CoverPates.css';

import pate from '../../assets/ImageFeculentPage/pesto_alla_genovese.webp';
import Nouilles from '../../assets/ImageFeculentPage/nouilles.jpg';
import riz from '../../assets/ImageFeculentPage/riz.webp';
import riz2 from '../../assets/ImageFeculentPage/riz2.jpg';
import riz3 from '../../assets/ImageFeculentPage/riz3.jpg';

const CoverPates = () => {
  return (
    
    <div className="coverpates-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src={pate} alt="Pesto alla Genovese" />
          <img src={pate} alt="Pesto alla Genovese" />
          <img src={pate} alt="Pesto alla Genovese" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Nouilles} alt="Nouilles" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={riz} alt="Riz" />
          <img src={riz2} alt="Riz" />
          <img src={riz3} alt="Riz" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CoverPates;
