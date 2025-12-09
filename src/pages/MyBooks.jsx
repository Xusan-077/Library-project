import { useMutation, useQuery } from "@tanstack/react-query";
import PublicBooksItem from "../components/PublicBooksItem";
import { AuthAPI } from "../../API/API";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { queryClient } from "../main";
import useThemeStore from "../store/useThemeStore";
import ExeItem from "../components/ExeItem";
import { useTranslation } from "react-i18next";

export default function MyBooks() {
  const { t } = useTranslation();

  const [addBookFirst, setAddBookFirst] = useState(false);
  const [addBookModal, setAddBookModal] = useState(false);
  const [addLotBookModadl, setAddLotBookModadl] = useState(false);

  const [addOneBook, setAddOneBook] = useState([]);
  const [OneBook, setOneBook] = useState({});

  const [addSeveralBookMain, setAddSeveralBookMain] = useState(true);

  const [addBooksWithFile, setAddBooksWithFile] = useState(false);

  const [fileData, setFileData] = useState([]);
  const [fileAction, setFileAction] = useState(null);

  const [deleteExeModal, setDeleteExeModal] = useState(false);

  const [seeExeModal, setSeeExeModal] = useState(false);

  const [exeDataDelete, setExeDataDelete] = useState(false);
  const [deleteBook, setDeleteBook] = useState(null);

  const [editExeBook, setEditExeBook] = useState(false);

  const [exeEditBook, setExeEditBook] = useState(null);
  const [exeOneBook, setExeOneBook] = useState({});

  const accessToken = localStorage.getItem("access");
  const fileInputRef = useRef();
  const { theme } = useThemeStore();

  // many

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

  // exe

  const EditExe = yup.object({
    name: yup.string().required(),
    author: yup.string().required(),
    publisher: yup.string().required(),
    quantity_in_library: yup.number().positive().integer().required(),
  });

  const {
    register: registerExe,
    handleSubmit: handleSubmitExe,
    reset: resetExe,
    formState: { errors: ExeError },
  } = useForm({
    resolver: yupResolver(EditExe),
  });

  useEffect(() => {
    if (editExeBook && exeEditBook) {
      resetExe({
        name: exeEditBook.name ?? "",
        author: exeEditBook.author ?? "",
        publisher: exeEditBook.publisher ?? "",
        quantity_in_library: exeEditBook.quantity_in_library ?? "",
      });
      setExeOneBook(exeEditBook);
    }
  }, [editExeBook, exeEditBook, resetExe]);

  // add

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
      toast.error("Failed to add book", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
    },
    onSuccess: () => {
      toast.success("Add book success", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });

      setAddBookModal(false);

      queryClient.invalidateQueries();
    },
  });

  const { mutate: BookFileMutate } = useMutation({
    mutationFn: async (body) => {
      const res = await AuthAPI.post("/books/upload-excel/", body);
      return res?.data;
    },
    onSuccess: (data) => {
      setFileData(data);

      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload file", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileAction(file.name);

    const formData = new FormData();
    formData.append("file", file);

    BookFileMutate(formData);
  };

  function handleAddFileToBooks() {
    if (fileData?.length > 0) {
      addBookMutation(fileData);

      setAddBooksWithFile(false);

      setFileData([]);
      setFileAction(null);
    } else {
      toast.error("No file data to add", {
        className: "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg",
        bodyClassName: "text-sm sm:text-base md:text-lg",
      });
    }
  }

  function handleSaveEditExeBook(e) {
    setExeOneBook({ ...exeOneBook, [e.target.name]: e.target.value });
  }

  function handleEditExe() {
    if (exeEditBook === null) return;

    const index = fileData.findIndex(
      (el) =>
        el.name === exeEditBook.name &&
        el.author === exeEditBook.author &&
        el.publisher === exeEditBook.publisher &&
        el.quantity_in_library === exeEditBook.quantity_in_library
    );

    if (index === -1) return;

    const updated = [...fileData];
    updated[index] = { ...exeEditBook, ...exeOneBook };

    setFileData(updated);
    setEditExeBook(false);
    setExeOneBook({});
    setExeEditBook(null);
  }

  const [pageSize, setPageSize] = useState(8);
  const [pageNum, setPageNum] = useState(0);

  const start = pageNum * pageSize;
  const end = start + pageSize;

  const pagination = myBooks?.data.slice(start, end);

  const totalPages = Math.ceil((myBooks?.data.length || 0) / pageSize);

  // Exe
  const [pageSizeExe, setPageSizeExe] = useState(6);
  const [pageNumExe, setPageNumExe] = useState(0);

  const startExe = pageNumExe * pageSizeExe;
  const endExe = startExe + pageSizeExe;

  const paginationExe = fileData?.slice(startExe, endExe) || [];

  const totalPagesExe = Math.ceil((fileData?.length || 0) / pageSizeExe);

  return (
    <section className="mb-auto">
      <button
        onClick={() => {
          addBookFirst == true ? setAddBookFirst(false) : setAddBookFirst(true);
        }}
        className="fixed z-1 max-[425px]:right-2 max-[425px]:bottom-2  bg-yellow-700 cursor-pointer active:opacity-90 transition-all duration-300 rounded-lg shadow bottom-[30px] right-[30px] p-[8px_0] max-w-[200px] flex items-center justify-center gap-3 w-full"
      >
        <span className="">
          <i className="text-white bi bi-file-earmark-plus"></i>
        </span>
        <span className="text-[18px] text-white">{t("MyBooks.AddBook")}</span>
      </button>

      {/* add other style */}
      {addBookFirst && (
        <div
          onClick={() => setAddBookFirst(false)}
          className="fixed top-0 left-0 z-100 w-screen h-screen cursor-pointer"
        >
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-[#1D202AFF]"
            } fixed z-99 bottom-20 right-7 p-[10px_15px] shadow-2xl rounded-lg max-w-[280px] w-full`}
          >
            <button
              onClick={() => setAddBookModal(true)}
              className={`${
                theme == "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              } flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer w-full rounded-lg transition-all duration-300`}
            >
              <span className="">
                <i className="text-yellow-700 bi bi-journal-arrow-up"></i>
              </span>
              <span
                className={`${theme == "light" ? "" : "text-white"} text-18px`}
              >
                {t("MyBooks.addOneBook")}
              </span>
            </button>
            <button
              onClick={() => setAddLotBookModadl(true)}
              className={`${
                theme == "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              } flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer w-full rounded-lg transition-all duration-300`}
            >
              <span className="">
                <i className="text-yellow-700 bi bi-folder"></i>
              </span>
              <span
                className={`${theme == "light" ? "" : "text-white"} text-18px`}
              >
                {t("MyBooks.addSeveralBook")}
              </span>
            </button>
            <button
              onClick={() => {
                setAddBooksWithFile(true);
                setFileAction(null);
                setFileData([]);
              }}
              className={`${
                theme == "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              } flex items-center gap-3 p-[10px_0_10px_30px] cursor-pointer w-full rounded-lg transition-all duration-300`}
            >
              <span className="">
                <i className="text-yellow-700 bi bi-filetype-exe"></i>
              </span>
              <span
                className={`${theme == "light" ? "" : "text-white"} text-18px`}
              >
                {t("MyBooks.loadFromExeFile")}
              </span>
            </button>
          </div>
        </div>
      )}

      {addBookModal && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-100 bg-[#0009]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }  m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full`}
          >
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5">
              <span className="text-[22px] font-semibold  text-yellow-700">
                {t("MyBooks.addOneBook")}
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    reset();
                    setAddBookModal(false);
                  }}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[35px]`}
                >
                  &times;
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Name")}
                </span>
                <input
                  type="text"
                  {...register("name")}
                  name="name"
                  onChange={handleSaveOneBook}
                  placeholder={`${t("MyBooks.Name")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_0_0_10px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.name?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Author")}
                </span>
                <input
                  type="text"
                  {...register("author")}
                  name="author"
                  onChange={handleSaveOneBook}
                  placeholder={`${t("MyBooks.Author")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_0_0_10px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.author?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Publisher")}
                </span>
                <input
                  type="text"
                  {...register("publisher")}
                  name="publisher"
                  onChange={handleSaveOneBook}
                  placeholder={`${t("MyBooks.Publisher")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_0_0_10px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {errors?.publisher?.message}
                </span>
              </label>
              <label className="">
                <span
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Quality")}
                </span>
                <input
                  type="number"
                  {...register("quantity_in_library")}
                  name="quantity_in_library"
                  onChange={handleSaveOneBook}
                  placeholder={`${t("MyBooks.Quality")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_0_0_10px] mt-1 h-10 rounded-lg outline-none w-full`}
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
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg`}
                  type="button"
                >
                  {t("cancel")}
                </button>
                <button
                  className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                  type="submit"
                >
                  {t("add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addLotBookModadl && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-100 bg-[#0009]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full`}
          >
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-3">
              <span className="text-[22px] font-semibold  text-yellow-700">
                {t("MyBooks.addSeveralBook")}
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    setAddSeveralBookMain(true);
                    setAddLotBookModadl(false);

                    reset();
                    resetCount({ manyBook: 1 });
                  }}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[35px]`}
                >
                  &times;
                </span>
              </button>
            </div>

            {addSeveralBookMain ? (
              <form onSubmit={handleSubmitCount(giveManyBooks)} className="">
                <label>
                  <span
                    className={`${
                      theme == "light" ? "text-gray-700" : "text-white"
                    } text-[16px]  mb-2 block`}
                  >
                    {t("MyBooks.howMany")}
                  </span>
                  <input
                    placeholder="number of book"
                    type="number"
                    {...registerCount("manyBook")}
                    defaultValue={1}
                    className={`${
                      theme == "light"
                        ? "bg-gray-100"
                        : "text-white border-gray-800 bg-[#131A28]"
                    } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                  />
                  <span className="text-[14px] text-red-500 ml-2">
                    {countErrors?.manyBook?.message}
                  </span>
                </label>
                <div className="flex justify-end">
                  <button className="bg-yellow-700 p-[10px_20px] mt-1.5 rounded-lg text-white">
                    {t("MyBooks.confirm")}
                  </button>
                </div>
              </form>
            ) : (
              <div className="">
                <h3
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } text-[18px] font-semibold mb-2`}
                >
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
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } flex pl-2.5 items-center mb-1`}
                    >
                      {t("MyBooks.Name")}
                    </span>
                    <input
                      type="text"
                      {...register("name")}
                      name="name"
                      onChange={handleSaveOneBook}
                      placeholder={`${t("MyBooks.Name")}`}
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.name?.message}
                    </span>
                  </label>
                  <label className="block mb-2">
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } flex pl-2.5 items-center mb-1`}
                    >
                      {t("MyBooks.Author")}
                    </span>
                    <input
                      type="text"
                      {...register("author")}
                      name="author"
                      onChange={handleSaveOneBook}
                      placeholder={`${t("MyBooks.Author")}`}
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.author?.message}
                    </span>
                  </label>
                  <label className="block mb-2">
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } flex pl-2.5 items-center mb-1`}
                    >
                      {t("MyBooks.Publisher")}
                    </span>
                    <input
                      type="text"
                      {...register("publisher")}
                      name="publisher"
                      onChange={handleSaveOneBook}
                      placeholder={`${t("MyBooks.Publisher")}`}
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                    />
                    <span className="text-red-500 text-[14px] ml-4">
                      {errors?.publisher?.message}
                    </span>
                  </label>
                  <label className="">
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } flex pl-2.5 items-center mb-1`}
                    >
                      {t("MyBooks.Quality")}
                    </span>
                    <input
                      type="number"
                      {...register("quantity_in_library")}
                      name="quantity_in_library"
                      onChange={handleSaveOneBook}
                      placeholder={`${t("MyBooks.Quality")}`}
                      className={`${
                        theme == "light"
                          ? "bg-gray-100"
                          : "text-white border-gray-800 bg-[#131A28]"
                      } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
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
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg`}
                      type="button"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="button"
                      className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg`}
                      onClick={handleAddOnly}
                      disabled={addOneBook.length == 0}
                    >
                      {t("add")}
                    </button>
                    <button
                      className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                      type="submit"
                    >
                      {t("next")}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* add other style */}

      {addBooksWithFile && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-120 bg-[#0009]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[550px] w-full`}
          >
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-3">
              <span className="text-[22px] font-semibold  text-yellow-700">
                {t("MyBooks.loadFromExeFile")}
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    setAddBooksWithFile(false);
                    setFileAction(null);
                    setFileData([]);
                  }}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[35px]`}
                >
                  &times;
                </span>
              </button>
            </div>

            <div className="">
              <div className="">
                <div className="">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <span
                    onClick={() => fileInputRef.current.click()}
                    className={`${
                      theme == "light"
                        ? "border-gray-400 bg-gray-200 "
                        : "bg-[#1D202AFF] border-gray-800"
                    } cursor-pointer  rounded-lg p-[30px_0] w-full flex flex-col items-center`}
                  >
                    <i className="mb-4 text-yellow-700 text-[50px] bi bi-filetype-exe"></i>
                    <p
                      className={`${
                        theme == "light" ? "text-[#0009]" : "text-gray-300"
                      } text-[16px] font-medium `}
                    >
                      {t("MyBooks.selectExe")}
                    </p>
                    <p
                      className={`${
                        theme == "light" ? "text-black" : "text-white"
                      } text-center text-[16px] font-semibold `}
                    >
                      {t("MyBooks.exe")}
                    </p>
                  </span>
                </div>
                <div className="flex items-center justify-end mt-3 gap-2 ">
                  <div
                    onClick={() => {
                      setAddBooksWithFile(false);

                      setFileAction(null);
                      setFileData([]);
                    }}
                    className={`${
                      theme == "light"
                        ? "bg-gray-100 border border-gray-300"
                        : "border-gray-300 text-gray-300"
                    } p-[10px_20px] cursor-pointer border  rounded-lg`}
                  >
                    {t("cancel")}
                  </div>
                  <button
                    onClick={handleAddFileToBooks}
                    type="button"
                    disabled={fileData.length == 0}
                    className={`${
                      theme == "light" ? "border" : "border-none"
                    } p-[10px_20px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex gap-2 items-center bg-yellow-700 text-white  rounded-lg`}
                  >
                    <i className="bi bi-download"></i>
                    <span className="">{t("MyBooks.uploading")}</span>
                  </button>
                </div>
                <div className="">
                  {fileAction ? (
                    <div className="">
                      <div className="mt-4 border border-gray-400 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <i
                              className={`${
                                theme == "light"
                                  ? "text-[#0009]"
                                  : "text-gray-300"
                              } text-[30px] bi bi-file-earmark-arrow-up`}
                            ></i>
                            <p
                              className={`${
                                theme == "light"
                                  ? "text-[#0009]"
                                  : "text-gray-300"
                              } text-[16px] font-semibold `}
                            >
                              {fileAction}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 w-100px">
                            <button
                              onClick={() => {
                                setSeeExeModal(true);
                                setDeleteExeModal(false);
                              }}
                            >
                              <i
                                className={`${
                                  theme == "light"
                                    ? "text-[#0009]"
                                    : "text-gray-300"
                                } text-[30px] bi bi-eye`}
                              ></i>
                            </button>
                            <button
                              onClick={() => {
                                setDeleteExeModal(true);
                                setSeeExeModal(false);
                              }}
                            >
                              <i
                                className={`${
                                  theme == "light"
                                    ? "text-[#0009]"
                                    : "text-red-500"
                                } text-[30px] bi bi-x`}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <span
                          className={`${
                            theme == "light" ? "text-[#0009]" : "text-white"
                          } mt-2 flex justify-end text-[18px] font-medium`}
                        >
                          {t("numberOfBook")} {fileData.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteExeModal && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-130 bg-[#0009]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[350px] w-full`}
          >
            <p
              className={`${
                theme == "light" ? "text-gray-700" : "text-gray-300"
              } text-[17px] mb-4 text-center font-semibold `}
            >
              {t("MyBooks.ExeDeleteConfirm")}
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setFileAction(null);
                  setFileData([]);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                  setDeleteExeModal(false);
                }}
                className="px-4 py-1.5 text-[14px] bg-red-500 hover:bg-red-600 transition rounded-lg text-white"
              >
                {t("delete")}
              </button>
              <button
                onClick={() => {
                  setDeleteExeModal(false);
                }}
                className={`${
                  theme == "light"
                    ? "border-gray-400 hover:bg-gray-100 text-gray-600"
                    : "border-gray-300 text-gray-300"
                } px-4 py-1.5 text-[14px] border  transition rounded-lg `}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {exeDataDelete && deleteBook && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-130 bg-[#0002]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[400px] w-full`}
          >
            <p className="text-[17px] mb-4 text-center font-semibold ">
              <span
                className={`${
                  theme == "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {t("MyBooks.ExeDeleteItemConfirm")} -
              </span>
              <span className="text-red-500 font-semibold pl-1">
                {deleteBook.name}
              </span>
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const updated = fileData.filter(
                    (el) =>
                      !(
                        el.name === deleteBook.name &&
                        el.author === deleteBook.author &&
                        el.publisher === deleteBook.publisher &&
                        el.quantity_in_library ===
                          deleteBook.quantity_in_library
                      )
                  );

                  setFileData(updated);
                  setExeDataDelete(false);
                  setDeleteBook(null);
                }}
                className="px-4 py-1.5 text-[14px] bg-red-500 hover:bg-red-600 transition rounded-lg text-white"
              >
                {t("delete")}
              </button>
              <button
                onClick={() => {
                  setExeDataDelete(false);
                  setDeleteBook(null);
                }}
                className={`${
                  theme == "light"
                    ? "border-gray-400 hover:bg-gray-100 "
                    : "border-gray-300 text-gray-300"
                } px-4 py-1.5 text-[14px] border  transition rounded-lg `}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {seeExeModal && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-121 bg-[#00000060]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] min-h-[600px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[850px] w-full`}
          >
            {/* top */}
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-3">
              <span className="text-[22px] font-semibold  text-yellow-700">
                {t("MyBooks.exeTitle")}
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => {
                    setSeeExeModal(false);
                  }}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[35px]`}
                >
                  &times;
                </span>
              </button>
            </div>

            {/* bottom */}
            <div className="min-h-[500px] flex flex-col justify-between">
              <div
                className="overflow-x-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="min-w-[700px]">
                  <div
                    className={`${
                      theme == "light"
                        ? "border-b-gray-300"
                        : "border-b-gray-800"
                    } grid grid-cols-[1fr_1fr_1fr_100px_100px] items-center border-b `}
                  >
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } p-4 text-[16px] font-semibold`}
                    >
                      {t("MyBooks.Name")}
                    </span>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } p-4 text-[16px] font-semibold`}
                    >
                      {t("MyBooks.Author")}
                    </span>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } p-4 text-[16px] font-semibold`}
                    >
                      {t("MyBooks.Publisher")}
                    </span>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } p-4 text-[16px] font-semibold`}
                    >
                      {t("MyBooks.Quality")}
                    </span>
                    <span
                      className={`${
                        theme == "light" ? "" : "text-white"
                      } p-4 text-[16px] font-semibold`}
                    >
                      {t("MyBooks.Action")}
                    </span>
                  </div>
                  <ul className="">
                    {paginationExe?.map((book) => (
                      <ExeItem
                        key={`${book.name}-${book.author}-${book.publisher}-${book.quantity_in_library}`}
                        books={fileData}
                        book={book}
                        exeDataDelete={exeDataDelete}
                        setExeDataDelete={setExeDataDelete}
                        setDeleteBook={setDeleteBook}
                        setExeEditBook={setExeEditBook}
                        setEditExeBook={setEditExeBook}
                        setExeOneBook={setExeOneBook}
                      />
                    ))}
                  </ul>
                  <div className="mt-10 flex gap-10 items-center justify-center  flex-wrap">
                    <div className="">
                      <select
                        onChange={(e) => {
                          setPageSizeExe(Number(e.target.value));
                          setPageNumExe(0);
                        }}
                      >
                        <option value="8">8</option>
                        <option value="16">16</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                      </select>
                    </div>
                    <div className="flex gap-5 items-center justify-center flex-wrap">
                      <button
                        disabled={pageNumExe === 0}
                        onClick={() => setPageNumExe((p) => p - 1)}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
                      >
                        prev
                      </button>

                      {Array.from({ length: totalPagesExe }).map((_, index) => (
                        <button
                          onClick={() => setPageNumExe(index)}
                          className={`p-2 cursor-pointer w-[35px] rounded-lg border ${
                            pageNumExe === index
                              ? "bg-yellow-700 text-white"
                              : ""
                          }`}
                          key={index}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        disabled={pageNumExe === totalPagesExe - 1}
                        onClick={() => setPageNumExe((p) => p + 1)}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t flex items-center justify-between border-t-gray-300 pt-2.5 mt-2.5">
                <span
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } text-[18px] font-medium`}
                >
                  {t("numberOfBook")} {fileData.length}
                </span>
                <button
                  onClick={() => {
                    setSeeExeModal(false);
                  }}
                  className="text-yellow-700 cursor-pointer border border-yellow-700 rounded-lg text-[16px] p-[5px_15px]"
                >
                  {t("cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editExeBook && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-150 bg-[#0002]  h-screen">
          <div
            className={`${
              theme == "light"
                ? "bg-white"
                : "bg-[#030712FF] border-gray-700 border"
            }   m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full`}
          >
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5">
              <span className="text-[22px] font-semibold  text-yellow-700">
                Add one book
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => setEditExeBook(false)}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  }  text-[35px]`}
                >
                  &times;
                </span>
              </button>
            </div>
            <form onSubmit={handleSubmitExe(handleEditExe)} className="">
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Name")}
                </span>
                <input
                  type="text"
                  defaultValue={exeOneBook.name}
                  {...registerExe("name")}
                  name="name"
                  onChange={handleSaveEditExeBook}
                  placeholder={`${t("MyBooks.Name")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {ExeError?.name?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Author")}
                </span>
                <input
                  type="text"
                  defaultValue={exeOneBook.author}
                  {...registerExe("author")}
                  name="author"
                  onChange={handleSaveEditExeBook}
                  placeholder={`${t("MyBooks.Author")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {ExeError?.author?.message}
                </span>
              </label>
              <label className="block mb-2">
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Publisher")}
                </span>
                <input
                  type="text"
                  {...registerExe("publisher")}
                  defaultValue={exeOneBook.publisher}
                  name="publisher"
                  onChange={handleSaveEditExeBook}
                  placeholder={`${t("MyBooks.Publisher")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {ExeError?.publisher?.message}
                </span>
              </label>
              <label className="">
                <span
                  className={`${
                    theme == "light" ? "" : "text-gray-300"
                  } flex pl-2.5 items-center mb-1`}
                >
                  {t("MyBooks.Quality")}
                </span>
                <input
                  type="number"
                  {...registerExe("quantity_in_library")}
                  defaultValue={exeOneBook.quantity_in_library}
                  name="quantity_in_library"
                  onChange={handleSaveEditExeBook}
                  placeholder={`${t("MyBooks.Quality")}`}
                  className={`${
                    theme == "light"
                      ? "bg-gray-100"
                      : "text-white border-gray-800 bg-[#131A28]"
                  } border border-gray-300  p-[0_20px] mt-1 h-10 rounded-lg outline-none w-full`}
                />
                <span className="text-red-500 text-[14px] ml-4">
                  {ExeError?.quantity_in_library?.message}
                </span>
              </label>

              <div className="flex gap-3 items-center justify-end mt-5">
                <button
                  onClick={() => {
                    setEditExeBook(false);
                    setExeEditBook(null);
                    setExeOneBook({});
                  }}
                  className={`${
                    theme == "light" ? "" : "text-white"
                  } cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg`}
                  type="button"
                >
                  {t("cancel")}
                </button>
                <button
                  className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                  type="submit"
                >
                  {t("edit")}
                </button>
              </div>
            </form>
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
              {t("MyBooks.MyBooks")}
            </h2>
            <div
              className={`${
                theme == "light" ? "" : "text-white"
              } text-[30px] max-[425px]:text-[20px] font-semibold`}
            >
              {t("MyBooks.books")} : (
              {myBooks?.data?.length ? myBooks?.data?.length : 0})
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
              Array.from({ length: 8 }).map((_, index) => (
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
              pagination.map((book, index) => (
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
          <div className="mt-5 flex gap-10 items-center justify-center  flex-wrap">
            <div className="">
              <select
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNum(0);
                }}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select>
            </div>
            <div className="flex gap-5 items-center justify-center flex-wrap">
              <button
                disabled={pageNum === 0}
                onClick={() => setPageNum((p) => p - 1)}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
              >
                prev
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  onClick={() => setPageNum(index)}
                  className={`p-2 cursor-pointer w-[35px] rounded-lg border-gray-300 font-medium ${
                    pageNum === index ? "bg-yellow-700 text-white" : ""
                  } border`}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={pageNum === totalPages - 1}
                onClick={() => setPageNum((p) => p + 1)}
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 text-[18px] font-semibold"
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
