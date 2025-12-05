import { useNavigate } from "react-router-dom";
import publicImg from "../assets/images/book-img.avif";
import publicImg2 from "../assets/images/book-img3.webp";
import useLikeStore from "../store/useLikeStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthAPI } from "../../API/API";
import { queryClient } from "../main";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function PublicBooksItem({
  name,
  publisher,
  author,
  quantity_in_library,
  library,
  book,
  index,
  auth,
}) {
  const [deleteBookModal, setDeleteBookModal] = useState(false);
  const [editBookModal, setEditBookModal] = useState(false);

  const { likesBooks, toggleLike } = useLikeStore();

  const [newEditBook, setNewEditBook] = useState({
    name: book?.name || "",
    author: book?.author || "",
    publisher: book?.publisher || "",
    quantity_in_library: book?.quantity_in_library || 0,
  });

  const navigate = useNavigate();

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
  });

  const accessToken = localStorage.getItem("access");

  const { mutate: deleteBookMutation } = useMutation({
    mutationFn: async (Id) => {
      const res = AuthAPI.delete(`books/book/${Id}/`);

      return res;
    },
    onSuccess: () => {
      toast.success("Book delete success");

      setDeleteBookModal(false);

      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete book");
    },
  });

  const { mutate: editBookMutation } = useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await AuthAPI.put(`/books/book/${id}/`, body);
      return res;
    },
    onSuccess: () => {
      toast.success("Book successfully edited");

      queryClient.invalidateQueries();

      setEditBookModal(false);
    },
    onError: () => {
      toast.error("Failed to edit book");
    },
  });

  function onSubmit() {
    editBookMutation({ id: book.id, body: newEditBook });
  }

  function handleSaveOneBook(e) {
    setNewEditBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      {deleteBookModal && (
        <div className="fixed bg-[#0009] flex justify-center items-center w-full h-screen top-0 left-0 z-100">
          <div className="bg-white max-w-[500px] m-[0_20px] rounded-lg w-full p-[15px_20px]">
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5">
              <span className="text-[24px] font-semibold text-yellow-700">
                Delete Book
              </span>
              <button
                onClick={() => setDeleteBookModal(false)}
                className="text-[35px]"
              >
                &times;
              </button>
            </div>
            <div className="">
              <p className="text-[18px] text-center mb-7">
                realy want to delate
                <span className="text-red-600 underline">{book.name}</span>
              </p>

              <div className="flex gap-2 items-center justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteBookMutation(book.id);
                  }}
                  className="p-[10px_20px] bg-red-500 text-white rounded-lg "
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    setDeleteBookModal(false);
                  }}
                  className="p-[10px_20px] bg-gray-300 rounded-lg "
                >
                  cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editBookModal && (
        <div className="fixed top-0 flex justify-center w-full items-center left-0 z-100 bg-[#0009]  h-screen">
          <div className="bg-white m-[0_20px] max-[425px]:p-[15px] rounded-lg p-[20px_25px] max-w-[500px] w-full">
            <div className="flex items-center justify-between border-b border-b-gray-300 mb-5">
              <span className="text-[22px] font-semibold  text-yellow-700">
                Add one book
              </span>
              <button className="cursor-pointer">
                <span
                  onClick={() => setEditBookModal(false)}
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
                  defaultValue={book.name}
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
                  defaultValue={book.author}
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
                  defaultValue={book.publisher}
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
                  defaultValue={book.quantity_in_library}
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
                  onClick={() => setEditBookModal(false)}
                  className="cursor-pointer p-[10px_20px]  border border-[#d9d9d9]  text-[rgba(0,0,0,0.88)] text-[14px] rounded-lg"
                  type="button"
                >
                  cancle
                </button>
                <button
                  className="cursor-pointer p-[10px_20px] bg-yellow-700 text-[14px] text-white rounded-lg"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <li
        onClick={() => navigate(`/book/${book.id}`)}
        className={`${
          !library ? "min-w-[280px]" : ""
        } cursor-pointer shadow-lg rounded-lg p-4 hover:translate-y-[-5px] hover:shadow-xl transition-all duration-500`}
      >
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
          <div className="w-full h-[220px] bg-gray-200">
            {index % 2 == 0 ? (
              <img
                src={publicImg || "/placeholder-book.jpg"}
                alt={name}
                className="w-full h-[220px]  object-cover transition-transform duration-300"
              />
            ) : (
              <img
                src={publicImg2 || "/placeholder-book.jpg"}
                alt={name}
                className="w-full h-[220px]  object-cover transition-transform duration-300"
              />
            )}
          </div>

          <div className="absolute flex items-center justify-between w-full p-[0_15px] top-2 right-0">
            {quantity_in_library > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded">
                quantity: {quantity_in_library}
              </span>
            )}

            <div className="cursor-pointer">
              <button
                className="text-[20px] text-white left-2.5"
                onClick={(e) => {
                  e.stopPropagation();

                  toggleLike(book);
                }}
              >
                {likesBooks.find((el) => el.id == book.id) ? (
                  <i className="text-red-500 bi bi-heart-fill"></i>
                ) : (
                  <i className="bi bi-heart"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 border-b border-b-gray-200 pb-2.5 transition-colors">
            {name}
          </h3>
          <div className="flex justify-between mt-3">
            <div className="pt-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {author}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {publisher}
              </p>
            </div>
            {auth && (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setEditBookModal(true);
                  }}
                  className="bg-yellow-700 cursor-pointer rounded-lg w-[45px] h-[35px] text-white flex justify-center items-center"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setDeleteBookModal(true);
                  }}
                  className="border-red-500 cursor-pointer rounded-lg w-[45px] h-[35px] text-red-500 border flex justify-center items-center"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
