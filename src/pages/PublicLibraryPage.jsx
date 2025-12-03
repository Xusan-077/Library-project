import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import API from "../../API/API";

import LibraryImg from "../assets/images/publicImg.jpg";
import PublicBooksItem from "../components/PublicBooksItem";

export default function PublicLibraryPage() {
  const params = useParams();

  const { data: library } = useQuery({
    queryFn: async () => {
      const res = await API.get(`/libraries/library/${params.libraryId}/`);

      return res;
    },
    queryKey: ["library", params.libraryId],
  });

  const libraryData = library?.data?.results?.library;
  const results = library?.data?.results;

  return (
    <section className="">
      <div className="container">
        <div className="m-[50px_0]">
          <div className="bg-white shadow-2xl rounded-lg p-[25px] mb-[30px] flex items-center gap-5">
            <img
              src={LibraryImg}
              alt=""
              className="w-[300px] h-[300px] rounded-lg"
            />
            <div className="">
              <h3 className="text-[18px] font-semibold mb-3">
                #{libraryData?.user}
              </h3>
              <div className="mb-3 flex gap-2 items-center">
                <i className="text-yellow-600 bi bi-book"></i> Total Books :
                <p className="text-[18px] font-medium ">
                  {results?.total_books}
                </p>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <i className="text-yellow-600 bi bi-geo-alt"></i>
                <p className="text-[16px] font-normal  max-w-[300px]">
                  {libraryData?.address}
                </p>
              </div>
              <div className="mb-3 flex gap-2 items-center">
                <i className="text-yellow-600 bi bi-telephone-inbound"></i>
                <p className="text-[18px] font-medium ">{results?.phone}</p>
              </div>
              <span className="text-[18px] font-medium mb-3 flex gap-2 items-center">
                {results?.is_active}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 bg-white shadow-2xl rounded-lg p-[25px]">
            {results?.books.map((el, index) => (
              <PublicBooksItem book={el} key={index} {...el} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
