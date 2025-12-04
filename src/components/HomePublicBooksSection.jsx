import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "./PublicBooksItem";
import BookSkleton from "../components/BookSkleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
export default function HomePublicBooksSection() {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res;
    },
  });

  return (
    <section>
      <div className="container">
        <div className="mb-10">
          <h2 className="text-[30px] text-gray-700 font-semibold mb-5 ml-2">
            most read books
          </h2>

          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Navigation, Autoplay]}
            className="p-4 rounded-lg"
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <BookSkleton />
                  </SwiperSlide>
                ))
              : books.data.map((book, index) => (
                  <SwiperSlide className="py-4 rounded-lg" key={book.id}>
                    <PublicBooksItem book={book} {...book} index={index} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
