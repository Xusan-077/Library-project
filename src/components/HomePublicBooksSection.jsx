import { useQuery } from "@tanstack/react-query";
import API from "../../API/API";
import PublicBooksItem from "./PublicBooksItem";
import BookSkleton from "../components/BookSkleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";

export default function HomePublicBooksSection() {
  const { t } = useTranslation();

  const { theme } = useThemeStore();

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");
      return res;
    },
  });

  return (
    <section className={``}>
      <div className="container">
        <div className="">
          <h2
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } text-[35px] font-semibold mb-5 ml-2`}
          >
            {t("hero.home")}
          </h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Navigation, Autoplay]}
            className="p-4 rounded-lg"
            loop={true}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            breakpoints={{
              default: { slidesPerView: 4 },
              640: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide
                    key={index}
                    className="py-4 rounded-lg"
                    style={{ minWidth: "280px" }}
                  >
                    <BookSkleton />
                  </SwiperSlide>
                ))
              : books.data.map((book, index) => (
                  <SwiperSlide
                    key={book.id}
                    className="py-4 rounded-lg"
                    style={{ minWidth: "280px" }}
                  >
                    <PublicBooksItem book={book} {...book} index={index} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
