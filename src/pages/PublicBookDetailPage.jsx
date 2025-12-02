import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import API from "../../API/API";

import publicImg from "../assets/images/publicImg.jpg";
import PublicBooksItem from "../components/PublicBooksItem";
import { useEffect } from "react";

export default function PublicBookDetailPage() {
  const params = useParams();

  const { data: book } = useQuery({
    queryKey: ["book", params.bookId],
    queryFn: async () => {
      const res = await API.get(`/books/book/${params.bookId}`);

      return res;
    },
  });

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");

      return res;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params]);

  return (
    <section className="">
      <div className="container">
        <div className="m-[50px_0] ">
          <h3 className="text-[35px] ml-3  mb-4 font-semibold">
            {book?.data.name}
          </h3>

          <div className="flex items-center gap-3 mb-10 bg-white p-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg">
            <img
              src={publicImg}
              alt=""
              className="w-[200px] h-[200px] rounded-lg"
            />
            <div className="">
              <h3 className="text-[30px] font-semibold">{book?.data.name}</h3>
              <span className="bg-yellow-600 p-[5px_10px] text-white rounded-lg">
                <span className="">id: </span> {book?.data.id}
              </span>
              <h3 className="mb-2 text-[16px] font-medium">
                <span className="text-[18px] font-semibold">author: </span>
                {book?.data.author}
              </h3>
              <h3 className="mb-2 text-[16px] font-medium">
                <span className="text-[18px] font-semibold">publisher: </span>
                {book?.data.publisher}
              </h3>
              <h3 className="mb-2 text-[16px] font-medium">
                <span className="text-[18px] font-semibold">quantity: </span>
                {book?.data.quantity_in_library}
              </h3>
            </div>
          </div>

          <div className="bg-white p-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg">
            <h2 className="text-[35px] font-bold mb-5">All Books</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="min-w-[250px]">
                      <div className="mb-3 rounded-lg bg-gray-200 h-[280px]"></div>

                      <div className="px-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </li>
                  ))
                : books.data.map((book) => (
                    <PublicBooksItem
                      book={book}
                      library
                      key={book.id}
                      {...book}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
