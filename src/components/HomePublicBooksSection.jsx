import { useQuery } from "@tanstack/react-query";

import API from "../../API/API";

import PublicBooksItem from "./PublicBooksItem";
import BookSkleton from "../components/BookSkleton";

export default function HomePublicBooksSection() {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await API.get("/books/books/");

      return res;
    },
  });

  return (
    <section className="">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-[30px] text-gray-700 font-semibold mb-5 ml-2">
            most read books
          </h2>

          <div className="overflow-hidden max-w-7xl mx-auto">
            <ul className="public-list flex gap-5 items-center pb-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <BookSkleton key={index} />
                  ))
                : books.data.map((book, index) => (
                    <PublicBooksItem
                      index={index}
                      book={book}
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
