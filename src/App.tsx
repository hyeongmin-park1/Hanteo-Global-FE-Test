import React, { useEffect, useRef, useState } from 'react';
import CategoryTabs from './components/CategoryTabs';
import BannerSlider from './components/BannerSlider';
import ContentList from './components/ContentList';
import Footer from './components/Footer';
import { categories } from './data/tabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<SwiperCore>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  return (
    <div className=" h-screen flex flex-col bg-gray-50 text-sm font-pretendard">
      <div className="border-b border-gray-200 bg-red-200">
        <div className="max-w-[425px] w-full mx-auto px-2 sm:px-4">
          <CategoryTabs
            active={activeTab}
            onChange={(i) => {
              setActiveTab(i);
              swiperRef.current?.slideTo(i);
            }}
          />
        </div>
      </div>
      <div className="max-w-[425px] w-full mx-auto sm:max-w-screen-md sm:px-4">
        <BannerSlider />
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto touch-pan-y overscroll-contain "
      >
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiper) => {
            const index = swiper.activeIndex;
            setActiveTab(index);
            swiperRef.current?.slideTo(index);
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          touchStartPreventDefault={false}
        >
          {categories.map((category, idx) => (
            <SwiperSlide key={idx}>
              <div className="min-h-[calc(100vh-234px)] max-w-[425px] w-full mx-auto sm:max-w-screen-md sm:px-4 ">
                <div className="sticky top-0  bg-gray-50 z-10 py-2 ">
                  <h2 className="text-lg font-semibold whitespace-nowrap">
                    {category} 콘텐츠
                  </h2>
                </div>
                {activeTab === idx && (
                  <>
                    <ContentList category={category} />
                    <div className="h-32" />
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="max-w-[425px] w-full mx-auto sm:max-w-screen-md sm:px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
