import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { banners } from '../data/banners';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerSlider = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className="p-2">
      <Swiper
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} inline-block w-2 h-2 mx-1 rounded-full bg-gray-300 transition-colors duration-300"></span>`,
        }}
        modules={[Autoplay, Pagination]}
        className="rounded-lg overflow-hidden"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={`banner-${idx}`}
                  className="w-full h-[120px] object-contain object-center rounded bg-white"
                />
              ) : (
                <div className="w-full h-[120px] bg-white flex items-center justify-center rounded text-gray-400 text-sm">
                  예시 배너 이미지
                </div>
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
