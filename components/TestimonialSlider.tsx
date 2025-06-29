// components/TestimonialSlider.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Ada - High School Student",
    quote: "This AI assistant is like having a study buddy who never sleeps. It explains things better than my teacher!",
  },
  {
    name: "Musa - University Student",
    quote: "I love how it recommends free courses that actually match what I'm struggling with.",
  },
  {
    name: "Tola - WAEC Candidate",
    quote: "The chatbot helped me prep for my exams faster. Super helpful!",
  },
];

export default function TestimonialSlider() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        loop={true} 
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-8 h-[200px] flex flex-col justify-evenly rounded-xl shadow-md text-center">
              <p className="text-lg italic text-gray-700mb-4">
                “{item.quote}”
              </p>
              <h4 className="text-md font-semibold text-gray-500">
                {item.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
