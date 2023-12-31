import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bg1 from '../../public/BG/3319458.jpg'
import bg2 from '../../public/BG/3318154.jpg'
import bg3 from '../../public/BG/5678546.jpg'
import bg4 from '../../public/BG/5678551.jpg'
import LazyLoad from 'react-lazy-load';


const Banner = () => {
    return (
        <div className='md:relative md:bottom-20'>
            <Swiper
                pagination={{
                    type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
              <LazyLoad>
              <SwiperSlide className='max-h-[600px]'>
                    <img src={bg3} alt="" />
                </SwiperSlide>
                <SwiperSlide className='max-h-[600px]'>
                    <img src={bg4} alt="" />
                </SwiperSlide>
                <SwiperSlide className='max-h-[600px]'>
                    <img src={bg1} alt="" />
                </SwiperSlide>
                <SwiperSlide className='max-h-[600px]'>
                    <img src={bg2} alt="" />
                </SwiperSlide>
              </LazyLoad>
               
            </Swiper>

        </div>
    );
};

export default Banner;