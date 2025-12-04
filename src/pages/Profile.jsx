import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useUserAuth";
import axios from "axios";

export default function Profile() {
  const { user } = useAuthStore();

  // const { data: library } = useQuery({
  //   queryKey: ["LibraryAction"],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       "http://org-ave-jimmy-learners.trycloudflare.com/api/v1/libraries/library"
  //     );
  //     return res;
  //   },
  // });

  // console.log("library", library);

  return (
    <div className="">
      <div className="container">
        <div className="m-[50px_0]">
          <div className="flex items-center gap-[30px] bg-white p-5 rounded-lg shadow-2xl">
            <div className="bg-[#CCCCCCFF] rounded-lg flex justify-center items-center w-[250px] h-[250px]">
              <i className="text-[100px] text-white bi bi-person-circle"></i>
            </div>
            <div className="">
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-person"></i>
                <h2 className="text-[30px] font-semibold">
                  {user?.user?.name}
                </h2>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-telephone"></i>
                <h2 className="underline text-[18px]">{user?.user?.phone}</h2>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-bookmarks"></i>
                <button
                  className={`${
                    user?.can_rent_books ? "bg-green-600" : "bg-red-600"
                  } text-white text-[16px] rounded-lg  p-[5px_20px]`}
                >
                  {user?.can_rent_books ? "beradi" : "bermidi"}
                </button>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <i className="text-[24px] text-yellow-700 bi bi-house-door"></i>
                <p className="text-[18px] font-medium">{user?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
