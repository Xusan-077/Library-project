import { create } from "zustand";

const uselikeStore = create((set, get) => ({
  likesBooks: JSON.parse(localStorage.getItem("likesBooks")) || [],
  likesLibraries: JSON.parse(localStorage.getItem("likesLibraries")) || [],

  toggleLike: (like) => {
    const currentlikesBooks = get().likesBooks;
    const inLike = currentlikesBooks.find((el) => el.id === like.id);

    const updatedlikesBooks = inLike
      ? currentlikesBooks.filter((el) => el.id !== like.id)
      : [like, ...currentlikesBooks];

    set({ likesBooks: updatedlikesBooks });
    localStorage.setItem("likesBooks", JSON.stringify(updatedlikesBooks));
  },

  toggleLibraryLike: (like) => {
    const currentlikesLibraries = get().likesLibraries;
    const inLike = currentlikesLibraries.find((el) => el.id === like.id);

    const updatedlikesLibraries = inLike
      ? currentlikesLibraries.filter((el) => el.id !== like.id)
      : [like, ...currentlikesLibraries];

    set({ likesLibraries: updatedlikesLibraries });
    localStorage.setItem(
      "likesLibraries",
      JSON.stringify(updatedlikesLibraries)
    );
  },
}));

export default uselikeStore;
