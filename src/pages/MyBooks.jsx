import { useQuery } from "@tanstack/react-query";
import PublicBooksItem from "../components/PublicBooksItem";
import API from "../../API/API";

export default function MyBooks() {
  const accessToken = localStorage.getItem("access");

  const { data: myBooks, isLoading } = useQuery({
    queryFn: async () => {
      const res = API.get("/libraries/library/books", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return res;
    },
    queryKey: ["myBooks"],
    enabled: !!accessToken,
  });

  console.log(myBooks?.data);

  return (
    <section className="mb-auto">
      <div className="container">
        <div className="m-[40px_0]">
          <h2 className="text-[35px] font-bold mb-5">My Books</h2>
          <ul
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6`}
          >
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
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
            ) : myBooks?.data?.length > 0 ? (
              myBooks.data.map((book, index) => (
                <PublicBooksItem
                  index={index}
                  book={book}
                  key={book.id}
                  {...book}
                />
              ))
            ) : (
              <div className="">
                <p className="text-center justify-center text-red-600 text-[40px]">
                  No Books Yet
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
