import { useMutation, useQuery } from "@tanstack/react-query";
import PublicBooksItem from "../components/PublicBooksItem";
import { AuthAPI } from "../../API/API";
import { useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { queryClient } from "../main";
import useThemeStore from "../store/useThemeStore";

export default function MyBooks() {
  const [addBookFirst, setAddBookFirst] = useState(false);
  const [addBookModal, setAddBookModal] = useState(false);
  const [addLotBookModadl, setAddLotBookModadl] = useState(false);

  const [addOneBook, setAddOneBook] = useState([]);
  const [OneBook, setOneBook] = useState({});

  const [addSeveralBookMain, setAddSeveralBookMain] = useState(true);

  const accessToken = localStorage.getItem("access");

  const { theme } = useThemeStore();

  const countSchema = yup.object({
    manyBook: yup.number().positive().integer().required(),
  });

  const {
    register: registerCount,
    handleSubmit: handleSubmitCount,
    reset: resetCount,
    watch,
    formState: { errors: countErrors },
  } = useForm({
    resolver: yupResolver(countSchema),
  });

  const manyBookValue = watch("manyBook");

  const schema = yup
    .object({
      name: yup.string().required(),
      author: yup.string().required(),
      publisher: yup.string().required(),
      quantity_in_library: yup.number().positive().integer().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      manyBook: 1,
    },
  });

  const { data: myBooks, isLoading } = useQuery({
    queryFn: async () => {
      const res = AuthAPI.get("/libraries/library/books");

      return res;
    },

    queryKey: ["myBooks"],
    enabled: !!accessToken,
  });

  const { mutate: addBookMutation } = useMutation({
    mutationFn: async (body) => {
      const res = await AuthAPI.post(`books/add-books/`, body);

      return res;
    },
    onError: () => {
      toast.error("Failed to add book");
    },
    onSuccess: () => {
      toast.success("Add book success");

      setAddBookModal(false);

      queryClient.invalidateQueries();
    },
  });

  function handleSaveOneBook(e) {
    setOneBook({ ...OneBook, [e.target.name]: e.target.value });
  }

  function onSubmit() {
    const updatedArray = [...addOneBook, OneBook];

    addBookMutation(updatedArray);

    setAddOneBook([]);
    setOneBook({});
    setAddLotBookModadl(false);

    resetCount({ manyBook: 1 });
    reset();
  }

  function onSubmitSeveral() {
    const updatedArray = [...addOneBook, OneBook];

    setAddOneBook(updatedArray);
    setOneBook({});
    setAddSeveralBookMain(false);

    reset();
  }

  function handleAddOnly() {
    addBookMutation(addOneBook);

    setAddOneBook([]);
    setOneBook({});

    setAddLotBookModadl(false);
    setAddSeveralBookMain(true);

    reset();
    resetCount({ manyBook: 1 });
  }

  function giveManyBooks() {
    setAddSeveralBookMain(false);
  }

  return (
    <section className="mb-auto">
      <button
        onClick={() => {
          addBookFirst == true ? setAddBookFirst(false) : setAddBookFirst(true);
        }}
        className="fixed z-1 max-[425px]:right-2 max-[425px]:bottom-2  bg-yellow-700 cursor-pointer active:opacity-90 transition-all duration-300 rounded-lg shadow bottom-[30px] right-[30px] p-[8px_0] max-w-[150px] flex items-center justify-center gap-3 w-full"
      >
        <span className="">
          <i className="text-white bi bi-file-earmark-plus"></i>
        </span>
        <span className="text-[18px] text-white">Add book</span>
      </button>

      {addBookFirst && (
        <div
          onClick={() => setAddBookFirst(false)}
          className="fixed top-0 lef-0 z-100 w-screen h-screen cursor-pointer"
        >
          <div className="fixed z-99 bottom-20 right-7 bg-white p-[10px_15px] shadow-2xl rounded-lg max-w-[250px] w-full">
            <button
              onClick={() => setAddBookModal(true)}
              className="flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all duration-300"
            >
              <span className="">
                <i className="text-yellow-700 bi bi-journal-arrow-up"></i>
              </span>
              <span className="text-[18px]">Add one book</span>
            </button>
            <button
              onClick={() => setAddLotBookModadl(true)}
              className="flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all duration-300"
            >
              <span className="">
                <i className="text-yellow-700 bi bi-folder"></i>
              </span>
              <span className="text-[18px]">Add several books</span>
            </button>
            <button className="flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all duration-300">
              <span className="">
                <i className="text-yellow-700 bi bi-filetype-exe"></i>
              </span>
              <span className="text-[18px]">load from exe file</span>
            </button>
          </div>
        </div>
      )}

      {addBookModal && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-100 bg-[#0009]  h-screen">
          <div className="bg-white m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full">
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5">
              <span className="text-[22px] font-semibold  text-yellow-700">
                Add one book
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    reset();
                    setAddBookModal(false);
                  }}
                  className="text-[35px]"
                >
                  &times;
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <label className="block mb-2">
                <span className="flex pl-2.5 items-center mb-1">Book name</span>
                <input
                  type="text"
                  {...register("name")}
                  name="name"
                  onChange={handleSaveOneBook}
                  placeholder="Book name"
                  className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.name?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span className="flex pl-2.5 items-center mb-1">Author</span>
                <input
                  type="text"
                  {...register("author")}
                  name="author"
                  onChange={handleSaveOneBook}
                  placeholder="Author"
                  className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.author?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span className="flex pl-2.5 items-center mb-1">Publisher</span>
                <input
                  type="text"
                  {...register("publisher")}
                  name="publisher"
                  onChange={handleSaveOneBook}
                  placeholder="Publisher"
                  className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.publisher?.message}
                </span>
              </label>
              <label className="">
                <span className="flex pl-2.5 items-center mb-1">
                  Book count
                </span>
                <input
                  type="number"
                  {...register("quantity_in_library")}
                  name="quantity_in_library"
                  onChange={handleSaveOneBook}
                  placeholder="Book count"
                  className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.quantity_in_library?.message}
                </span>
              </label>

              <div className="flex gap-3 items-center justify-end mt-5">
                <button
                  onClick={() => {
                    reset();
                    setAddBookModal(false);
                  }}
                  className="cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg"
                  type="button"
                >
                  cancle
                </button>
                <button
                  className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addLotBookModadl && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-100 bg-[#0009]  h-screen">
          <div className="bg-white m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full">
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-3">
              <span className="text-[22px] font-semibold  text-yellow-700">
                Add several book
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    setAddSeveralBookMain(true);
                    setAddLotBookModadl(false);

                    reset();
                    resetCount({ manyBook: 1 });
                  }}
                  className="text-[35px]"
                >
                  &times;
                </span>
              </button>
            </div>

            {addSeveralBookMain ? (
              <form onSubmit={handleSubmitCount(giveManyBooks)} className="">
                <label>
                  <span className="text-[16px] text-gray-700 mb-2 block">
                    How many book do you want to add ?
                  </span>
                  <input
                    placeholder="number of book"
                    type="number"
                    {...registerCount("manyBook")}
                    defaultValue={1}
                    className="bg-gray-200 outline-none border border-gray-300 h-10 p-[0_20px] max-w-full w-full rounded-lg"
                  />
                  <span className="text-[14px] text-red-500 ml-2">
                    {countErrors?.manyBook?.message}
                  </span>
                </label>
                <div className="flex justify-end">
                  <button className="bg-yellow-700 p-[10px_20px] mt-1.5 rounded-lg text-white">
                    confirm
                  </button>
                </div>
              </form>
            ) : (
              <div className="">
                <h3 className="text-[18px] font-semibold mb-2">
                  book {addOneBook.length + 1}/{manyBookValue}
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    const isLast =
                      Number(addOneBook.length + 1) == Number(manyBookValue);

                    if (isLast) {
                      handleSubmit(onSubmit)();
                    } else {
                      handleSubmit(onSubmitSeveral)();
                    }
                  }}
                  className=""
                >
                  <label className="block mb-2">
                    <span className="flex pl-2.5 items-center mb-1">
                      Book name
                    </span>
                    <input
                      type="text"
                      {...register("name")}
                      name="name"
                      onChange={handleSaveOneBook}
                      placeholder="Book name"
                      className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.name?.message}
                    </span>
                  </label>
                  <label className="block mb-2">
                    <span className="flex pl-2.5 items-center mb-1">
                      Author
                    </span>
                    <input
                      type="text"
                      {...register("author")}
                      name="author"
                      onChange={handleSaveOneBook}
                      placeholder="Author"
                      className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.author?.message}
                    </span>
                  </label>
                  <label className="block mb-2">
                    <span className="flex pl-2.5 items-center mb-1">
                      Publisher
                    </span>
                    <input
                      type="text"
                      {...register("publisher")}
                      name="publisher"
                      onChange={handleSaveOneBook}
                      placeholder="Publisher"
                      className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.publisher?.message}
                    </span>
                  </label>
                  <label className="">
                    <span className="flex pl-2.5 items-center mb-1">
                      Book count
                    </span>
                    <input
                      type="number"
                      {...register("quantity_in_library")}
                      name="quantity_in_library"
                      onChange={handleSaveOneBook}
                      placeholder="Book count"
                      className="border border-gray-300 bg-gray-100 p-[0_0_0_10px] h-10 rounded-lg outline-none w-full"
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.quantity_in_library?.message}
                    </span>
                  </label>

                  <div className="flex gap-3 items-center justify-end mt-5">
                    <button
                      onClick={() => {
                        reset();
                        setAddSeveralBookMain(true);
                      }}
                      className="cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg"
                      type="button"
                    >
                      cancle
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                      onClick={handleAddOnly}
                    >
                      add
                    </button>
                    <button
                      className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container">
        <div
          className={`${
            theme == "light"
              ? "bg-white"
              : "bg-transparent shadow-none border border-gray-800"
          }  max-[600px]:p-3 shadow-2xl p-[25px] rounded-lg`}
        >
          <div className="flex items-center justify-between  mb-5">
            <h2
              className={`${
                theme == "light" ? "" : "text-white"
              } text-[35px] font-bold`}
            >
              My Books
            </h2>
            <div
              className={`${
                theme == "light" ? "" : "text-white"
              } text-[30px] font-semibold`}
            >
              Books : ({myBooks?.data?.length ? myBooks?.data?.length : 0} )
            </div>
          </div>
          <ul
            className={`${
              myBooks?.data?.length > 0
                ? "grid grid-cols-4 gap-6 max-[1140px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
                : ""
            } `}
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
                  auth
                  index={index}
                  book={book}
                  key={book.id}
                  {...book}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center items-center">
                <i
                  className={`${
                    theme == "light" ? "text-gray-400" : "text-white"
                  } bi bi-book  text-[100px]`}
                ></i>
                <p className="text-center font-semibold justify-center text-red-600 text-[40px]">
                  In your library no Books Yet
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
