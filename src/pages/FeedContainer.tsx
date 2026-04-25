import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import PetProfileCard from '../components/cards/PetProfileCard';
import PetSocialCard from '../components/cards/PetSocialCard';
import PetTakeoutCard from '../components/cards/PetTakeoutCard';

const FeedContainer = () => {
  return (
    <div className="absolute inset-0">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        modules={[Mousewheel]}
        className="w-full h-full"
      >
        <SwiperSlide className="h-full w-full">
          <PetProfileCard />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <PetSocialCard />
        </SwiperSlide>
        <SwiperSlide className="h-full w-full">
          <PetTakeoutCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeedContainer;
